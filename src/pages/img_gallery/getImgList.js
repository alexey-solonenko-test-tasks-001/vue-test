
/**
 * @typedef {Object} getImgListProps
 * @property {Number} limit
 * @property {string} origin
 * @property {Number} page
 * @property {Boolean} search
 * @property {string} searchField
 * @property {string} term
 * @property {Number} total
 * 
 */

/**
 * 
 * @todo To load from unsplash: author/username, total count of results available 
 */

/**
 * @function
 * @param {loadPicsProps} props
 */
async function getImgList(props) {
  /* Prepare vars */
  let loop = 0;
  let { limit, origin, page, search, searchField, term, total } = props;
  let maxPage = Math.ceil(total / limit);
  let buff = [];
  /* if no server-side search required, reset the term */
  if (!search) {
    term = "";
  }
  let urlSp = new URLSearchParams();
  urlSp.set('limit', limit);
  urlSp.set('page', page);

  /* Function to load a single batch */
  async function obtainList() {
    /* If searching for a specific author, then we are trying to iterate over all pages, so, do set a page number */
    if (search && term.length > 1) urlSp.set('page', loop + 1);
    let url = origin + '?' + urlSp.toString();
    let res = await fetch(url);
    let jsn = await res.json();
    await (async () => {
      let newImages = [];
      if (!Array.isArray(buff)) buff = [];
      /* If searching from server and a search key word/term is present */
      /* Then filter the returned resuls by the keyword, and filter unique records */
      if (term && search) {
        newImages = jsn.filter(img => {
          /* Search for specific author */
          if (img[searchField].toLowerCase().search(term) > -1) {
            let ret = true;
            /* Keep all IDs unique in the result array */
            buff.forEach((val) => {
              if (val.id == img.id) {
                ret = false;
              }
            });
            return ret;
          }
        });
        if (!newImages) newImages = [];
        let all = buff.concat(newImages);
        buff = all;
      } else {
        buff = jsn;
      }

      /**
       * @fixme TO HANDLE PAGINATION WHEN SEARCHING BY AUTHOR
       */
      if (buff.length >= limit /* more than can show on one page */ || jsn.length < limit /* search exhausted */ || loop > maxPage) {
        buff.splice(limit);
        return;
      } else {
        /* Go to next search page */
        loop++;
        await obtainList();
      }
    })();
    return;
  }
  try {
    await obtainList();
  } catch (e) {
    buff = [];
  }
  /**
   * @todo to add other goodies to return, total count, next/prev page, etc.
   */
  return ({
    list: buff
  });
}

export default getImgList;
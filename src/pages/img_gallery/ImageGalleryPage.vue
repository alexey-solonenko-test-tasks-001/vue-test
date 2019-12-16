<template>
  <div class="image-gallery-page">
    <div class="container">
      <Header1 />
      <div class="position-sticky">
        <div class="row">
          <div class="col-12 col-md-4">
            <GridController
              v-on:[updateThumbsPerPage]="thumbsPerPage = $event"
              :thumbsPerPage="thumbsPerPage"
            />
          </div>

          <div class="col-12 col-md-4">
            <Paginator
              v-on:[flipPage]="paginate"
              v-on:[setPage]="setCurrentPage"
              :currentPage="currentPage"
              :maxPage="maxPage"
              :minPage="minPage"
            />
          </div>

          <div class="col-12 col-md-4">
            <AuthorSearchBar
              v-bind:searchAuthorText="searchAuthorKeyword"
              v-bind:loading="loadingList"
              v-on="authorListeners"
            />
          </div>
        </div>
      </div>

      <div class="row" v-bind:class="loadingList ? 'd-flex': 'd-none'">
        <div class="col-12">Searching...</div>
      </div>
      <div class="row" v-bind:class="noResults ? 'd-flex' : 'd-none'">
        <div class="col-12">No results found</div>
      </div>

      <div class="col-12">
        <div class="row">
          <single-img-thumb
            v-for="img in imgList"
            v-bind:key="img.id"
            v-bind:img="img"
            v-bind:searchKeyword="searchAuthorOnServer ? '' :searchAuthorKeyword"
            v-on:[openModal]="openSingleImgModal"
            v-on:[closeModal]="closeSingleImgModal"
          />
        </div>
      </div>
    </div>
    <Modal1 v-bind:show="showModal" v-bind:img="modalImg" v-on:[closeModal]="closeSingleImgModal" />
  </div>
</template>

<script>
/**
 * @typedef import('../../components/control_panel/controlPanelEvents.js').controlPanelEvents
 */
/**
 * @typedef import('./getImgList.js').getImgListProps
 */

import AuthorSearchBar from "../../components/control_panel/AuthorSearchBar.vue";
/** @type {controlPanelEvents} */
import controlPanelEvents from "../../components/control_panel/controlPanelEvents.js";
import GridController from "../../components/control_panel/GridController.vue";
import debounce from "lodash.debounce";
import getImgList from "./getImgList.js";
import Header1 from "../headers/Header1.vue";
import Modal1 from "../../components/modal/Modal1.vue";
import Paginator from "../../components/control_panel/Paginator.vue";
import SingleImgThumb from "../../components/imgs/SingleImgThumb.vue";

export default {
  data: function() {
    return {
      /* Events literals, imported */
      ...controlPanelEvents,

      /* Props */
      currentPage: 1,
      imgList: [],
      maxPage: 100,
      minPage: 1,
      modalImg: {},
      openModal: controlPanelEvents.openModal,
      searchAuthorKeyword: "",
      thumbsPerPage: 30,

      /* directives & states */
      loadingList: false,
      noResults: false,
      searchAuthorOnServer: false,
      showModal: false,

      /* Other */
      totalImgs: 1000
    };
  },
  watch: {
    thumbsPerPage: function() {
      this.recalcMax();
      this.currentPage = 1;
      this.debouncedLoadImages();
    },
    currentPage: function() {
      this.recalcMax();
      this.debouncedLoadImages();
    }
  },
  created: function() {
    this.recalcMax();
    this.debouncedLoadImages = debounce(this.loadImages, 500, {
      trailing: true
    });
    this.loadImages();
  },
  methods: {
    loadImages: function(term = "") {
      this.noResults = false;
      if (this.loadingList) {
        return;
      }
      this.loadingList = true;
      this.imgList = [];
      let props = {
        limit: this.thumbsPerPage,
        origin: `https://picsum.photos/v2/list`,
        page: this.currentPage,
        search: this.searchAuthorOnServer,
        searchField: "author",
        term: term,
        total: this.totalImgs
      };
      getImgList(props)
        .then(res => {
          this.imgList = res.list;
        })
        .finally(() => {
          this.loadingList = false;
          if (this.imgList.length === 0) this.noResults = true;
          if (this.searchAuthorKeyword.length > 0) {
            this.$nextTick(() =>
              document
                .getElementsByClassName("image-gallery-search-author__input")[0]
                .focus()
            );
          }
        });
    },
    closeSingleImgModal: function() {
      this.showModal = false;
    },
    openSingleImgModal: function(img) {
      this.showModal = true;
      this.modalImg = img;
    },
    paginate: function(dir) {
      this.setCurrentPage(dir > 0 ? ++this.currentPage : --this.currentPage);
    },
    filterImagesByAuthor: function(keyword) {
      this.searchAuthorKeyword = keyword;
      if (this.searchAuthorOnServer) {
        this.debouncedLoadImages(keyword);
      }
    },
    setCurrentPage: function(val) {
      if (val < 1) val = this.maxPage;
      if (val > this.maxPage) val = 1;
      this.currentPage = val;
    },
    recalcMax: function() {
      this.maxPage = Math.floor(this.totalImgs / this.thumbsPerPage);
    },
    searchAuthorOnServerM: function(ev) {
      this.searchAuthorOnServer = ev.checked;
    },
    findEvent: function(ev) {
      return ev;
    }
  },
  computed: {
    authorListeners: function() {
      return {
        ...this.$listeners,
        [this.searchServer]: this.searchAuthorOnServerM,
        [this.searchAuthor]: this.filterImagesByAuthor
      };
    }
  },
  components: {
    AuthorSearchBar,
    GridController,
    Header1,
    Modal1,
    Paginator,
    SingleImgThumb
  }
};
</script>
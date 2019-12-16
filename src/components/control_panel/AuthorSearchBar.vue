<template>
  <div class="row h-100 pb-1">
    <div class="col-12 h-100">
      <div class="neat-border h-100">
        <div class="row h-100 p-15">
          <div class="col-12 col-md-3 my-auto">
            <p>Search Author</p>
          </div>
          <div class="col-12 col-md-9 my-auto">
            <div class="row">
              <label
                class="col-10 text-right image-gallery-search-author__label"
                for="paginator-search-server"
              >Server/Page search</label>
              <div class="col-2 text-left">
                <input
                  id="paginator-search-server"
                  type="checkbox"
                  @change="$emit(searchServer,$event.target)"
                />
              </div>
            </div>
          </div>
          <div class="col-12 my-auto">
            <input
              type="text"
              class="image-gallery-search-author__input"
              :value="searchAuthorText"
              :disabled="loading"
              @input="$emit(searchAuthor,$event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @typedef import('./controlPanelEvents.js').controlPanelEvents
 */

/** @type controlPanelEvents */
import controlPanelEvents from "./controlPanelEvents";
export default {
  data: function() {
    return {
      searchAuthor: controlPanelEvents.searchAuthor,
      searchServer: controlPanelEvents.searchServer
    };
  },
  props: {
    searchAuthorText: String,
    loading: Boolean
  }
};
</script>
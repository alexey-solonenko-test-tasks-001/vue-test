<template>
  <div class="row h-100 pb-1">
    <div class="col-12 h-100  ">
      <div class="neat-border h-100 ">
        <div class="row h-100 p-15">
          <div class="col-12 my-auto">
            <p>Search Author</p>
          </div>
          <div class="col-12 my-auto ">
            <input
              type="text"
              :value="searchAuthorText"
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
      searchAuthor: controlPanelEvents.searchAuthor
    };
  },
  props: {
    searchAuthorText: String
  }
};
</script>
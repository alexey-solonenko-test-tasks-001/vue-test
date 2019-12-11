<template>
  <div class="row">
    <div class="col-12">
      <p>Search Author</p>
    </div>
    <div class="col-12">
      <input type="text" :value="searchAuthorText" @input="$emit(searchAuthor,$event.target.value)" />
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
    data: function(){
        return ({
            searchAuthor: controlPanelEvents.searchAuthor,
    });
    },
    props:{
        searchAuthorText: String
    }
}
</script>
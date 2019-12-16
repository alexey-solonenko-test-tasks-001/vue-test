<template>
  <div class="row pb-1 h-100">
    <div class="col-12 h-100">
      <div class="neat-border h-100">
        <div class="row h-100 p-15">
          <div class="col-3 my-auto ml-auto">
            <button class='image-gallery-paginator__button' id="prevPage" @click="$emit(flipPage,-1)">prev</button>
          </div>
          <div class="col-2 my-auto image-gallery-paginator__current-page-div">
            <input
              @input="$emit(setPage,$event.target.value)"
              type="number"
              v-bind:value="currentPage"
              class=' image-gallery-paginator__current-page '
            />
          </div>
          <div class="col-2 my-auto text-left image-gallery-paginator--total-pages" >/ {{ maxPage }}</div>
          <div class="col-3 my-auto mr-auto">
            <button class='image-gallery-paginator__button' id="nextPage" @click="$emit(flipPage,+1)">next</button>
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
  props: {
    currentPage: {
      required: false
    },
    maxPage: Number,
    minPage: Number
  },
  data: function() {
    return {
      flipPage: controlPanelEvents.flipPage,
      setPage: controlPanelEvents.setPage,
    };
  },
  computed: {}
};
</script>

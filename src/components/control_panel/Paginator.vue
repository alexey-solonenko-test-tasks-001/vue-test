<template>
  <div class="row pb-1 h-100">
    <div class="col-12 h-100">
      <div class="neat-border h-100">
        <div class="row h-100 p-15">
          <div class="col-3 my-auto">
            <button id="prevPage" @click="$emit(flipPage,-1)">prev</button>
          </div>
          <div class="col-4 my-auto">
            <input
              @input="$emit(setPage,$event.target.value)"
              type="number"
              v-bind:value="currentPage"
            />
          </div>
          <div class="col-2 my-auto">{{ maxPage }}</div>
          <div class="col-3 my-auto">
            <button id="nextPage" @click="$emit(flipPage,+1)">next</button>
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
      setPage: controlPanelEvents.setPage
    };
  },
  computed: {}
};
</script>
<template>
  <div class="row">
    <div class="col-4">
      <button id="prevPage" @click="$emit(flipPage,-1)">prev</button>
    </div>
    <div class="col-4">{{ currentPage }}/{{ maxPage }}</div>
    <div class="col-4">
      <button id="nextPage" @click="$emit(flipPage,+1)">next</button>
    </div>
  </div>
</template>

<script>
/**
 * @typedef import('../../components/control_panel/controlPanelEvents.js').controlPanelEvents
 */

/** @type controlPanelEvents */
import controlPanelEvents from "./controlPanelEvents";
export default {
  props: {
    currentPage: Number,
    maxPage: Number,
    minPage: Number
  },
  data : function() {
    return ({
      flipPage: controlPanelEvents.flipPage
    });
  },
  computed: {}
};
</script>
<template>
  <div class="row pb-1 h-100">
    <div class="col-12">
      <div class="neat-border h-100">
        <div class="row p-15">
          <p class="col-xs-12">Thumbnails per page 1...100</p>
          <div class="col-xs-12 col-md-4 col-lg-3">
            <input
              type="number"
              class='image-gallery-grid-controller__thumbs-per-page-input'
              id="thumbsPerPageInput"
              name="thumbsPerPageInput"
              v-on="listeners"
              :value="thumbsPerPage"
            />
          </div>
          <div class="col-xs-12 col-md-8 col-lg-9">
            <input
              type="range"
              class='image-gallery-grid-controller__thumbs-per-page-slider'
              id="thumbsPerPageSlider"
              name="thumbsPerPageSlider"
              min="1"
              max="100"
              v-on="listeners"
              :value="thumbsPerPage"
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
import controlPanelEvents from "./controlPanelEvents.js";

export default {
  props: {
    thumbsPerPage: {
      required: false
    }
  },
  computed: {
    /**
     * @function
     * @description This function is taken from official Vue.js tutorial
     * https://codesandbox.io/s/o29j95wx9
     */
    listeners() {
      return {
        ...this.$listeners,
        input: event =>
          this.$emit(controlPanelEvents.updateThumbsPerPage, event.target.value)
      };
    }
  }
};
</script>
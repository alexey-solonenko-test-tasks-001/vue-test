<template >
  <div class="col-sm-12 col-md-4 col-lg-3 pb-1" v-bind:class="filterByAuthor">
    <div class="neat-border">
      <div class="row">
        <div class="col-12">
          <img
            class="image-gallery-thumb__img"
            v-bind:class="loading && 'd-none'"
            v-bind:src="imgSrc"
            @click="$emit(openModal,img)"
          />
          <div class="image-gallery-thumb__loading-background" v-bind:class="!loading && 'd-none'">
            <div style="{position:absolute}">
              <div class="image-gallery-thumb__loading-spinner"></div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="row image-gallery-thumb__info-bar">
            <div class="col-7 image-gallery-thumb__author text-truncate" @click="$emit(openModal,img)">{{ img.author }}</div>
            <div class="col-5 text-right">
              <span class='image-gallery-thumb__id-border'>
              <a 
                target="_blank"
                download="img"
                class='image-gallery-thumb__id'
                v-bind:href="img.download_url">#{{ img.id }}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @typedef import('../control_panel/controlPanelEvents.js').controlPanelEvents
 */

/** @type controlPanelEvents */
import controlPanelEvents from "../control_panel/controlPanelEvents";

export default {
  data: function() {
    return {
      imgSrc: {},
      loading: true,
      openModal: controlPanelEvents.openModal,
      closeModal: controlPanelEvents.closeModal
    };
  },
  props: {
    img: {
      type: Object
    },
    searchKeyword: {
      type: String
    }
  },
  computed: {
    filterByAuthor: function() {
      if (!this.searchKeyword) return "";
      if (
        this.img.author
          .toString()
          .toLowerCase()
          .search(this.searchKeyword.toLowerCase()) > -1
      ) {
        return "";
      } else {
        return "d-none";
      }
    }
  },
  watch: {
    img: {
      handler() {
        let vm = this;
        vm.loading = true;
        /* Last two url parts are resolution, we need to change them */
        /* Todo to update using regex, or search based on id and next '/' */
        vm.loadSingleThumb().then(() => {
          vm.loading = false;
        }).catch(() => {});
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    loadSingleThumb: async function() {
      let img = Object.assign({}, this.img);
      let url = img.download_url.split("/");
      const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
      url = url.splice(0, url.length - 2);
      url = url.join("/") + "/367/267";
      let ret = await fetch(url);
      let blob = await ret.blob();
      /* just to demonstrate a loading spinner */
      await wait(350);
      let urlCreator = window.URL || window.webkitURL;
      this.imgSrc = urlCreator.createObjectURL(blob);
      return this.imgSrc;
    }
  }
};
</script>
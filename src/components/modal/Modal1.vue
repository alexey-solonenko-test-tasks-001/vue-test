<template>
  <div class="modal" v-bind:class="(show ? 'd-block' : 'd-none')">
    <div class="modal-content container">
      <div class="modal-header row">
        <div class="col-12">
          <button @click="$emit(closeModal)" class="close">X</button>
        </div>
      </div>
      <div class="modal-body">
        <div class="row" v-bind:class="(contentEmpty ? 'd-none' : 'd-flex')">
          <div class="col-12">
            <img src class="img-resize" id="modal-img" />
          </div>
          <div class="col-12">
            <p>Author: {{ img.author }}</p>
          </div>
          <div class="col-6">
              <a v-bind:href="img.url" target="_blank">
              <p>Explore this image</p>
              </a>
          </div>
          <!-- <div class="col-6">
            <button @click="downloadImg">
              <p>Download</p>
            </button>
          </div> -->
          <div class="col-12"></div>
        </div>
        <div class="row" v-bind:class="(contentEmpty ? 'd-block' : 'd-none')">
          <div class="col-12">Loading...</div>
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
      contentEmpty: true,
      closeModal: controlPanelEvents.closeModal,
      openModal: controlPanelEvents.openModal
    };
  },
  props: {
    show: {
      type: Boolean,
      required: false
    },
    img: {
      type: Object,
      required: false
    }
  },
  watch: {
    show: function() {
      if (!this.img || !this.img.id) {
        return;
      }

      if (this.show) {
        this.contentEmpty = true;
        fetch(this.img.download_url)
          .then(res => res.blob())
          .then(img => {
            let urlCreator = window.URL || window.webkitURL;
            let objUrl = urlCreator.createObjectURL(img);
            document.querySelector("#modal-img").src = objUrl;
            this.link = img.url;
            this.author = img.author;
            this.contentEmpty = false;
          })
          .catch(err => {
            this.contentEmpty = true;
            //eslint-disable-next-line
            console.log(err);
          });
      } else {
        this.contentEmpty = true;
      }
    }
  },
  methods: {
      downloadImg: function(){
          window.location = this.img.download_url;
      }
  }
};
</script>


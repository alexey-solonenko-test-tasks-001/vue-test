<template>
  <div
    class="image-gallery-modal__modal-base"
    id="image-gallery-modal"
    v-bind:class="(show ? 'd-block' : 'd-none')"
  >
    <div class="image-gallery-modal__modal-content container">
      <div class="row" v-bind:class="(contentEmpty ? 'd-none' : 'd-flex')">
        <div class="col-12">
          <img v-bind:src="imgSrc" class="image-gallery-modal__img" />
        </div>
        <div class="col-6 col-md-3">
          <p>Author: {{ img.author }}</p>
        </div>
        <div class="col-6 col-md-3 text-center">
          <a target="_blank" v-bind:href="img.url">Explore #{{ img.id }}</a>
        </div>
        <!-- <div class="col-6 col-md-3 text-center">
            <a target="_blank" download="img" v-bind:href="img.download_url">Download #{{ img.id }}</a>
        </div>-->
        <div class="col-6 col-md-3 text-center">
          <a
            target="_blank"
            v-bind:href="downloadLink"
            v-bind:download="img.author.replace(/\s/,'_')+'_id_'+img.id+'.jpeg'"
          >Download #{{ img.id }}</a>
        </div>

        <div class="col-6 col-md-3">
          <button class="image-gallery-modal__close-button" v-on:click="$emit(closeModal)">Close</button>
        </div>
        <div class="col-12"></div>
      </div>
      <div class="row" v-bind:class="( contentEmpty ? 'd-flex' : 'd-none')">
        <div class="col-12">
          <div class="image-gallery-modal__loading-background">
            <div style="{position:absolute}">
              <div class="image-gallery-modal__loading-spinner"></div>
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
      closeModal: controlPanelEvents.closeModal,
      contentEmpty: true,
      downloadLink: {},
      imgSrc: "",
      loading: true,
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
      const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
      if (this.show) {
        this.contentEmpty = true;
        fetch(this.img.download_url)
          .then(res => res.blob())
          .then(res => {
            /* Simulate the loading delay  */
            wait(400)
              .then(() => {
                return res;
              })
              .then(img => {
                let urlCreator = window.URL || window.webkitURL;
                let objUrl = urlCreator.createObjectURL(img);
                let dBlob = img.slice(0, img.size, "image/jpeg");
                this.downloadLink = urlCreator.createObjectURL(dBlob);
                this.imgSrc = objUrl;
                this.link = img.url;
                this.author = img.author;
                this.contentEmpty = false;
              });
          })
          .catch(err => {
            this.contentEmpty = true;
            //eslint-disable-next-line
            console.error(err);
          });
      } else {
        this.contentEmpty = true;
      }
    }
  },
  methods: {
    downloadImg: function() {
      window.location = this.img.download_url;
    }
  },
  created: function() {
    /* Hide modal if clicking outside its borders  */
    let vm = this;
    window.addEventListener("click", ev => {
      if (ev.target == document.getElementById("image-gallery-modal")) {
        vm.$emit(vm.closeModal);
      }
    });
  }
};
</script>


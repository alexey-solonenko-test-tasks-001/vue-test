<template>
  <div class="row">
    <div class="col-12 col-8">
      <ThumbsPerPageSlider
        v-on:[updateThumbsPerPageEvent]="thumbsPerPage = $event"
        :thumbsPerPage="thumbsPerPage"
      />
    </div>

    <div class='col-12 col-4'>
      <Paginator 
          v-on:[flipPage]="paginate"
          :currentPage="currentPage"
          :maxPage="maxPage"
          :minPage="minPage"
          />
    </div>

    <div class="col-12">
      <div class="row">
        <single-img-thumb v-for="img in imgListToShow" v-bind:key="img.id" v-bind:img="img" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @typedef import('../../components/control_panel/controlPanelEvents.js').controlPanelEvents
 */

/** @type controlPanelEvents */
import controlPanelEvents from "../../components/control_panel/controlPanelEvents.js";
import Paginator from "../../components/control_panel/Paginator.vue";
import SingleImgThumb from "../../components/imgs/SingleImgThumb.vue";
import ThumbsPerPageSlider from "../../components/control_panel/ThumbsPerPageSlider.vue";

export default {
  data: function() {
    return {
      imgListToShow: [],
      thumbsPerPage: 7,
      currentPage: 1,
      flipPage: controlPanelEvents.flipPage,
      maxPage:100,
      minPage:1,
      nextPageEv: controlPanelEvents.nextPage,
      nextPageDisabled: false,
      prevPageEv: controlPanelEvents.previousPage,
      prevPageDisabled: false,
      updateThumbsPerPageEvent: controlPanelEvents.updateThumbsPerPage,
    };
  },
  watch: {
    thumbsPerPage: function() {
      this.loadImages();
    },
    currentPage: function() {
      this.loadImages();
    }
  },
  created: function() {
    this.imgListToShow = this.loadImages();
  },
  methods: {
    loadImages: function() {
      let vm = this;
      fetch(
        `https://picsum.photos/v2/list?page=${this.currentPage}&limit=${this.thumbsPerPage}`
      )
        .then(res => res.json())
        .then(res => {
          vm.imgListToShow = res;
        });
    },
    paginate: function(dir) {
      //eslint-disable-next-line
            console.log(dir);
      if (dir < 0) {
        this.currentPage--;
        if (this.currentPage < 1) {
          this.currentPage = 1;
          this.prevPageDisabled = true;
        }
      } else if (dir > 0) {
        this.currentPage++;
      }
      this.loadImages();
    }
  },
  computed: {
  },
  components: {
    Paginator,
    SingleImgThumb,
    ThumbsPerPageSlider
  }
};
</script>
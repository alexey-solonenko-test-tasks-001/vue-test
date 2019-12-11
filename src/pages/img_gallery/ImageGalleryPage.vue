<template>
  <div class="image-gallery-page">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <ThumbsPerPageSlider
            v-on:[updateThumbsPerPageEvent]="thumbsPerPage = $event"
            :thumbsPerPage="thumbsPerPage"
          />
        </div>

        <div class="col-12 col-md-4">
          <Paginator
            v-on:[flipPage]="paginate"
            :currentPage="currentPage"
            :maxPage="maxPage"
            :minPage="minPage"
          />
        </div>

        <div class='col-12 col-md-4'>
          <AuthorSearchBar 
            v-on:[searchAuthor]="filterImagesByAuthor"
            v-bind:searchAuthorText="searchAuthorKeyword"
          />
        </div>

        <div class="col-12">
          <div class="row">
            <single-img-thumb v-for="img in imgListToShow" v-bind:key="img.id" v-bind:img="img" v-bind:searchKeyword="searchAuthorKeyword" v-on:[openModal]="openSingleImgModal" v-on:[closeModal]="closeSingleImgModal" />
          </div>
        </div>
      </div>
    </div>
    <Modal1 v-bind:show="showModal" v-bind:img="modalImg" v-on:[closeModal]="closeSingleImgModal" />
  </div>
</template>

<script>
/**
 * @typedef import('../../components/control_panel/controlPanelEvents.js').controlPanelEvents
 */

/** @type controlPanelEvents */
import controlPanelEvents from "../../components/control_panel/controlPanelEvents.js";
import AuthorSearchBar from '../../components/control_panel/AuthorSearchBar.vue';
import Modal1 from "../../components/modal/Modal1.vue";
import Paginator from "../../components/control_panel/Paginator.vue";
import SingleImgThumb from "../../components/imgs/SingleImgThumb.vue";
import ThumbsPerPageSlider from "../../components/control_panel/ThumbsPerPageSlider.vue";

export default {
  data: function() {
    return {
      closeModal: controlPanelEvents.closeModal,
      imgListToShow: [],
      thumbsPerPage: 7,
      openModal: controlPanelEvents.openModal,
      currentPage: 1,
      flipPage: controlPanelEvents.flipPage,
      maxPage: 100,
      minPage: 1,
      nextPageEv: controlPanelEvents.nextPage,
      nextPageDisabled: false,
      prevPageEv: controlPanelEvents.previousPage,
      prevPageDisabled: false,
      searchAuthor: controlPanelEvents.searchAuthor,
      searchAuthorKeyword: '',
      showModal: false,
      modalImg: {},
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
      this.searchAuthorKeyword = '';
      fetch(
        `https://picsum.photos/v2/list?page=${this.currentPage}&limit=${this.thumbsPerPage}`
      )
        .then(res => res.json())
        .then(res => {
          vm.imgListToShow = res;
        });
    },
    closeSingleImgModal : function(){
      this.showModal = false;
    },
    openSingleImgModal: function(img){
        this.showModal = true;
        this.modalImg = img;
    },
    paginate: function(dir) {
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
    },
    filterImagesByAuthor: function(keyword){
        this.searchAuthorKeyword = keyword; 
    }
  },
  computed: {},
  components: {
    AuthorSearchBar,
    Modal1,
    Paginator,
    SingleImgThumb,
    ThumbsPerPageSlider
  }
};
</script>
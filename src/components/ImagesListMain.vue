<template >
  <div class='container'>
    <ThumbsPerPageSlider
      v-on:update-thumbs-per-page="itemsPerPage = $event"
      :itemsPerPage="itemsPerPage"
    />
    <div id='pagination' class='row'>
        <input 
      v-model="itemsPerPage"
      @keydown.enter="loadImages"
      type='number' />
      <button @click="loadImages">Load Image</button>
      <button @click="paginate(-1)" :disabled="nextPageDisabled">Prev Page</button>
      <button @click="paginate(+1)">Next Page</button>
    </div>
    
    <div class='row'>
        <main-page-img-thumb v-for="img in imgListToShow" v-bind:key="img.id" v-bind:img="img" />
    </div>
  </div>
</template>

<script>
import MainPageImgThumb from "./MainPageImgThumb.vue";
import ThumbsPerPageSlider from './control_panel/ThumbsPerPageSlider.vue';
/* TODO to redo number of pages with a slider  */
export default {
  data: function() {
    /* Always do add brackets around multi-line return */
    return {
      imgListToShow: [],
      itemsPerPage: 7,
      currentPage: 1,
      prevPageDisabled: false,
      nextPageDisabled: false,
      //itemsPerPage: 30
    };
  },
  watch: {
    itemsPerPage: function() {
      this.loadImages();
    },
    currentPage: function(){
      this.loadImages();
    }
  },
  created: function() {
    this.imgListToShow = this.loadImages();
  },
  methods: {
    loadImages: function() {
      let vm = this;
      fetch(`https://picsum.photos/v2/list?page=${this.currentPage}&limit=${this.itemsPerPage}`)
        .then(res => res.json())
        .then(res => {
          vm.imgListToShow = res;
        });
    },
    paginate: function(dir){
        if(dir < 0){
          this.currentPage--;
          if(this.currentPage < 1) {
            this.currentPage= 1;
            this.prevPageDisabled = true;
          }
        } else if (dir > 0){
            this.currentPage++;
          }
        this.loadImages();
    }
  },computed: {
    listenToPicsPerPage(){
          // eslint-disable-next-line
          console.log(arguments);
          // eslint-disable-next-line
          console.log();
          return 30;
        },
  },
  components : {
      MainPageImgThumb,
      ThumbsPerPageSlider
  }
};
</script>
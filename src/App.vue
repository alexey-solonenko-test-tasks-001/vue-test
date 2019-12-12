<template>
  <div id="app">
    <GoToTop />
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <ImageGalleryPage />
  </div>
</template>

<script>
import GoToTop from './components/ui/GoToTop.vue';
import ImageGalleryPage from './pages/img_gallery/ImageGalleryPage.vue';

export default {
  name: "app",
  components: {
    GoToTop,
    ImageGalleryPage
  }
};

</script>
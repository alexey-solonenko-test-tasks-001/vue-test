<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <ImageGalleryPage />
  </div>
</template>

<script>
import ImageGalleryPage from './pages/img_gallery/ImageGalleryPage.vue';

export default {
  name: "app",
  components: {
    ImageGalleryPage
  }
};

</script>
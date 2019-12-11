<template>
  <div id="app" class='container'>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <ImageGalleryPage />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import ImageGalleryPage from './pages/img_gallery/ImageGalleryPage.vue';

export default {
  name: "app",
  components: {
    ImageGalleryPage
  }
};

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

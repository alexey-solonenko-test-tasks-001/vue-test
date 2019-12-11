<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <ImagesListMain />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import ImagesListMain from './components/ImagesListMain.vue';

export default {
  name: "app",
  components: {
    // HelloWorld,
    ImagesListMain
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

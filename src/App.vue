<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
  html, body {
    margin: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
  }

  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    background-image: url("assets/background.jpg");
  }

  .ui-element {
    background-color: white;
    box-sizing: border-box;
  }
</style>

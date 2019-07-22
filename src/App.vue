<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script src="../public/font/iconfont.js"></script>
<script>
  export default {
    name: "App",
    components: {

    },
    data() {
      return {
        //
      }
    }
  }
</script>

<style>
  @import "./common/font.css";
  @import "../public/font/iconfont.css";

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  input:focus {
    border: 1px solid rgb(255, 180, 3);
  }
</style>
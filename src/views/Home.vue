<template>
 <div class="body">
  <topNav></topNav>
  <router-view/>
 </div>
</template>

<script>
import demo from "../components/demo";
import topNav from "../components/TopNav";

export default {
    components: {
      demo,
      topNav
    }
  }
</script>

<style>
  .body{
    width: 100vw;
    height: 1000px;
    /* background-color: brown; */
  }
</style>

<template>
  <q-layout
      view="hHh Lpr lFf"
      style="font-family: Roboto, sans-serif; font-size: 14px"
      class="bg-grey-9"
  >

    <router-view></router-view>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LayoutDefault',
  setup () {
    return {
      leftDrawerOpen: ref(false),
      value: ref(true),
      slide: ref(1),
      autoplay: ref(true),
    }
  },
}
</script>
<style scoped lang="scss">
@import "quasar.variables";

.container {
  margin: 5vh auto;
}

.description__left {
  color: white;
  max-width: 400px;
  margin: 40px auto;
  font-family: "News of the World";
  font-size: 1.1vw;
}

.title {
  font-size: 7vw;
  text-align: center;
  font-family: "News of the World";
  margin: 10vh auto;
}

.section__carousel {
  margin-right: 5%;
  margin-left: 5%;
  border: 1.5em solid $light-blue-14;
  border-radius: 20px;
  box-shadow: 10px 10px 10px 5px $light-blue-14;
}

.image__marquee {
  height: 50px; /* Any size you want */
  background-image: url("../src/assets/soccersi.jpeg");
  animation: imageMovement 8s linear infinite;
  @keyframes imageMovement {
    100% {
      background-position-x: 728px; /* width of the image */
    }
  }
}
</style>

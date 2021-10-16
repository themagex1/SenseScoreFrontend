<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar style="gap: 20px">
        <q-toolbar-title>
          <img alt="App logo" src="@/assets/logo.png" />
        </q-toolbar-title>

        <div>
          <a href="" style="text-decoration: none; color: white">Home</a>
        </div>
        <div>
          <a href="" style="text-decoration: none; color: white">About</a>
        </div>
        <div>
          <a href="" style="text-decoration: none; color: white">Contact us</a>
        </div>
        <div style="color: yellow">Zalogowano jako</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <HelloWorld />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "LayoutDefault",

  components: {
    HelloWorld,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>

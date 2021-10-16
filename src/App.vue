<template>
  <q-layout
    view="hHh Lpr lFf"
    style="font-family: Roboto, sans-serif; font-size: 14px"
  >
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
      <div
        style="float: right; margin-right: 20px; margin-top: 50px; width: 550px"
      >
        <div class="q-mt-md q-gutter-md">
          <div>
            <q-icon
              name="favorite"
              class="text-primary"
              style="font-size: 4rem"
            /><span
              style="
                margin-left: 10px;
                font-size: 1.5rem;
                text-transform: uppercase;
              "
              >Follow your favourite teams</span
            >
          </div>
          <div>
            <q-icon
              name="sports"
              class="text-primary"
              style="font-size: 4rem"
            /><span
              style="
                margin-left: 10px;
                font-size: 1.5rem;
                text-transform: uppercase;
              "
              >Get live results</span
            >
          </div>
          <div>
            <q-icon
              name="edit"
              class="text-primary"
              style="font-size: 4rem"
            /><span
              style="
                margin-left: 10px;
                font-size: 1.5rem;
                text-transform: uppercase;
              "
              >Edit your choices</span
            >
          </div>
          <div>
            <q-icon
              name="play_arrow"
              class="text-primary"
              style="font-size: 4rem"
            /><span
              style="
                margin-left: 10px;
                font-size: 1.5rem;
                text-transform: uppercase;
              "
              >Try our bookmaker's game</span
            >
          </div>
        </div>
      </div>

      <login-register />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import LoginRegister from "./components/login-register.component.vue";

export default {
  name: "LayoutDefault",

  components: {
    LoginRegister,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>

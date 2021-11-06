<template>
  <q-layout
    view="hHh Lpr lFf"
    style="font-family: Roboto, sans-serif; font-size: 14px"
    class="bg-grey-9"
  >
    <q-header elevated class="bg-light-blue-14">
      <q-toolbar style="gap: 20px">
        <q-toolbar-title>
          <img alt="App logo" src="@/assets/logo.png" />
        </q-toolbar-title>

        <div>
          <q-toggle
            v-model="value"
            color="grey-9"
            class="text-weight-bold text-grey-9"
            >Dark Mode</q-toggle
          >
        </div>
        <div>
          <q-btn
            class="text-weight-bold"
            icon-right="home"
            color="grey-9"
            flat
            no-caps
            to="/favourites"
            >Home</q-btn
          >
        </div>
        <div>
          <q-btn
            class="text-weight-bold"
            icon-right="people"
            color="grey-9"
            flat
            no-caps
            to="/about"
            >About Us</q-btn
          >
        </div>
        <div>
          <q-btn-dropdown flat dropdown-icon="menu" color="grey-9">
            <q-list>
              <q-item clickable @click="click">
                <q-item-section>
                  <q-item-label>FAQ</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="question_answer" />
                </q-item-section>
              </q-item>
              <q-item clickable @click="click">
                <q-item-section>
                  <q-item-label>Kontakt</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="contact_support" />
                </q-item-section>
              </q-item>
              <q-item clickable @click="click">
                <q-item-section>
                  <q-item-label>Opinie</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="grade" />
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <span class="material-icons">copyright</span>
              <span style="font-size: 10px"> Sense Score</span>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
      <!--<login-register />-->
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  name: "LayoutDefault",
  components: {},
  setup() {
    return {
      leftDrawerOpen: ref(false),
      value: ref(true),
    };
  },
};
</script>
<style>
.description-left {
  color: white;
  max-width: 400px;
  margin: 40px auto;
}
</style>

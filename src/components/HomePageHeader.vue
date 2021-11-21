<template>
  <q-header elevated class="bg-light-blue-14">
    <q-toolbar style="gap: 20px">
      <q-toolbar-title>
        <img alt="App logo" src="@/assets/logo.png" />
      </q-toolbar-title>

      <div>
        <p
          class="text-weight-bold"
          icon-right="people"
          color="grey-9"
          flat
          no-caps
        >
          Logged as
        </p>
        <p>test</p>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from "vue";

export default {
  name: "home-page-header",
  setup() {
    return {
      value: ref(true),
    };
  },
};
</script>

<style scoped>
</style>

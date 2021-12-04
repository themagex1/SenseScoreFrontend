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
          Saldo:
        </p>
        <p>{{ balance.balance }}$</p>
      </div>
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
import axios from "axios";

const bearer = localStorage.getItem("bearer");

export default {
  name: "home-page-header",
  setup() {
    return {
      value: ref(true),
    };
  },
  data() {
    return {
      balance: "",
    };
  },
  mounted() {
    axios
      .request({
        method: "get",
        baseURL: "https://localhost:5001/api/Betting/balance",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.balance = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Ubuntu&display=swap");

.q-item,
q.input,
q.list,
p,
.q-tab,
.q-btn,
.q-toolbar {
  font-family: "Mochiy Pop One", sans-serif;
  font-family: "Ubuntu", sans-serif;
}
</style>

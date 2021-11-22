<template>
  <q-layout view="hHh lpR fFf">
    <HomePageHeader />
    <HomePageDrawer />
    <q-page-container>
      <RoutingTabs />
      <div class="q-pa-md">
        <div
          class="q-gutter-y-md row"
          style="width: 100%; justify-content: center"
        >
          <q-input
            color="blue-7"
            v-model="text"
            label="Search"
            @keyup.enter="
              searchTeams();
              searchPlayers();
            "
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <section v-if="errored">
        <p>
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </p>
      </section>

      <section v-else>
        <div class="q-pa-md row" style="justify-content: center">
          <q-list
            bordered
            separator
            class="q-gutter-y-md text-primary"
            style="width: col-2"
          >
            <q-item
              clickable
              v-ripple
              v-for="team in searchResult"
              :key="team.idTeam"
              class="text-blue"
            >
              <q-item-section>{{ team.strTeam }}</q-item-section>
              <q-item-section>{{ team.strSport }}</q-item-section>
              <q-item-section side>
                <q-icon name="star" />
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              v-for="team in searchPlayerResult"
              :key="team.idTeam"
              class="text-blue"
            >
              <q-item-section>{{ team.strPlayer }}</q-item-section>
              <q-item-section>{{ team.strTeam }}</q-item-section>
              <q-item-section side>
                <q-icon name="star" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </section>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import HomePageHeader from "@/components/HomePageHeader";
import HomePageDrawer from "@/components/HomePageDrawer";
import RoutingTabs from "@/components/RoutingTabs";
import axios from "axios";

let url = "https://localhost:5001/api/SportDB/";

export default {
  name: "addFavourites",
  components: { HomePageHeader, RoutingTabs, HomePageDrawer },
  setup() {
    return {
      value: ref(true),
      text: ref(""),
    };
  },
  data() {
    return {
      loading: true,
      errored: false,
      searchResult: null,
      searchPlayerResult: null,
    };
  },
  methods: {
    searchTeams() {
      return axios
        .get(url + `search/teams/${this.text}`)
        .then((response) => (this.searchResult = response.data))
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    searchPlayers() {
      return axios
        .get(url + `search/players/${this.text}`)
        .then((response) => (this.searchPlayerResult = response.data))
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Ubuntu&display=swap");
.q-item,
q.input,
q.list {
  font-family: "Mochiy Pop One", sans-serif;
  font-family: "Ubuntu", sans-serif;
}
</style>
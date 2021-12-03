<template>
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <div class="q-pa-md" style="max-width: 350px">
      <q-btn
        align="between"
        class="btn-fixed-width"
        color="blue"
        label="Settings"
        icon="settings"
        style="width: 100%"
      />
    </div>
    <div class="q-pa-md">
      <q-btn
        align="between"
        class="btn-fixed-width"
        color="blue"
        label="Add favourites"
        icon="add"
        style="width: 100%"
        to="/add-favourites"
      />
    </div>
    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          icon="sports_esports"
          label="Favourite sports"
          header-class="text-blue"
        >
          <q-item
            clickable
            v-ripple
            v-for="sport in favouritesports"
            :key="sport"
          >
            <q-item-section>{{ sport.strSport }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="person"
          label="Favourite athlete"
          header-class="text-blue"
        >
          <q-item
            clickable
            v-ripple
            v-for="athlete in favouriteathletes"
            :key="athlete"
          >
            <q-item-section>
              <q-item-section>{{ athlete.strPlayer }}</q-item-section>
              <q-item-label caption>{{ athlete.strTeam }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="groups"
          label="Favourite teams"
          header-class="text-blue"
        >
          <q-item clickable v-ripple v-for="team in favouriteteams" :key="team">
            <q-item-section>
              <q-item-section>{{ team.strTeam }}</q-item-section>
              <q-item-label caption>{{ team.strSport }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="groups"
          label="Favourite leagues"
          header-class="text-blue"
        >
          <q-item
            clickable
            v-ripple
            v-for="league in favouriteleagues"
            :key="league"
          >
            <q-item-section>
              <q-item-section>{{ league.strLeague }}</q-item-section>
              <q-item-label caption>{{ league.strSport }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </div>
    <div class="q-pa-md">
      <q-btn
        align="between"
        class="btn-fixed-width"
        color="blue"
        label="Coupons"
        icon="payments"
        style="width: 100%"
      />
    </div>
  </q-drawer>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

const bearer = localStorage.getItem("bearer");
let url = "https://localhost:5001/api/";

export default {
  name: "home-page-header",
  props: {
    favouritesports: [],
    favouriteathletes: [],
    favouriteleagues: [],
    favouriteteams: [],
  },
  setup() {
    return {
      value: ref(true),
    };
  },
  mounted() {
    axios
      .request({
        method: "get",
        baseURL: url + "SportDB/favourite/teams",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.favouriteTeams = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "SportDB/favourite/sports",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.favouriteSports = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "SportDB/favourite/leagues",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.favouriteLeagues = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "SportDB/favourite/athletes",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.favouriteAthletes = response.data;
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
.q-select {
  font-family: "Mochiy Pop One", sans-serif;
  font-family: "Ubuntu", sans-serif;
}
</style>
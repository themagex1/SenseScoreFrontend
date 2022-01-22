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
        @click="prompt = true"
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
          v-if="favouritesports != null"
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
          v-else
          expand-separator
          icon="sports_esports"
          label="Favourite sports"
          header-class="text-blue"
        >
          <q-item
            clickable
            v-ripple
            v-for="sport in favouriteSports"
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
          v-if="favouriteathletes != null"
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
          icon="person"
          label="Favourite athlete"
          header-class="text-blue"
          v-else
        >
          <q-item
            clickable
            v-ripple
            v-for="athlete in favouriteAthletes"
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
          v-if="favouriteteams != null"
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
          label="Favourite teams"
          header-class="text-blue"
          v-else
        >
          <q-item clickable v-ripple v-for="team in favouriteTeams" :key="team">
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
          v-if="favouriteleagues != null"
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
        <q-expansion-item
          expand-separator
          icon="groups"
          label="Favourite leagues"
          header-class="text-blue"
          v-else
        >
          <q-item
            clickable
            v-ripple
            v-for="league in favouriteLeagues"
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
    <q-dialog v-model="prompt" persistent>
      <q-card class="my-card" style="min-width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Account management</div>
        </q-card-section>

        <q-separator />
        <q-card-section class="q-pt-none">
          <q-input v-model="login" label="Login" />
          <q-input v-model="password" type="password" label="Password" />
        </q-card-section>

        <q-card-section>
          <q-btn>Change password</q-btn>
          <q-btn @click="deleteAccount(login, password)">Delete account</q-btn>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat v-close-popup>Cancel</q-btn>
          <q-btn flat v-close-popup>Ok</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-drawer>
</template>

<script>
import { ref } from "vue";
import axiosR from "../services/api";
import * as sha256 from "sha256";
import { TokenService } from "../services/token.service";

const bearer = localStorage.getItem("bearer");
const login = localStorage.getItem("user", login);
let url = "api/";

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
      favouriteSports: [],
      favouriteAthletes: [],
      favouriteLeagues: [],
      favouriteTeams: [],
      prompt: ref(false),
      password: ref(""),
      login: ref(""),
      value: ref(true),
    };
  },
  methods: {
    logout() {
      TokenService.removeUser();
    },
    deleteAccount(login, pass) {
      let self = this;
      axiosR({
        method: "delete",
        baseURL: "api/Account/account",
        headers: {
          Authorization: "Bearer " + bearer,
        },
        data: {
          login: login,
          passHash: sha256(pass),
        },
      })
        .then((response) => {
          console.log(response);
          self.$router.push("/home");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    axiosR
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
    axiosR
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
    axiosR
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
    axiosR
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
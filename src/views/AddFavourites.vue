<template>
  <q-layout view="hHh lpR fFf">
    <HomePageHeader />
    <HomePageDrawer />
    <q-page-container>
      <RoutingTabs />
      <div class="q-pa-md">
        <q-list
          class="q-gutter-y-md row"
          style="justify-content: space-between; border: 1px solid #bbdefb"
        >
          <q-item
            v-ripple
            v-for="sport in sports"
            :key="sport.idSport"
            class="text-blue col-2"
          >
            <q-item-section>{{ sport.strSport }}</q-item-section>
            <q-item-section thumbnail>
              <img :src="sport.strSportThumb" />
            </q-item-section>
            <q-item-section side>
              <q-btn
                v-bind:class="{ active: myBtnClass(sport.strSport) }"
                round
                color="primary"
                icon="star"
                @click="addFav('sport', sport.idSport)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

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
              searchLeagues();
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
            <q-item-label header v-if="searchResult.length">Teams</q-item-label>
            <q-item
              v-ripple
              v-for="team in searchResult"
              :key="team.idTeam"
              class="text-blue"
            >
              <q-item-section>{{ team.strTeam }}</q-item-section>
              <q-item-section>{{ team.strSport }}</q-item-section>
              <q-item-section side>
                <q-btn
                  v-bind:class="{ active: myTeams(team.idTeam) }"
                  round
                  color="primary"
                  icon="star"
                  @click="addFav('team', team.idTeam)"
                />
              </q-item-section>
            </q-item>
            <q-item-label header v-if="searchPlayerResult.length"
              >Athletes</q-item-label
            >
            <q-item
              v-ripple
              v-for="player in searchPlayerResult"
              :key="player.idPlayer"
              class="text-blue"
            >
              <q-item-section>{{ player.strPlayer }}</q-item-section>
              <q-item-section>{{ player.strTeam }}</q-item-section>
              <q-item-section side>
                <q-btn
                  v-bind:class="{ active: myAthletes(player.idPlayer) }"
                  round
                  color="primary"
                  icon="star"
                  @click="addFav('athlete', player.idPlayer)"
                />
              </q-item-section>
            </q-item>
            <q-item-label header v-if="filteredLeagues.length"
              >Leagues</q-item-label
            >
            <q-item
              v-ripple
              v-for="league in filteredLeagues"
              :key="league.idLeague"
              class="text-blue"
            >
              <q-item-section>{{ league.strLeague }}</q-item-section>
              <q-item-section>{{ league.strSport }}</q-item-section>
              <q-item-section side>
                <q-btn
                  v-bind:class="{ active: myLeagues(league.idLeague) }"
                  round
                  color="primary"
                  icon="star"
                  @click="addFav('league', league.idLeague)"
                />
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
const bearer = localStorage.getItem("bearer");

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
      searchResult: [],
      searchPlayerResult: [],
      sports: [],
      leagues: [],
      filteredLeagues: [],
      favouriteSports: [],
      favouriteTeams: [],
      favouriteLeagues: [],
      favouriteAthletes: [],
    };
  },
  methods: {
    myBtnClass: function (name) {
      let result = false;
      for (let i = 0; i < this.favouriteSports.length; i++)
        if (this.favouriteSports[i].strSport === name) result = true;
      return result;
    },
    myTeams: function (team) {
      let result = false;
      for (let i = 0; i < this.favouriteTeams.length; i++)
        if (this.favouriteTeams[i].idTeam === team) result = true;
      return result;
    },
    myLeagues: function (league) {
      let result = false;
      for (let i = 0; i < this.favouriteTeams.length; i++)
        if (this.favouriteLeagues[i].idLeague === league) result = true;
      return result;
    },
    myAthletes: function (athlete) {
      let result = false;
      for (let i = 0; i < this.favouriteAthletes.length; i++)
        if (this.favouriteAthletes[i].idPlayer === athlete) result = true;
      return result;
    },
    addFav(category, id) {
      axios({
        method: "post",
        baseURL: "https://localhost:5001/" + "Account/favourite",
        headers: {
          Authorization: "Bearer " + bearer,
        },
        data: {
          category: category,
          id: id,
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
    searchLeagues() {
      this.filteredLeagues = this.leagues.filter((b) => {
        return b.strLeague
          .toLowerCase()
          .trim()
          .includes(this.text.toLowerCase().trim());
      });
    },
  },
  mounted() {
    axios
      .get(url + "sports")
      .then(
        (response) =>
          (this.sports = response.data.sort((a, b) => {
            return a.strSport.localeCompare(b.strSport);
          }))
      )
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/teams",
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
        baseURL: url + "favourite/sports",
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
        baseURL: url + "favourite/leagues",
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
        baseURL: url + "favourite/athletes",
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
    axios
      .get(url + "leagues")
      .then((response) => {
        this.leagues = response.data;
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
q.list {
  font-family: "Ubuntu", sans-serif;
}
.active {
  color: yellow !important;
}
</style>
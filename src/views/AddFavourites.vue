<template>
  <q-layout view="hHh lpR fFf">
    <HomePageHeader />
    <HomePageDrawer
      :favouritesports="favouriteSports"
      :favouriteleagues="favouriteLeagues"
      :favouriteteams="favouriteTeams"
      :favouriteathletes="favouriteAthletes"
    />
    <q-page-container>
      <RoutingTabs />
      <div class="q-pa-lg">
        <q-list class="q-gutter-y-md row" style="justify-content: flex-start">
          <q-item
            v-ripple
            v-for="sport in sports"
            :key="sport.idSport"
            class="text-yellow"
          >
            <q-item-section>
              <div>{{ sport.strSport }}</div>
              <q-item-section thumbnail>
                <img :src="sport.strSportThumb" />
              </q-item-section>
            </q-item-section>

            <q-item-section side bottom>
              <q-btn
                v-bind:class="{ active: mySports(sport.idSport) }"
                flat
                round
                icon="favorite"
                @click="
                  checkFav(sport.idSport, 'sport')
                    ? deleteFav('sport', sport.idSport)
                    : addFavSport('sport', sport.idSport)
                "
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-pa-md" style="padding: 0px 16px 16px 16px">
        <div
          class="q-gutter-y-md row"
          style="width: 100%; justify-content: center"
        >
          <q-input
            standout
            v-model="text"
            label="Search"
            label-color="yellow"
            class="text-yellow"
            @keyup.enter="
              searchTeams();
              searchPlayers();
              searchLeagues();
            "
          >
            <template v-slot:append>
              <q-icon color="yellow" name="search" />
            </template>
          </q-input>
        </div>
        <div
          v-if="!ifText"
          class="ifNotText"
          style="text-align: center; color: white"
        >
          You must write something
        </div>
      </div>
      <section v-if="errored">
        <p>
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </p>
      </section>

      <section v-else>
        <div class="q-pa-md row" style="justify-content: space-between">
          <q-list class="q-gutter-y-md" style="width: col-2">
            <q-item-label
              header
              style="
                font-size: 3em;
                text-align: center;
                color: #f9f871;
                padding: 0 2em;
                width: 300px;
              "
              >Teams</q-item-label
            >
            <div v-if="searchResult == null">No results...</div>
            <q-item
              v-ripple
              v-for="team in searchResult"
              :key="team.idTeam"
              class="q-pl-md q-pr-md"
              style="border: 1px solid #f9f871; color: #ffffff !important"
            >
              <q-item-section
                >{{ team.strTeam }}({{ team.strSport }})</q-item-section
              >
              <q-item-section side>
                <q-btn
                  v-bind:class="{ active: myTeams(team.idTeam) }"
                  round
                  icon="favorite"
                  @click="
                    checkFav(team.idTeam, 'team')
                      ? deleteFav('team', team.idTeam)
                      : addFavTeam('team', team.idTeam)
                  "
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-list class="q-gutter-y-md" style="width: col-2">
            <q-item-label
              header
              style="
                font-size: 3em;
                text-align: center;
                color: #f9f871;
                padding: 0 2em;
                width: 300px;
              "
              >Athletes</q-item-label
            >
            <div v-if="searchPlayerResult == null">No results...</div>
            <q-item
              v-ripple
              v-for="player in searchPlayerResult"
              :key="player.idPlayer"
              class="q-pl-md q-pr-md"
              style="border: 1px solid #f9f871; color: #ffffff !important"
            >
              <q-item-section
                >{{ player.strPlayer }}({{ player.strTeam }})</q-item-section
              >
              <q-item-section side>
                <q-btn
                  v-bind:class="{ active: myAthletes(player.idPlayer) }"
                  flat
                  round
                  icon="favorite"
                  @click="
                    checkFav(player.idPlayer, 'athlete')
                      ? deleteFav('athlete', player.idPlayer)
                      : addFavAthlete('athlete', player.idPlayer)
                  "
                />
              </q-item-section>
            </q-item>
          </q-list>
          <q-list class="q-gutter-y-md" style="width: col-2">
            <q-item-label
              header
              style="
                font-size: 3em;
                text-align: center;
                color: #f9f871;
                padding: 0 2em;
                width: 300px;
              "
              >Leagues</q-item-label
            >
            <div v-if="filteredLeagues == null">No results...</div>
            <q-item
              v-ripple
              v-for="league in filteredLeagues"
              :key="league.idLeague"
              class="q-pl-md q-pr-md"
              style="border: 1px solid #f9f871; color: #ffffff !important"
            >
              <q-item-section
                >{{ league.strLeague }}({{ league.strSport }})</q-item-section
              >
              <q-item-section side>
                <q-btn
                  v-bind:class="{ active: myLeagues(league.idLeague) }"
                  round
                  flat
                  icon="favorite"
                  @click="
                    checkFav(league.idLeague, 'league')
                      ? deleteFav('league', league.idLeague)
                      : addFavLeague('league', league.idLeague)
                  "
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
      ifText: true,
    };
  },
  methods: {
    mySports: function (id) {
      let result = false;
      for (let i = 0; i < this.favouriteSports.length; i++)
        if (this.favouriteSports[i].idSport === id) result = true;
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
      for (let i = 0; i < this.favouriteLeagues.length; i++)
        if (this.favouriteLeagues[i].idLeague === league) result = true;
      return result;
    },
    myAthletes: function (athlete) {
      let result = false;
      for (let i = 0; i < this.favouriteAthletes.length; i++)
        if (this.favouriteAthletes[i].idPlayer === athlete) result = true;
      return result;
    },
    removeFav(category, id) {
      axios({
        method: "delete",
        baseURL: "https://localhost:5001/" + "api/Account/favourite",
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
    checkFav(id, object) {
      switch (object) {
        case "sport": {
          if (this.favouriteSports.filter((x) => x.idSport == id).length)
            return true;
          else return false;
        }
        case "team": {
          if (this.favouriteTeams.filter((x) => x.idTeam == id).length != 0)
            return true;
          else return false;
        }
        case "league": {
          if (this.favouriteLeagues.filter((x) => x.idLeague == id).length)
            return true;
          else return false;
        }
        case "athlete": {
          if (this.favouriteAthletes.filter((x) => x.idPlayer == id).length)
            return true;
          else return false;
        }
      }
    },
    postFav (category, id) {
      axios({
        method: 'post',
        baseURL: 'https://localhost:5001/' + 'api/Account/favourite',
        headers: {
          Authorization: 'Bearer ' + bearer,
        },
        data: {
          category: category,
          id: id,
        },
      })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    postFavTeam(category, id) {
      axios({
        method: "post",
        baseURL: "https://localhost:5001/" + "api/Account/favourite",
        headers: {
          Authorization: "Bearer " + bearer,
        },
        data: {
          category: category,
          id: id,
        },
      })
        .then(() => {
          axios
            .request({
              method: "get",
              baseURL: url + `favourite/teams`,
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
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postFavAthlete(category, id) {
      axios({
        method: "post",
        baseURL: "https://localhost:5001/" + "api/Account/favourite",
        headers: {
          Authorization: "Bearer " + bearer,
        },
        data: {
          category: category,
          id: id,
        },
      })
        .then(() => {
          axios
            .request({
              method: "get",
              baseURL: url + `favourite/athletes`,
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
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    postFavLeague(category, id) {
      axios({
        method: "post",
        baseURL: "https://localhost:5001/" + "api/Account/favourite",
        headers: {
          Authorization: "Bearer " + bearer,
        },
        data: {
          category: category,
          id: id,
        },
      })
        .then(() => {
          axios
            .request({
              method: "get",
              baseURL: url + `favourite/leagues`,
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
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteFav(category, id) {
      this.removeFav(category, id);
      switch (category) {
        case "sport": {
          this.favouriteSports = this.favouriteSports.filter(
            (x) => x.idSport !== id
          );
          break;
        }
        case "league": {
          this.favouriteLeagues = this.favouriteLeagues.filter(
            (x) => x.idLeague !== id
          );
          this.bool = !this.bool;
          break;
        }
        case "team": {
          this.favouriteTeams = this.favouriteTeams.filter(
            (x) => x.idTeam !== id
          );
          this.bool = !this.bool;
          break;
        }
        case "athlete": {
          this.favouriteAthletes = this.favouriteAthletes.filter(
            (x) => x.idPlayer !== id
          );
          this.bool = !this.bool;
          break;
        }
      }
    },
    addFavSport(category, id) {
      this.postFav(category, id);
      axios
        .request({
          method: "get",
          baseURL: url + `favourite/sports`,
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
    },
    addFavTeam(category, id) {
      this.postFavTeam(category, id);
    },
    addFavAthlete(category, id) {
      this.postFavAthlete(category, id);
    },
    addFavLeague(category, id) {
      this.postFavLeague(category, id);
    },
    searchTeams() {
      if (this.text === "") {
        this.ifText = false;
      } else {
        this.ifText = true;
        return axios
          .get(url + `search/teams/${this.text}`)
          .then((response) => (this.searchResult = response.data))
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    },
    searchPlayers() {
      if (this.text === "") {
        this.ifText = false;
      } else {
        this.ifText = true;
        return axios
          .get(url + `search/players/${this.text}`)
          .then((response) => (this.searchPlayerResult = response.data))
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    },
    searchLeagues() {
      if (this.text === "") {
        this.ifText = false;
      } else {
        this.ifText = true;
        this.filteredLeagues = this.leagues.filter((b) => {
          return b.strLeague
            .toLowerCase()
            .trim()
            .includes(this.text.toLowerCase().trim());
        });
      }
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

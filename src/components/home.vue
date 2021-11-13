<template>

  <q-layout view="hHh lpR fFf">
    <MainPageHeader/>
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
        />
      </div>
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            expand-separator
            icon="sports_esports"
            label="Favourite sports"
            header-class="text-blue"
            default-opened
          >
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="sports_soccer" />
              </q-item-section>
              <q-item-section>Football</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="sports_tennis" />
              </q-item-section>
              <q-item-section>Tennis</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="sports_basketball" />
              </q-item-section>
              <q-item-section>Basketball</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="sports_volleyball" />
              </q-item-section>
              <q-item-section>Volleyball</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="sports_cricket" />
              </q-item-section>
              <q-item-section>Cricket</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="primary" name="pool" />
              </q-item-section>
              <q-item-section>Swimming</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon="person"
            label="Favourite athlete"
            header-class="text-blue"
          >
            <q-item clickable v-ripple>
              <q-item-section>Robert Lewandowski</q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon="groups"
            label="Favourite teams"
            header-class="text-blue"
          >
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-section>Polska</q-item-section>
                <q-item-label caption>Football</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-section>FC Barcelona</q-item-section>
                <q-item-label caption>Football</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon="groups"
            label="Favourite leagues"
            header-class="text-blue"
          >
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-section>Premier League</q-item-section>
                <q-item-label caption>Football</q-item-label>
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
    <q-page-container>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 350px; float: right">
          <q-card>
            <q-tabs
              v-model="tab1"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="allleagues" label="All leagues" />
              <q-tab name="allsports" label="All sports" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab1" animated>
              <q-tab-panel name="allleagues">
                <q-item
                  clickable
                  v-ripple
                  v-for="league in getLeagueData"
                  :key="league.strLeague"
                >
                  <q-item-section>
                    <q-item-label>{{ league.strLeague }}</q-item-label>
                    <q-item-label caption>{{ league.strSport }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-pagination
                  v-model="page"
                  :min="currentPage"
                  :max="Math.ceil(leagues.length / totalPages)"
                  :input="true"
                  input-class="text-orange-10"
                >
                </q-pagination>
              </q-tab-panel>

              <q-tab-panel name="allsports">
                <q-item
                  clickable
                  v-ripple
                  v-for="sport in getSportData"
                  :key="sport.strSport"
                >
                  <q-item-section avatar>
                    <img
                      :src="require(`@/assets/${sport.strSport}.png`)"
                      alt
                      class="icon"
                      style="height: 40px; max-width: 40px"
                    />
                  </q-item-section>
                  <q-item-section class="text-green">
                    {{ sport.strSport }}
                  </q-item-section>
                </q-item>

                <q-pagination
                  v-model="sportPage"
                  :min="currentSportPage"
                  :max="Math.ceil(sports.length / totalSportPages)"
                  :input="true"
                  input-class="text-orange-10"
                >
                </q-pagination>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 850px">
          <p class="text-blue-7 text-uppercase text-h4">Favourites section</p>
          <q-card class="bg-grey-4">
            <q-tabs
              v-model="tab"
              dense
              class="text-grey bg-grey-4"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab
                name="finished"
                icon="check_circle_outline"
                label="Finished events"
              />
              <q-tab name="upcoming" icon="upcoming" label="Upcoming events" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated class="bg-grey-3">
              <q-tab-panel name="finished">
                <div class="q-pa-md" style="max-width: 850px; padding: 10px">
                  <q-list>
                    <q-item v-for="match in lastMatches" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label> {{ match.strSport }}</q-item-label>
                        <q-item-label caption lines="1">
                          {{ match.strLeague }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-2">
                        <img
                          :src="require(`@/assets/${match.strSport}.png`)"
                          alt
                          class="icon"
                          style="height: 20px; max-width: 20px"
                        />
                      </q-item-section>
                      <q-item-section>
                        {{ match.strHomeTeam }}-{{ match.strAwayTeam }}
                      </q-item-section>
                      <q-item-section class="text-blue-9">
                        {{ match.intHomeScore }}-{{ match.intAwayScore }}
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{ match.strTime }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator spaced inset />
                    <q-item v-for="match in lastMatches2" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label> {{ match.strSport }}</q-item-label>
                        <q-item-label caption lines="1">
                          {{ match.strLeague }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-2">
                        <img
                          :src="require(`@/assets/${match.strSport}.png`)"
                          alt
                          class="icon"
                          style="height: 20px; max-width: 20px"
                        />
                      </q-item-section>
                      <q-item-section>
                        {{ match.strHomeTeam }}-{{ match.strAwayTeam }}
                      </q-item-section>
                      <q-item-section class="text-blue-9">
                        {{ match.intHomeScore }}-{{ match.intAwayScore }}
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{ match.strTime }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>

              <q-tab-panel name="upcoming">
                <div class="q-pa-md" style="max-width: 850px">
                  <q-list>
                    <q-item v-for="match in nextMatches" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label> {{ match.strSport }}</q-item-label>
                        <q-item-label caption lines="1">
                          {{ match.strLeague }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-2">
                        <img
                          :src="require(`@/assets/${match.strSport}.png`)"
                          alt
                          class="icon"
                          style="height: 20px; max-width: 20px"
                        />
                      </q-item-section>
                      <q-item-section>
                        {{ match.strHomeTeam }}-{{ match.strAwayTeam }}
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label>{{
                          match.strTime || currentDate
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator spaced inset />
                    <q-item v-for="match in nextMatches2" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label> {{ match.strSport }}</q-item-label>
                        <q-item-label caption lines="1">
                          {{ match.strLeague }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-2">
                        <img
                          :src="require(`@/assets/${match.strSport}.png`)"
                          alt
                          class="icon"
                          style="height: 20px; max-width: 20px"
                        />
                      </q-item-section>
                      <q-item-section>
                        {{ match.strHomeTeam }}-{{ match.strAwayTeam }}
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label>{{
                          match.strTime || currentDate
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
          <h2 class="q-pt-md text-blue-7 text-uppercase text-h4">
            Live section
          </h2>
          <div-filters class="row" style="gap: 10px; justify-content: center">
            <q-select
              class="col-auto"
              clearable
              rounded
              outlined
              v-model="modelSport"
              label="Select sport"
              :options="filteredSports"
              style="width: 30%"
              bg-color="grey-4"
              label-color="blue"
              @update:model-value="onSportChange()"
            >
            </q-select>
            <q-select
              class="col-auto"
              clearable
              rounded
              outlined
              v-model="modelLeague"
              label="Select league"
              :options="filteredLeagues"
              style="width: 30%"
              bg-color="grey-4"
              label-color="blue"
              @update:model-value="onLeagueChange()"
            >
            </q-select>
          </div-filters>
          <q-card class="bg-grey-4">
            <q-tab-panels v-model="tabCourses" animated class="bg-grey-3">
              <q-tab-panel name="courses">
                <div class="q-pa-md" style="max-width: 850px">
                  <div class="q-pa-md" style="max-width: 300px">
                    <q-input
                      filled
                      v-model="date"
                      mask="####-##-##"
                      :rules="['date']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date mask="YYYY-MM-DD" v-model="date">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                  @click="getDateEvents()"
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <q-list>
                    <q-item v-for="match in liveMatches" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label> {{ match.strSport }} </q-item-label>
                        <q-item-label caption lines="1"
                          >{{ match.strLeague }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section class="col-2">
                        <img
                          :src="require(`@/assets/${match.strSport}.png`)"
                          alt
                          class="icon"
                          style="height: 20px; max-width: 20px"
                        />
                      </q-item-section>
                      <q-item-section>
                        {{ match.strEvent }}
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{ match.strTime }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import MainPageHeader from '@/components/MainPageHeader'

export default {
  name: "home",
  components: { MainPageHeader },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      date: ref(this.currentDate()),
      sport: ref(null),
      model: ref(null),
      modelSport: ref(null),
      modelLeague: ref(null),
      leagues: [],
      sports: [],
      lastMatches: [],
      lastMatches2: [],
      nextMatches: [],
      nextMatches2: [],
      liveMatches: [],
      filteredSports: [],
      filteredLeagues: [],
      tab: ref("finished"),
      tab1: ref("allleagues"),
      tabCourses: ref("courses"),
      sportPage: 1,
      currentSportPage: 1,
      totalSportPages: 8,
      nextSportPage: null,
      page: 1,
      currentPage: 1,
      nextPage: null,
      totalPages: 12,
    };
  },
  methods: {
    onSportChange() {
      if (this.modelSport !== null) this.getSportDateEvents();
      else this.getDateEvents();
    },
    onLeagueChange() {
      if (this.modelLeague !== null) this.getLeagueDateEvents();
      else this.getDateEvents();
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`;
      return date;
    },
    getDateEvents() {
      return axios
        .get(`https://localhost:5001/api/SportDB/matches/${this.date}`)
        .then((response) => (this.liveMatches = response.data));
    },
    getSportDateEvents() {
      return axios
        .get(
          `https://localhost:5001/api/SportDB/matches/${this.date}?s=${this.modelSport}`
        )
        .then((response) => (this.liveMatches = response.data));
    },
    getLeagueDateEvents() {
      return axios
        .get(
          `https://localhost:5001/api/SportDB/matches/${this.date}?l=${this.modelLeague}`
        )
        .then((response) => (this.liveMatches = response.data));
    },
    getFilteredSports() {
      return axios
        .get(`https://localhost:5001/api/SportDB/matches/${this.date}`)
        .then((response) => (this.filteredSports = response.data));
    },
  },
  computed: {
    getLeagueData() {
      return this.leagues.slice(
        (this.page - 1) * this.totalPages,
        (this.page - 1) * this.totalPages + this.totalPages
      );
    },
    getSportData() {
      return this.sports.slice(
        (this.sportPage - 1) * this.totalSportPages,
        (this.sportPage - 1) * this.totalSportPages + this.totalSportPages
      );
    },
  },
  mounted() {
    axios
      .get("https://localhost:5001/api/SportDB/leagues")
      .then((response) => (this.leagues = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios.get("https://localhost:5001/api/SportDB/leagues").then((response) => {
      response.data.forEach((element) => {
        this.filteredLeagues.push(element.strLeague);
      });
    });
    axios
      .get("https://localhost:5001/api/SportDB/sports")
      .then((response) => (this.sports = response.data));
    axios.get("https://localhost:5001/api/SportDB/sports").then((response) => {
      response.data.forEach((element) => {
        this.filteredSports.push(element.strSport);
      });
    });
    axios
      .get("https://localhost:5001/api/SportDB/matches/lastbyteam/133901")
      .then((response) => (this.lastMatches = response.data));
    axios
      .get("https://localhost:5001/api/SportDB/matches/lastbyteam/134880")
      .then((response) => (this.lastMatches2 = response.data));
    axios
      .get("https://localhost:5001/api/SportDB/matches/nextbyteam/133901")
      .then((response) => (this.nextMatches = response.data));
    axios
      .get("https://localhost:5001/api/SportDB/matches/nextbyteam/133739")
      .then((response) => (this.nextMatches2 = response.data));
    axios
      .get(`https://localhost:5001/api/SportDB/matches/${this.date}`)
      .then((response) => (this.liveMatches = response.data));
  },
};
</script>

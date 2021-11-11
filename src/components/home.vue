<template>
  <q-layout view="hHh lpR fFf">
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
      <div
        class="q-pa-md row"
        style="max-width: 850px; float: right; display: flex"
      >
        <div>
          <q-expansion-item
            expand-separator
            icon="plus"
            label="All leagues"
            header-class="text-white"
            class="bg-blue"
          >
            <q-item
              clickable
              v-ripple
              v-for="league in leagues"
              :key="league.strLeague"
            >
              <q-item-section>
                <q-item-label>{{ league.strLeague }}</q-item-label>
                <q-item-label caption>{{ league.strSport }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </div>

        <div>
          <q-expansion-item
            expand-separator
            icon="all"
            label="All sports"
            header-class="text-white"
            class="bg-blue"
          >
            <q-item
              clickable
              v-ripple
              v-for="sport in sports"
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
              <q-item-section class="text-white">
                {{ sport.strSport }}
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </div>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 850px">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
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
              <q-tab name="courses" icon="live_tv" label="Courses" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="finished">
                <div class="q-pa-md" style="max-width: 8500px">
                  <q-list class="bg-white">
                    <q-item v-for="match in lastMatches" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label>{{ match.strLeague }}</q-item-label>
                        <q-item-label caption lines="2">
                          {{ match.strEvent }} | {{ match.intHomeScore }}-{{
                            match.intAwayScore
                          }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{ match.strTime }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator spaced inset />
                  </q-list>
                </div>
              </q-tab-panel>

              <q-tab-panel name="upcoming">
                <div class="q-pa-md" style="max-width: 850px">
                  <q-list class="bg-white">
                    <q-item v-for="match in nextMatches" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label>{{ match.strLeague }}</q-item-label>
                        <q-item-label caption lines="2"
                          >{{ match.strEvent }}
                        </q-item-label>
                      </q-item-section>

                      <q-item-section side top>
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{
                          match.strTime || currentDate
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-tab-panel>

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
                  <q-list class="bg-white">
                    <q-item v-for="match in liveMatches" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label>{{ match.strSport }}</q-item-label>
                        <q-item-label caption lines="2"
                          >{{ match.strEvent }}
                        </q-item-label>
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

export default {
  name: "home",
  data() {
    return {
      date: ref(this.currentDate()),
      leagues: [],
      sports: [],
      lastMatches: [],
      nextMatches: [],
      liveMatches: [],
      tab: ref("finished"),
    };
  },
  methods: {
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`;
      return date;
    },
    filteredSports() {
      return this.sports.filter(function (sport) {
        return sport !== "Soccer";
      });
    },
    getDateEvents() {
      return axios
        .get(`https://localhost:5001/api/SportDB/matches/${this.date}`)
        .then((response) => (this.liveMatches = response.data));
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {
    axios
      .get("https://localhost:5001/api/SportDB/leagues")
      .then((response) => (this.leagues = response.data));
    axios
      .get("https://localhost:5001/api/SportDB/sports")
      .then((response) => (this.sports = response.data));
    axios
      .get("https://localhost:5001/api/SportDB/matches/lastbyteam/133901")
      .then((response) => (this.lastMatches = response.data));
    axios
      .get("https://localhost:5001/api/SportDB/matches/nextbyteam/133901")
      .then((response) => (this.nextMatches = response.data));
    axios
      .get(`https://localhost:5001/api/SportDB/matches/${this.date}`)
      .then((response) => (this.liveMatches = response.data));
  },
};
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <MainPageHeader />
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
        <div class="q-gutter-y-md" style="max-width: 320px; float: right">
          <q-card class="coupon shadow-2 rounded-borders">
            <q-tab-panel class="bg-grey-9 text-blue-7">
              <q-item class="q-mb-md" v-ripple>
                <q-item-section style="color: #bbdefb">COUPON</q-item-section>
              </q-item>
              <q-item v-ripple class="bg-grey-8 q-mb-sm">
                <q-item-section class="text-blue-6"
                  >Poland-Andorra</q-item-section
                >
                <q-item-section side class="text-blue-6">1.45</q-item-section>
                <q-item-section side>
                  <q-icon name="delete" class="text-blue-6" />
                </q-item-section>
              </q-item>
              <q-item v-ripple class="bg-grey-8">
                <q-item-section class="text-blue-6">X-Y</q-item-section>
                <q-item-section side class="text-blue-6">2.30</q-item-section>
                <q-item-section side>
                  <q-icon name="delete" class="text-blue-6" />
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>To pay:</q-item-label>
                  <q-item-label>5$</q-item-label>
                </q-item-section>
                <q-item-section style="text-align: right">
                  <q-item-label overline>Course:</q-item-label>
                  <q-item-label>3.34</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-ripple>
                <q-item-section
                  ><q-btn color="primary" label="PLAY" />
                </q-item-section>
              </q-item>
            </q-tab-panel>
          </q-card>
        </div>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 850px; margin: 0 auto">
          <p class="text-blue-7 text-uppercase text-h4">Favourites section</p>
          <q-card class="bg-grey-14">
            <q-tabs
              v-model="tab"
              dense
              class="bg-grey-9 text-blue-7"
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

            <q-tab-panels
              v-model="tab"
              animated
              class="bg-grey-9 text-blue-7"
              style="color: #b383fc"
            >
              <q-tab-panel name="finished">
                <div class="q-pa-md" style="max-width: 850px; padding: 10px">
                  <q-list>
                    <q-item
                      clickable
                      v-for="match in lastMatches"
                      :key="match.idEvent"
                      @click="eventCard = true"
                    >
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
                      <q-item-section style="color: #c3ddf4">
                        {{ match.intHomeScore }}-{{ match.intAwayScore }}
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{
                          formatPrice(match.strTime)
                        }}</q-item-label>
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
                      <q-item-section style="color: #c3ddf4">
                        {{ match.intHomeScore }}-{{ match.intAwayScore }}
                      </q-item-section>
                      <q-item-section side top>
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{
                          formatPrice(match.strTime)
                        }}</q-item-label>
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
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{
                          formatPrice(match.strTime)
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
                        <q-item-label caption>{{
                          match.dateEvent
                        }}</q-item-label>
                        <q-item-label>{{
                          formatPrice(match.strTime)
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
              bg-color="grey-8"
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
              bg-color="grey-8"
              label-color="blue"
              @update:model-value="onLeagueChange()"
            >
            </q-select>
          </div-filters>
          <q-card class="bg-grey-9 text-blue-7">
            <q-tab-panels
              v-model="tabCourses"
              animated
              class="bg-grey-9 text-blue-7"
            >
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
                    <q-scroll-area style="height: 300px">
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
                          <q-item-label>{{
                            formatPrice(match.strTime)
                          }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-scroll-area>
                  </q-list>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>

      <q-dialog v-model="eventCard">
        <div class="q-pa-md" style="max-width: 600px">
          <q-card>
            <q-tabs
              v-model="matchTab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
            >
              <q-tab name="match" label="Match" />
              <q-tab name="h2h" label="H2H" />
              <q-tab name="table" label="Table" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="matchTab" animated>
              <q-tab-panel name="match" class="q-pa-none">
                <q-splitter v-model="splitterModel" style="height: 250px">
                  <template v-slot:before>
                    <q-tabs
                      v-model="matchDetailsTab"
                      vertical
                      class="text-teal"
                    >
                      <q-tab name="squad" label="Squads" />
                      <q-tab name="details" label="Details" />
                    </q-tabs>
                  </template>

                  <template v-slot:after>
                    <q-tab-panels
                      v-model="matchDetailsTab"
                      animated
                      transition-prev="slide-down"
                      transition-next="slide-up"
                    >
                      <q-tab-panel name="squad">
                        <div class="text-h4 q-mb-md">Squads</div>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </p>
                      </q-tab-panel>

                      <q-tab-panel name="details">
                        <div class="text-h4 q-mb-md">Details</div>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit.
                        </p>
                      </q-tab-panel>
                    </q-tab-panels>
                  </template>
                </q-splitter>
              </q-tab-panel>

              <q-tab-panel name="h2h">
                <div class="text-h6">H2H</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="table">
                <q-table
                  style="height: 400px"
                  title="Table"
                  :rows="rows"
                  :columns="columns"
                  row-key="name"
                  hide-bottom
                  virtual-scroll
                  v-model:pagination="pagination"
                  :rows-per-page-options="[0]"
                />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import MainPageHeader from "@/components/MainPageHeader";

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
      pagination: ref({
        rowsPerPage: 0,
      }),
      date: ref(this.currentDate()),
      sport: ref(null),
      model: ref(null),
      modelSport: ref(null),
      modelLeague: ref(null),
      eventCard: false,
      matchTab: ref("match"),
      matchDetailsTab: ref("squad"),
      splitterModel: ref(20),
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
      tabCourses: ref("courses"),
      columns,
      rows,
    };
  },
  methods: {
    formatPrice(value) {
      return value.slice(0, 5);
    },
    test() {
      console.log("test");
    },
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

const columns = [
  {
    name: "standing",
    required: true,
    field: (row) => row.standing,
    sortable: true,
  },
  { name: "team", label: "Team", field: "team", sortable: true },
  { name: "played", label: "P", field: "played" },
  { name: "win", label: "W", field: "win" },
  { name: "lost", label: "L", field: "lost" },
  { name: "draws", label: "D", field: "draws" },
  { name: "goalsIn", label: "In", field: "goalsIn" },
  { name: "goalsOut", label: "Out", field: "goalsOut" },
  {
    name: "goalsDifference",
    label: "GD",
    field: "goalsDifference",
  },
  { name: "points", label: "P", field: "points" },
];

const rows = [
  {
    standing: 1,
    team: "Man City",
    played: 38,
    win: 27,
    lost: 6,
    draws: 5,
    goalsIn: 83,
    goalsOut: 32,
    goalsDifference: 51,
    points: 86,
  },
  {
    standing: 2,
    team: "Man United",
    played: 38,
    win: 21,
    lost: 6,
    draws: 9,
    goalsIn: 73,
    goalsOut: 44,
    goalsDifference: 29,
    points: 74,
  },
  {
    standing: 3,
    team: "Liverpool",
    played: 38,
    win: 20,
    lost: 9,
    draws: 9,
    goalsIn: 68,
    goalsOut: 42,
    goalsDifference: 26,
    points: 69,
  },
  {
    standing: 4,
    team: "Chelsea",
    played: 38,
    win: 19,
    lost: 9,
    draws: 9,
    goalsIn: 58,
    goalsOut: 36,
    goalsDifference: 22,
    points: 67,
  },
  {
    standing: 5,
    team: "Chelsea",
    played: 38,
    win: 19,
    lost: 9,
    draws: 9,
    goalsIn: 58,
    goalsOut: 36,
    goalsDifference: 22,
    points: 67,
  },
  {
    standing: 6,
    team: "x",
    played: 38,
    win: 19,
    lost: 9,
    draws: 9,
    goalsIn: 58,
    goalsOut: 36,
    goalsDifference: 22,
    points: 67,
  },
  {
    standing: 7,
    team: "y",
    played: 38,
    win: 19,
    lost: 9,
    draws: 9,
    goalsIn: 58,
    goalsOut: 36,
    goalsDifference: 22,
    points: 67,
  },
  {
    standing: 8,
    team: "z",
    played: 38,
    win: 19,
    lost: 9,
    draws: 9,
    goalsIn: 58,
    goalsOut: 36,
    goalsDifference: 22,
    points: 67,
  },
  {
    standing: 9,
    team: "y",
    played: 38,
    win: 19,
    lost: 9,
    draws: 9,
    goalsIn: 58,
    goalsOut: 36,
    goalsDifference: 22,
    points: 67,
  },
  {
    standing: 10,
    team: "y",
    played: 38,
    win: 19,
    lost: 9,
    draws: 9,
    goalsIn: 58,
    goalsOut: 36,
    goalsDifference: 22,
    points: 67,
  },
];
</script>

<style scoped>
.q-item__label--caption,
.q-item__label {
  color: #1e88e5;
}
.coupon {
  border: 1px solid #bbdefb;
}
.q-field--filled .q-field__control {
  background: #616161;
}
</style>

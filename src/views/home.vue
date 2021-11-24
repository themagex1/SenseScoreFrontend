<template>
  <q-layout view="hHh lpR fFf">
    <MainPageHeader />
    <HomePageDrawer />
    <q-page-container>
      <RoutingTabs />
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 320px; float: right">
          <q-card class="coupon shadow-2 rounded-borders">
            <q-tab-panel class="bg-grey-9 text-blue-7">
              <q-item class="q-mb-md" v-ripple>
                <q-item-section style="color: #bbdefb">COUPON</q-item-section>
              </q-item>
              <div v-if="!coupon.length">Coupon is empty</div>
              <div v-else>
                <q-item
                  v-for="c in coupon"
                  :key="c.id"
                  v-ripple
                  class="bg-grey-8 q-mb-sm"
                >
                  <q-item-section class="text-blue-6"
                    >{{ c.p1 }}-{{ c.p2 }}</q-item-section
                  >
                  <q-item-section side class="text-blue-6"
                    >{{ c.course1 }} {{ c.course2 }}</q-item-section
                  >
                  <q-item-section side>
                    <q-icon name="delete" class="text-blue-6" />
                  </q-item-section>
                </q-item>
              </div>
              <q-separator />
              <q-item v-ripple>
                <q-item-section>
                  <q-item-label overline>To pay:</q-item-label>
                  <q-item-label>5$</q-item-label>
                </q-item-section>
                <q-item-section style="text-align: right">
                  <q-item-label overline>Course:</q-item-label>
                  <q-item-label>{{ countCourses() }}</q-item-label>
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
                <section v-if="errored">
                  <p>
                    We're sorry, we're not able to retrieve this information at
                    the moment, please try back later
                  </p>
                </section>

                <section v-else>
                  <div v-if="loading">Loading...</div>
                  <div class="q-pa-md" style="max-width: 850px; padding: 10px">
                    <q-list>
                      <q-item
                        clickable
                        v-for="match in lastMatches"
                        :key="match.idEvent"
                        @click="
                          (eventCard = true),
                            test(
                              match.idEvent,
                              match.idHomeTeam,
                              match.idAwayTeam
                            )
                        "
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
                      <q-item
                        v-for="match in lastMatches2"
                        :key="match.idEvent"
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
                    </q-list>
                  </div>
                </section>
              </q-tab-panel>

              <q-tab-panel name="upcoming">
                <section v-if="errored">
                  <p>
                    We're sorry, we're not able to retrieve this information at
                    the moment, please try back later
                  </p>
                </section>
                <section v-else>
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
                      <q-item
                        v-for="match in nextMatches2"
                        :key="match.idEvent"
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
                </section>
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
                  <div
                    class="q-pa-md row"
                    style="max-width: 600px; justify-content: space-between"
                  >
                    <q-input
                      class="auto-column"
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
                    <q-btn
                      color="grey-9"
                      text-color="blue-7"
                      label="Get latest events"
                      @click="getTimeEvents()"
                    />
                  </div>
                  <section v-if="errored">
                    <p>
                      We're sorry, we're not able to retrieve this information
                      at the moment, please try back later
                    </p>
                  </section>
                  <section v-else>
                    <q-list>
                      <q-scroll-area style="height: 300px">
                        <q-item
                          clickable
                          v-for="match in filteredMatches"
                          :key="match.idEvent"
                          @click="
                            (eventCard = true),
                              live(
                                match.idEvent,
                                match.idHomeTeam,
                                match.idAwayTeam,
                                match.idLeague,
                                match.strSeason
                              )
                          "
                        >
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
                          <q-item-section side
                            ><q-btn
                              flat
                              round
                              icon="add"
                              @click="
                                add(match.strHomeTeam, match.strAwayTeam)
                              "
                          /></q-item-section>
                        </q-item>
                      </q-scroll-area>
                    </q-list>
                  </section>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>

      <q-dialog v-model="eventCard">
        <div class="q-pa-md">
          <q-card style="width: 500px">
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
                <q-splitter v-model="splitterModel">
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
                        <div v-if="eventLineups !== null">
                          <q-item
                            v-for="event in eventLineups"
                            :key="event.idEvent"
                          >
                            <q-item-section>{{
                              event.strPlayer
                            }}</q-item-section>
                            <q-item-section>{{ event.strTeam }}</q-item-section>
                            <q-item-section>{{
                              event.strCountry
                            }}</q-item-section>
                          </q-item>
                        </div>
                        <h2 v-else>No squads</h2>
                      </q-tab-panel>

                      <q-tab-panel name="details">
                        <div v-if="eventDetails !== null">
                          <div class="text-h4 q-mb-md">
                            {{ eventDetails[0].strEvent }}
                          </div>
                          <q-item
                            v-for="event in eventDetails"
                            :key="event.idEvent"
                          >
                            <q-item-section>
                              {{ event.strStat }}</q-item-section
                            >
                            <q-item-section>
                              {{ event.intHome }}</q-item-section
                            >
                            <q-item-section>
                              {{ event.intAway }}</q-item-section
                            >
                          </q-item>
                        </div>
                        <h2 v-else>No details</h2>
                      </q-tab-panel>
                    </q-tab-panels>
                  </template>
                </q-splitter>
              </q-tab-panel>

              <q-tab-panel name="h2h">
                <div class="text-h6">H2H</div>
                <q-item v-for="event in eventLast1Matches" :key="event.idEvent">
                  <q-item-section> {{ event.strEvent }}</q-item-section>
                  <q-item-section> {{ event.dateEvent }}</q-item-section>
                  <q-item-section>
                    {{ event.intAwayScore }}-{{
                      event.intHomeScore
                    }}</q-item-section
                  >
                </q-item>
                <q-separator />
                <q-item v-for="event in eventLast2Matches" :key="event.idEvent">
                  <q-item-section> {{ event.strEvent }}</q-item-section>
                  <q-item-section> {{ event.dateEvent }}</q-item-section>
                  <q-item-section>
                    {{ event.intAwayScore }}-{{
                      event.intHomeScore
                    }}</q-item-section
                  >
                </q-item>
              </q-tab-panel>

              <q-tab-panel name="table">
                <div v-if="rowsTable !== null">
                  <q-table
                    style="width: 500px"
                    title="Table"
                    :rows="rowsTable"
                    :columns="columns"
                    row-key="intRank"
                    hide-bottom
                    virtual-scroll
                    :rows-per-page-options="[0]"
                  />
                </div>
                <h2 v-else>No tab details</h2>
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
import HomePageDrawer from "@/components/HomePageDrawer";
import RoutingTabs from "@/components/RoutingTabs";

let url = "https://localhost:5001/api/SportDB/";

export default {
  name: "home",
  components: { MainPageHeader, HomePageDrawer, RoutingTabs },
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
      loading: true,
      errored: false,
      rowsTable: [],
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
      eventDetails: [],
      eventLineups: [],
      eventLast1Matches: [],
      eventLast2Matches: [],
      lastMatches: [],
      lastMatches2: [],
      nextMatches: [],
      nextMatches2: [],
      liveMatches: [],
      filteredMatches: [],
      filteredSports: [],
      filteredLeagues: [],
      tab: ref("finished"),
      tabCourses: ref("courses"),
      columns,
      coupon: [
        {
          id: 1,
          p1: "Poland",
          p2: "Andora",
          course1: 1.5,
          course2: 2,
        },
      ],
    };
  },
  methods: {
    countCourses() {
      let couponCourse = 1.0;
      for (let i in this.coupon) {
        couponCourse *= this.coupon[i].course1;
      }
      return couponCourse.toFixed(2);
    },
    add(team1, team2) {
      this.coupon.push({
        p1: team1,
        p2: team2,
        course1: 1.3,
        course2: 3.1,
      });
    },
    live(id, team1Id, team2Id, idLeague, strSeason) {
      const requestOne = axios.get(url + `matches/lastbyteam/${team1Id}`);
      const requestTwo = axios.get(url + `matchstats/${id}`);
      const requestThree = axios.get(url + `matchlineup/${id}`);
      const requestFour = axios.get(url + `table/${idLeague}/${strSeason}`);
      const requestFive = axios.get(url + `matches/lastbyteam/${team2Id}`);
      axios
        .all([requestOne, requestTwo, requestThree, requestFour, requestFive])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0].data;
            const responseTwo = responses[1].data;
            const responseThree = responses[2].data;
            const responseFour = responses[3].data;
            const responseFive = responses[4].data;
            this.eventLast1Matches = responseOne;
            this.eventDetails = responseTwo;
            this.eventLineups = responseThree;
            this.rowsTable = responseFour;
            this.eventLast2Matches = responseFive;
          })
        );
    },
    test(id, homeTeam, awayTeam) {
      axios
        .get(url + `matches/lastbyteam/${homeTeam}`)
        .then((response) => (this.eventLast1Matches = response.data));
      axios
        .get(url + `matchstats/${id}`)
        .then((response) => (this.eventDetails = response.data));
      axios
        .get(url + `matches/lastbyteam/${awayTeam}`)
        .then((response) => (this.eventLast2Matches = response.data));
      axios
        .get(url + `matchlineup/${id}`)
        .then((response) => (this.eventLineups = response.data));
    },
    formatPrice(value) {
      return value.slice(0, 5);
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
        .get(url + `matches/${this.date}`)
        .then((response) => (this.filteredMatches = response.data));
    },
    getTimeEvents() {
      let today = new Date();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let time = hours - 1 + ":" + minutes + ":" + seconds;
      time = time.split(":").join("");
      this.filteredMatches = this.filteredMatches.filter((d) => {
        return d.strTime.split(":").join("") > parseInt(time);
      });
    },
    getSportDateEvents() {
      this.filteredMatches = this.liveMatches.filter(
        (b) => b.strSport === this.modelSport
      );
    },
    getLeagueDateEvents() {
      this.filteredMatches = this.liveMatches.filter(
        (b) => b.strLeague === this.modelLeague
      );
    },
  },
  mounted() {
    axios
      .get(url + "leagues")
      .then((response) => (this.leagues = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios.get(url + "leagues").then((response) => {
      response.data
        .forEach((element) => {
          this.filteredLeagues.push(element.strLeague);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    });
    axios
      .get(url + "sports")
      .then((response) => (this.sports = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios.get(url + "sports").then((response) => {
      response.data
        .forEach((element) => {
          this.filteredSports.push(element.strSport);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    });
    axios
      .get(url + "matches/lastbyteam/133901")
      .then((response) => (this.lastMatches = response.data))
      .finally(() => (this.loading = false));
    axios
      .get(url + "matches/lastbyteam/134880")
      .then((response) => (this.lastMatches2 = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .get(url + `matches/${this.date}`)
      .then((response) => {
        this.liveMatches = response.data;
        this.filteredMatches = this.liveMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};

const columns = [
  {
    name: "intRank",
    required: true,
    field: (row) => row.intRank,
    sortable: true,
  },
  { name: "team", label: "Team", field: "strTeam", sortable: true },
  { name: "played", label: "P", field: "intPlayed" },
  { name: "win", label: "W", field: "intWin" },
  { name: "lost", label: "L", field: "intLoss" },
  { name: "draws", label: "D", field: "intDraw" },
  { name: "goalsIn", label: "In", field: "intGoalsFor" },
  { name: "goalsOut", label: "Out", field: "intGoalsAgainst" },
  {
    name: "goalsDifference",
    label: "GD",
    field: "intGoalDifference",
  },
  { name: "points", label: "P", field: "intPoints" },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Ubuntu&display=swap");
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

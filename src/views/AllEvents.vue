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
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 320px; float: right">
          <q-card class="coupon shadow-2 rounded-borders">
            <q-tab-panel class="bg-grey-9">
              <q-item class="q-mb-md" v-ripple>
                <q-item-section>COUPON</q-item-section>
              </q-item>
              <div v-if="!coupon[0].positions.length">
                <p>Your coupon is empty</p>
                <p>Add a bid from live matches</p>
              </div>
              <div v-else>
                <q-list
                  v-for="coupon in coupon"
                  :key="coupon.id"
                  style="width: 100%"
                >
                  <q-item
                    v-for="position in coupon.positions"
                    :key="position.eventID"
                    style="
                      border: 1px solid #f9f871;
                      border-radius: 5px;
                      padding: 8px 6px;
                      margin-bottom: 8px;
                    "
                  >
                    <q-item-section>
                      <q-item-label>{{ position.homeName }}</q-item-label>
                      <q-item-label caption style="color: #fff !important"
                        >Team1</q-item-label
                      >
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ position.awayName }}</q-item-label>
                      <q-item-label caption style="color: #fff !important"
                        >Team2</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label
                        ><span
                          v-if="position.choice == '0'"
                          style="color: yellow"
                          >T1</span
                        >
                        <span
                          v-if="position.choice == '1'"
                          style="color: yellow"
                          >T2</span
                        >
                        <span
                          v-if="position.choice == '2'"
                          style="color: yellow"
                          >D</span
                        >-<span style="color: #fff !important">{{
                          position.odds
                        }}</span></q-item-label
                      >
                      <q-item-label style="color: #fff !important" caption
                        >Odd</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        style="width: 20px"
                        icon="delete"
                        outline
                        @click="removeEvent(position)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-separator />
                <q-item v-ripple>
                  <q-item-section>
                    <q-item-label overline style="color: #fff !important"
                      >To pay:</q-item-label
                    >
                    <q-item-label
                      ><q-input
                        bg-color="yellow"
                        outlined
                        v-model="text"
                        label="Bet"
                    /></q-item-label>
                  </q-item-section>
                  <q-item-section style="text-align: right">
                    <q-item-label style="color: #fff !important" overline
                      >Course:</q-item-label
                    >
                    <q-item-label>{{ coupon.totalOdds }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section
                    style="color: #fff !important"
                    v-if="text.length"
                  >
                    Potential win: {{ roundDecimal }}
                  </q-item-section>
                  <q-item-section style="color: #fff !important" v-else
                    >Potential win: {{ roundDecimal }}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section
                    ><q-btn
                      style="color: #fff !important"
                      @click="play()"
                      :disabled="testError"
                      label="PLAY"
                    />
                  </q-item-section>
                </q-item>
                <p v-if="success !== 'Success'" style="color: red">
                  {{ success }}
                </p>
                <p v-else>{{ success }}</p>
              </div>
            </q-tab-panel>
          </q-card>
        </div>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 850px; margin: 0 auto">
          <h2 class="q-pt-md text-uppercase text-h4">Day</h2>
          <div-filters class="row" style="gap: 10px; justify-content: center">
            <q-select
              class="col-auto"
              clearable
              rounded
              outlined
              v-model="modelDaySport"
              label="Select sport"
              :options="filteredSports"
              style="width: 30%"
              bg-color="grey-8"
              label-color="yellow"
              @update:model-value="onSportChange()"
            >
            </q-select>
            <q-select
              class="col-auto"
              clearable
              rounded
              outlined
              v-model="modelDayLeague"
              label="Select league"
              :options="filteredLeagues"
              style="width: 30%"
              bg-color="grey-8"
              label-color="yellow"
              @update:model-value="onLeagueChange()"
            >
            </q-select>
            <q-input
              class="auto-column"
              rounded
              outlined
              bg-color="grey-8"
              label-color="yellow"
              v-model="date"
              mask="####-##-##"
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
                          color="primary"
                          v-close-popup
                          label="Ok"
                          flat
                          @click="getDateEvents()"
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div-filters>
          <q-card class="bg-grey-9" style="position:inherit;">
            <q-tab-panels v-model="tabCourses" animated class="bg-grey-9">
              <q-tab-panel name="courses">
                <div class="q-pa-md" style="max-width: 850px">
                  <div
                    class="q-pa-md row"
                    style="max-width: 600px; justify-content: space-between"
                  ></div>

                  <section v-if="loadingDateMatches">
                    <div class="q-pa-md">
                      <q-spinner
                        :loading="loadingDateMatches"
                        color="primary"
                        size="3em"
                        :thickness="2"
                      />
                    </div>
                  </section>

                  <section v-else>
                    <q-scroll-area style="height: 300px">
                      <q-list
                        style="color: #ffffff !important"
                        class="day-section-list"
                        v-for="match in filteredDayMatches"
                        :key="match.idEvent"
                      >
                        <q-item
                          class="day-item"
                          style="color: #ffffff !important"
                          clickable
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
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                              >{{ match.strLeague }}
                            </q-item-label>
                          </q-item-section>
                          <q-item-section class="col-1">
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
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label
                              v-if="match?.strTime"
                              style="color: #ffffff !important"
                              >{{ formatPrice(match.strTime) }}</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                        <q-item-label
                          style="
                            color: #fff !important;
                            padding: 0 16px;
                            font-size: 80%;
                          "
                          header
                          v-if="
                            match?.homeOdds != 0 &&
                            match?.awayOdds != 0 &&
                            match?.drawOdds != 0
                          "
                          >Courses [W1/D/W2]</q-item-label
                        >

                        <q-item
                          class="mb-5"
                          v-if="
                            match?.homeOdds != 0 &&
                            match?.awayOdds != 0 &&
                            match?.drawOdds != 0
                          "
                        >
                          <q-item-section side top>
                            <q-item-label
                              ><q-btn
                                v-on:click.stop
                                @click="
                                  (eventCard = false),
                                    add(
                                      match.idEvent,
                                      match.homeOdds,
                                      match.strHomeTeam,
                                      match.strAwayTeam,
                                      0
                                    )
                                "
                              >
                                {{ match.homeOdds }}</q-btn
                              >
                              <q-btn
                                v-on:click.stop
                                @click="
                                  (eventCard = false),
                                    add(
                                      match.idEvent,
                                      match.drawOdds,
                                      match.strHomeTeam,
                                      match.strAwayTeam,
                                      2
                                    )
                                "
                              >
                                {{ match.drawOdds }}</q-btn
                              >
                              <q-btn
                                v-on:click.stop
                                @click="
                                  (eventCard = false),
                                    add(
                                      match.idEvent,
                                      match.awayOdds,
                                      match.strHomeTeam,
                                      match.strAwayTeam,
                                      1
                                    )
                                "
                              >
                                {{ match.awayOdds }}</q-btn
                              >
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-scroll-area>
                  </section>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
          <p class="text-uppercase text-h4">Live</p>
          <div-filters class="row" style="gap: 10px; justify-content: center">
            <q-select
              class="col-auto"
              clearable
              rounded
              outlined
              v-model="modelLiveSport"
              label="Select sport"
              :options="filteredSports"
              style="width: 30%"
              bg-color="grey-8"
              label-color="yellow"
              @update:model-value="onLiveSportChange()"
            >
            </q-select>
            <q-select
              class="col-auto"
              clearable
              rounded
              outlined
              v-model="modelLiveLeague"
              label="Select league"
              :options="filteredLeagues"
              style="width: 30%"
              bg-color="grey-8"
              label-color="yellow"
              @update:model-value="onLiveLeagueChange()"
            >
            </q-select>
          </div-filters>
          <q-card class="bg-grey-9">
            <q-tab-panels v-model="tabCourses" animated class="bg-grey-9">
              <q-tab-panel name="courses">
                <div class="q-pa-md" style="max-width: 850px">
                  <div
                    class="q-pa-md row"
                    style="max-width: 600px; justify-content: space-between"
                  ></div>

                  <section v-if="loadingLiveMatches">
                    <div class="q-pa-md">
                      <q-spinner
                        :loading="loadingLiveMatches"
                        color="primary"
                        size="3em"
                        :thickness="2"
                      />
                    </div>
                  </section>
                  <section v-else>
                    <q-scroll-area style="height: 300px">
                      <q-list
                        style="color: #ffffff !important"
                        v-for="match in filteredLiveMatches"
                        :key="match.idEvent"
                      >
                        <q-item
                          style="color: #ffffff !important"
                          clickable
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
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                              >{{ match.strLeague }}
                            </q-item-label>
                          </q-item-section>
                          <q-item-section class="col-1">
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
                          <q-item-section>
                            {{ match.intHomeScore }}-{{ match.intAwayScore }}
                          </q-item-section>
                          <q-item-section side top>
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label
                              v-if="match?.strTime"
                              style="color: #ffffff !important"
                              >{{ formatPrice(match.strTime) }}</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-scroll-area>
                  </section>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>

      <q-dialog v-model="eventCard">
        <div class="q-pa-md">
          <q-card>
            <q-tabs
              v-model="matchTab"
              dense
              class="text-grey"
              align="justify"
              style="width: 500px"
            >
              <q-tab name="match" label="Match" />
              <q-tab name="h2h" label="H2H" />
              <q-tab name="table" label="Table" />
            </q-tabs>

            <q-separator />

            <q-tab-panels
              v-model="matchTab"
              animated
              style="width: 500px; height: 800px"
            >
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
                        <div v-if="eventLineups.length">
                          <q-list
                            v-for="event in eventLineups"
                            :key="event.idEvent"
                            style="float: left; width: 170px"
                          >
                            <p
                              style="
                                color: black !important;
                                margin-left: 15px;
                                font-size: 1.5rem;
                              "
                            >
                              {{ event.team }}
                            </p>
                            <q-item
                              style="color: black !important"
                              v-for="player in event.lineup"
                              :key="player.idLineup"
                            >
                              <q-item-section
                                >{{ player.strPlayer }} ({{
                                  player.strPositionShort
                                }})</q-item-section
                              >
                            </q-item>
                          </q-list>
                        </div>
                        <q-card v-else class="my-card">
                          <q-card-section>
                            Sorry, we have no information about squads.
                          </q-card-section>
                        </q-card>
                      </q-tab-panel>

                      <q-tab-panel name="details">
                        <div v-if="eventDetails.length">
                          <div
                            class="text-h5 q-mb-md text-center"
                            style="color: black !important"
                          >
                            {{ eventDetails[0].strEvent }}
                          </div>
                          <q-item
                            style="color: black !important"
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
                        <q-card v-else class="my-card">
                          <q-card-section>
                            Sorry, we have no information about match details.
                          </q-card-section>
                        </q-card>
                      </q-tab-panel>
                    </q-tab-panels>
                  </template>
                </q-splitter>
              </q-tab-panel>

              <q-tab-panel name="h2h">
                <div
                  v-if="eventLast1Matches.length && eventLast2Matches.length"
                >
                  <q-item
                    style="color: black !important"
                    v-for="event in eventLast1Matches"
                    :key="event.idEvent"
                  >
                    <q-item-section> {{ event.strEvent }}</q-item-section>
                    <q-item-section> {{ event.dateEvent }}</q-item-section>
                    <q-item-section>
                      {{ event.intHomeScore }} -
                      {{ event.intAwayScore }}</q-item-section
                    >
                  </q-item>
                  <q-separator />
                  <q-item
                    style="color: black !important"
                    v-for="event in eventLast2Matches"
                    :key="event.idEvent"
                  >
                    <q-item-section> {{ event.strEvent }}</q-item-section>
                    <q-item-section> {{ event.dateEvent }}</q-item-section>
                    <q-item-section>
                      {{ event.intHomeScore }} -
                      {{ event.intAwayScore }}</q-item-section
                    >
                  </q-item>
                </div>
                <q-card v-else class="my-card">
                  <q-card-section>
                    Sorry, we have no information about previous matches.
                  </q-card-section>
                </q-card>
              </q-tab-panel>

              <q-tab-panel name="table">
                <div v-if="rowsTable.length != 0">
                  <q-table
                    title="Table"
                    :rows="rowsTable"
                    :columns="columns"
                    row-key="intRank"
                    hide-bottom
                    virtual-scroll
                    :rows-per-page-options="[0]"
                  />
                </div>
                <q-card v-else class="my-card">
                  <q-card-section>
                    Sorry, we have no information about table.
                  </q-card-section>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </q-dialog>
      <q-dialog v-model="alert" position="top">
        <q-card style="background-color: green">
          <q-card-section>
            <div class="text-h6">Notification</div>
          </q-card-section>

          <q-card-section class="q-pt-none"> Sent coupon </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import axiosR from '../services/api'
import HomePageHeader from "@/components/HomePageHeader";
import HomePageDrawer from "@/components/HomePageDrawer";
import RoutingTabs from "@/components/RoutingTabs";

const bearer = localStorage.getItem("bearer");

let url = "api/SportDB/";

export default {
  name: "allEvents",
  components: { HomePageHeader, HomePageDrawer, RoutingTabs },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      alert: ref("false"),
      testError: false,
      text: ref(""),
      filteredLiveMatches: [],
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      loading: true,
      loadingLiveMatches: true,
      loadingDateMatches: true,
      errored: false,
      success: "",
      rowsTable: [],
      date: ref(this.currentDate()),
      sport: ref(null),
      model: ref(null),
      modelDaySport: ref(null),
      modelDayLeague: ref(null),
      modelSport: ref(null),
      modelLeague: ref(null),
      modelLiveSport: ref(null),
      modelLiveLeague: ref(null),
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
      filteredLastMatches: [],
      nextMatches: [],
      filteredNextMatches: [],
      todayMatches: [],
      liveMatches: [],
      filteredDayMatches: [],
      filteredSports: [],
      filteredLeagues: [],
      tab: ref("finished"),
      tabCourses: ref("courses"),
      columns,
      coupon: [
        {
          bid: 3,
          totalOdds: 2.5,
          positions: [],
        },
      ],
    };
  },
  computed: {
    roundDecimal: function () {
      return (this.countCourses() * this.toInt()).toFixed(2);
    },
  },
  methods: {
    toInt() {
      if (this.text == "") {
        return (this.text = 2);
      }
      return parseInt(this.text);
    },
    play() {
      let self = this;
      this.coupon[0].totalOdds = this.countCourses();
      this.coupon[0].bid = this.toInt();

      axiosR({
        method: "post",
        baseURL: "api/" + "Betting/tickets",
        headers: {
          Authorization: "Bearer " + bearer,
        },
        data: this.coupon[0],
      })
        .then(function (response) {
          console.log(response);
          self.alert = true;
          self.coupon[0].positions = [];
        })
        .catch(function (error) {
          if (error.response) {
            self.success = error.response.data;

            // => the response payload
          }
          console.log(error);
        });
    },
    removeEvent(match) {
      this.coupon[0].positions.splice(
        this.coupon[0].positions.indexOf(match),
        1
      );
    },
    countCourses() {
      let couponCourse = 1.0;
      for (let i in this.coupon) {
        for (let j in this.coupon[i].positions) {
          couponCourse *= this.coupon[i].positions[j].odds;
          this.coupon.totalOdds = couponCourse.toFixed(2);
        }
      }
      return couponCourse.toFixed(2);
    },
    add(eventId, course, home, away, choice) {
      let valid = true;
      for (let i = 0; i < this.coupon[0].positions.length; i++) {
        if (this.coupon[0].positions[i].eventID == eventId) {
          valid = false;
        }
      }

      if (valid)
        this.coupon[0].positions.push({
          eventID: eventId,
          choice: choice,
          odds: course,
          homeName: home,
          awayName: away,
        });
      else {
        for (let i = 0; i < this.coupon[0].positions.length; i++) {
          if (this.coupon[0].positions[i].eventID == eventId) {
            this.coupon[0].positions[i].odds = course;
            this.coupon[0].positions[i].choice = choice;
          }
        }
      }
    },
    live(id, team1Id, team2Id, idLeague, strSeason) {
      const requestOne = axiosR.get(url + `matches/lastbyteam/${team1Id}`);
      const requestTwo = axiosR.get(url + `matchstats/${id}`);
      const requestThree = axiosR.get(url + `matchlineup/${id}`);
      const requestFour = axiosR.get(url + `table/${idLeague}/${strSeason}`);
      const requestFive = axiosR.get(url + `matches/lastbyteam/${team2Id}`);
      axiosR
        .all([requestOne, requestTwo, requestThree, requestFour, requestFive])
        .then(
          axiosR.spread((...responses) => {
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
      axiosR
        .get(url + `matches/lastbyteam/${homeTeam}`)
        .then((response) => (this.eventLast1Matches = response.data));
      axiosR
        .get(url + `matchstats/${id}`)
        .then((response) => (this.eventDetails = response.data));
      axiosR
        .get(url + `matches/lastbyteam/${awayTeam}`)
        .then((response) => (this.eventLast2Matches = response.data));
      axiosR
        .get(url + `matchlineup/${id}`)
        .then((response) => (this.eventLineups = response.data));
    },
    formatPrice(value) {
      return value.slice(0, 5);
    },
    onLiveSportChange() {
      return axiosR
        .get(url + `livematches/`, {
          params: { s: this.modelLiveSport },
        })
        .then((response) => {
          this.filteredLiveMatches = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loadingLiveMatches = false));
    },
    onLiveLeagueChange() {
      if (this.modelLiveLeague != null)
        return axiosR
          .get(url + `livematches/`, {
            params: { s: this.modelLiveSport, l: this.modelLiveLeague.id },
          })
          .then((response) => {
            this.filteredLiveMatches = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loadingLiveMatches = false));
      else
        return axiosR
          .get(url + `livematches/`, {
            params: { s: this.modelLiveSport },
          })
          .then((response) => {
            this.filteredLiveMatches = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loadingLiveMatches = false));
    },
    onSportChange() {
      return axiosR
        .get(url + `matches/${this.date}/`, {
          params: { s: this.modelDaySport },
        })
        .then((response) => {
          this.filteredDayMatches = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loadingDateMatches = false));
    },
    onLeagueChange() {
      if (this.modelDayLeague != null)
        return axiosR
          .get(url + `matches/${this.date}/`, {
            params: { s: this.modelDaySport, l: this.modelDayLeague.value },
          })
          .then((response) => {
            this.filteredDayMatches = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loadingDateMatches = false));
      else
        return axiosR
          .get(url + `matches/${this.date}/`, {
            params: { s: this.modelDaySport },
          })
          .then((response) => {
            this.filteredDayMatches = response.data;
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loadingDateMatches = false));
    },

    currentDate() {
      let dt = new Date();
      let month = ("0" + (dt.getMonth() + 1)).slice(-2);
      let date = ("0" + dt.getDate()).slice(-2);
      let year = dt.getFullYear();
      const fullDate = year + "-" + month + "-" + date;
      return fullDate;
    },
    getDateEvents() {
      return axiosR
        .get(url + `matches/${this.date}/`, {
          params: { s: this.modelDaySport, l: this.modelDayLeague },
        })
        .then((response) => {
          this.filteredDayMatches = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loadingDateMatches = false));
    },
    checkValidEventTime(match) {
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
      let time = hours + ":" + minutes + ":" + seconds;
      time = time.split(":").join("");
      console.log(match);
      if (match.strTime.split(":").join("") > parseInt(time)) return true;
      else return false;
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
      return this.filteredDayMatches.filter((d) => {
        return d.strTime.split(":").join("") > parseInt(time);
      });
    },
    getSportDateEvents() {
      this.filteredDayMatches = this.todayMatches.filter(
        (b) => b.strSport === this.modelDaySport
      );
      return this.filteredDayMatches;
    },
    getLeagueDateEvents() {
      this.filteredDayMatches = this.todayMatches.filter(
        (b) => b.strLeague === this.modelDayLeague
      );
      return this.filteredDayMatches;
    },
  },
  mounted() {
    axiosR
      .get(url + `matchlineup/1154128`)
      .then((response) => {
        this.eventLineups = response.data;
        console.log(this.eventLineups[0].lineup);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.loadingDateMatches = false;
      });
    axiosR
      .get(url + `matches/${this.date}`)
      .then((response) => {
        this.todayMatches = response.data;
        this.filteredDayMatches = this.todayMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loadingDateMatches = false));
    axiosR
      .get(url + "livematches")
      .then((response) => {
        this.liveMatches = response.data;
        this.filteredLiveMatches = this.liveMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loadingLiveMatches = false));
    axiosR
      .get(url + "leagues")
      .then((response) => (this.leagues = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axiosR.get(url + "leagues").then((response) => {
      response.data.forEach((element) => {
        this.filteredLeagues.push({
          label: element.strLeague,
          value: element.strLeague,
          id: element.idLeague,
        });
      });
    });
    axiosR
      .get(url + "sports")
      .then((response) => (this.sports = response.data))
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axiosR.get(url + "sports").then((response) => {
      response.data.forEach((element) => {
        this.filteredSports.push(element.strSport);
      });
    });
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
.q-tab-panel,
.q-tabs,
.q-tabs-panels,
p,
h2,
.q-btn {
  color: #f9f871;
}

.my-card {
  color: black;
}

.coupon {
  background-color: #757575;
  color: #f9f871 !important;
  border-radius: 4px;
  border: 1px solid #ffffff;
}

.mb-5 {
  margin-bottom: 5px !important;
  border-bottom: 1px solid #616161;
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

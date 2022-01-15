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
                  class="q-ma-sm"
                  v-for="coupon in coupon"
                  :key="coupon.id"
                  style="width: 95%"
                >
                  <q-item
                    class="q-ma-sm"
                    v-for="position in coupon.positions"
                    :key="position.eventID"
                    style="border: 1px solid #f9f871; border-radius: 5px"
                  >
                    <q-item-section>
                      <q-item-label>{{ position.homeName }}</q-item-label>
                      <q-item-label style="color: #fff !important" caption
                        >Team1</q-item-label
                      >
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ position.awayName }}</q-item-label>
                      <q-item-label style="color: #fff !important" caption
                        >Team2</q-item-label
                      >
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label>{{ position.odds }}</q-item-label>
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
                    <q-item-label overline>To pay:</q-item-label>
                    <q-item-label
                      ><q-input
                        bg-color="yellow"
                        outlined
                        v-model="text"
                        label="Bet"
                    /></q-item-label>
                  </q-item-section>
                  <q-item-section style="text-align: right">
                    <q-item-label overline>Course:</q-item-label>
                    <q-item-label>{{ countCourses() }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section v-if="text.length">
                    Potential win: {{ roundDecimal }}
                  </q-item-section>
                  <q-item-section v-else
                    >Potential win: {{ roundDecimal }}
                  </q-item-section>
                </q-item>
                <q-item v-ripple>
                  <q-item-section
                    ><q-btn @click="play()" label="PLAY" />
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
          <p class="text-uppercase text-h4">Favourites section</p>
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
              label-color="yellow"
              @update:model-value="onFavSportChange()"
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
              label-color="yellow"
              @update:model-value="onFavLeagueChange()"
            >
            </q-select>
          </div-filters>
          <q-card class="bg-grey-14">
            <q-tabs
              v-model="tab"
              dense
              class="bg-grey-9"
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

            <q-tab-panels v-model="tab" animated class="bg-grey-9">
              <q-tab-panel name="finished">
                <section v-if="errored">
                  <p>
                    We're sorry, we're not able to retrieve this information at
                    the moment, please try back later
                  </p>
                </section>

                <section v-else>
                  <section
                    v-if="
                      loadingLastMatches &&
                      loadingLastLeagueMatches &&
                      loadingLastAthleteMatches
                    "
                  >
                    <div class="q-pa-md">
                      <q-spinner
                        :loading="
                          loadingDateMatches &&
                          loadingLastLeagueMatches &&
                          loadingLastAthleteMatches
                        "
                        color="primary"
                        size="3em"
                        :thickness="2"
                      />
                    </div>
                  </section>
                  <div class="q-pa-md" style="max-width: 850px; padding: 10px">
                    <q-scroll-area style="height: 300px">
                      <div
                        v-if="!filteredLastMatches.length"
                        style="text-align: center"
                      >
                        No history of last matches. Choose different filter.
                      </div>
                      <q-list style="color: #ffffff !important">
                        <div class="q-pa-md text-yellow text-uppercase">
                          Teams
                        </div>
                        <q-item
                          style="color: #ffffff !important"
                          clickable
                          v-for="match in filteredLastMatches"
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
                            <q-item-label> {{ match.strSport }}</q-item-label>
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                            >
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
                          <q-item-section>
                            {{ match.intHomeScore }}-{{ match.intAwayScore }}
                          </q-item-section>
                          <q-item-section side top>
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label style="color: #ffffff !important">{{
                              formatPrice(match.strTime)
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-separator spaced inset />
                        <div class="q-pa-md text-yellow text-uppercase">
                          Athletes
                        </div>
                        <q-item
                          style="color: #ffffff !important"
                          v-for="match in filteredLastAthleteMatches"
                          :key="match.idEvent"
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
                            <q-item-label> {{ match.strSport }}</q-item-label>
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                            >
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
                          <q-item-section>
                            {{ match.intHomeScore }}-{{ match.intAwayScore }}
                          </q-item-section>
                          <q-item-section side top>
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label style="color: #ffffff !important">{{
                              formatPrice(match.strTime)
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-separator spaced inset />
                        <div class="q-pa-md text-yellow text-uppercase">
                          Leagues
                        </div>
                        <q-item
                          style="color: #ffffff !important"
                          v-for="match in filteredLastLeagueMatches"
                          :key="match.idEvent"
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
                            <q-item-label> {{ match.strSport }}</q-item-label>
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                            >
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
                          <q-item-section>
                            {{ match.intHomeScore }}-{{ match.intAwayScore }}
                          </q-item-section>
                          <q-item-section side top>
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label style="color: #ffffff !important">{{
                              formatPrice(match.strTime)
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-scroll-area>
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
                    <q-scroll-area style="height: 300px">
                      <div
                        v-if="
                          !filteredNextMatches.length &&
                          !filteredNextLeagueMatches.length &&
                          !filteredNextAthleteMatches.length
                        "
                        style="text-align: center"
                      >
                        No data of upcoming matches. Choose different filter.
                      </div>
                      <q-list style="color: #ffffff !important">
                        <div class="q-pa-md text-yellow text-uppercase">
                          Teams
                        </div>
                        <q-item
                          v-for="match in filteredNextMatches"
                          :key="match.idEvent"
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
                            <q-item-label> {{ match.strSport }}</q-item-label>
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                            >
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
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label style="color: #ffffff !important">{{
                              formatPrice(match.strTime)
                            }}</q-item-label>
                          </q-item-section>
                          <q-item-section
                            v-if="
                              match?.homeOdds != 0 &&
                              match?.awayOdds != 0 &&
                              match?.drawOdds != 0 //&&
                              //checkValidEventTime(match)
                            "
                            side
                            top
                          >
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >Courses [W1/D/W2]</q-item-label
                            >
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
                        <q-separator spaced inset />
                        <div class="q-pa-md text-yellow text-uppercase">
                          Athletes
                        </div>
                        <q-item
                          v-for="match in filteredNextAthleteMatches"
                          :key="match.idEvent"
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
                            <q-item-label> {{ match.strSport }}</q-item-label>
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                            >
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
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label style="color: #ffffff !important">{{
                              formatPrice(match.strTime)
                            }}</q-item-label>
                          </q-item-section>
                          <q-item-section
                            v-if="
                              match?.homeOdds != 0 &&
                              match?.awayOdds != 0 &&
                              match?.drawOdds != 0
                            "
                            side
                            top
                          >
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >Courses [W1/D/W2]</q-item-label
                            >
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
                        <div class="q-pa-md text-yellow text-uppercase">
                          Leagues
                        </div>
                        <q-item
                          v-for="match in filteredNextLeagueMatches"
                          :key="match.idEvent"
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
                            <q-item-label> {{ match.strSport }}</q-item-label>
                            <q-item-label
                              caption
                              lines="1"
                              style="color: #ffffff !important"
                            >
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
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >{{ match.dateEvent }}</q-item-label
                            >
                            <q-item-label style="color: #ffffff !important">{{
                              formatPrice(match.strTime)
                            }}</q-item-label>
                          </q-item-section>
                          <q-item-section
                            v-if="
                              match?.homeOdds != 0 &&
                              match?.awayOdds != 0 &&
                              match?.drawOdds != 0
                            "
                            side
                            top
                          >
                            <q-item-label
                              caption
                              style="color: #ffffff !important"
                              >Courses [W1/D/W2]</q-item-label
                            >
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
                  </div>
                </section>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
          <h2 class="q-pt-md text-uppercase text-h4">Live section</h2>
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
              @update:model-value="onSportChange()"
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
              @update:model-value="onLeagueChange()"
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
                  <section
                    v-if="loadingLiveMatches && loadingLiveLeagueMatches"
                  >
                    <q-spinner
                      :loading="loadingLiveMatches && loadingLiveLeagueMatches"
                      color="primary"
                      size="3em"
                      :thickness="2"
                    />
                  </section>
                  <section v-else>
                    <q-scroll-area style="height: 300px">
                      <div
                        v-if="
                          !filteredLiveMatches.length &&
                          !filteredLiveLeagueMatches.length
                        "
                      >
                        There are no live info about your favourites. Go to all
                        section or add favourites.
                      </div>
                      <div class="q-pa-md text-yellow text-uppercase">
                        Teams
                      </div>
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
                          <q-item-section style="color: #ffffff">
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
                      <q-separator spaced inset />
                      <div class="q-pa-md text-yellow text-uppercase">
                        Leagues
                      </div>
                      <q-list
                        style="color: #ffffff !important"
                        v-for="match in filteredLiveLeagueMatches"
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
                        <div v-if="eventLineups !== null">
                          <q-item
                            style="color: black !important"
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
                        <q-card v-else class="my-card">
                          <q-card-section>
                            Sorry, we have no information about squads.
                          </q-card-section>
                        </q-card>
                      </q-tab-panel>

                      <q-tab-panel name="details">
                        <div v-if="eventDetails !== null">
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
                  v-if="
                    eventLast1Matches !== null && eventLast2Matches !== null
                  "
                >
                  <q-item
                    style="color: black !important"
                    v-for="event in eventLast1Matches"
                    :key="event.idEvent"
                  >
                    <q-item-section> {{ event.strEvent }}</q-item-section>
                    <q-item-section> {{ event.dateEvent }}</q-item-section>
                    <q-item-section>
                      {{ event.intAwayScore }}-{{
                        event.intHomeScore
                      }}</q-item-section
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
                      {{ event.intAwayScore }}-{{
                        event.intHomeScore
                      }}</q-item-section
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
                <div v-if="rowsTable !== null">
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
import axios from "axios";
import HomePageHeader from "@/components/HomePageHeader";
import HomePageDrawer from "@/components/HomePageDrawer";
import RoutingTabs from "@/components/RoutingTabs";

const bearer = localStorage.getItem("bearer");

let url = "api/sportdb/";

export default {
  name: "home",
  components: { HomePageHeader, HomePageDrawer, RoutingTabs },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      alert: ref("false"),
      text: ref(""),
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
      loadingLiveLeagueMatches: true,
      loadingLastMatches: true,
      loadingLastAthleteMatches: true,
      loadingLastLeagueMatches: true,
      errored: false,
      success: "",
      rowsTable: [],
      date: ref(this.currentDate()),
      sport: ref(null),
      model: ref(null),
      modelSport: ref(null),
      modelLeague: ref(null),
      modelLiveSport: ref(null),
      modelLiveLeague: ref(null),
      eventCard: false,
      matchTab: ref("match"),
      matchDetailsTab: ref("squad"),
      splitterModel: ref(20),
      filteredFavLeagues: [],
      liveLeagueMatches: [],
      filteredFavSports: [],
      leagues: [],
      sports: [],
      eventDetails: [],
      eventLineups: [],
      eventLast1Matches: [],
      eventLast2Matches: [],
      lastMatches: [],
      filteredLastMatches: [],
      lastLeagueMatches: [],
      lastAthleteMatches: [],
      filteredLastLeagueMatches: [],
      filteredLastAthleteMatches: [],
      nextLeagueMatches: [],
      nextMatches: [],
      nextAthleteMatches: [],
      filteredNextMatches: [],
      todayMatches: [],
      liveMatches: [],
      filteredLiveMatches: [],
      filteredLiveLeagueMatches: [],
      filteredMatches: [],
      filteredSports: [],
      filteredLeagues: [],
      filteredNextLeagueMatches: [],
      filteredNextAthleteMatches: [],
      tab: ref("finished"),
      tabCourses: ref("courses"),
      columns,
      favTeams: [],
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
        return (this.text = 5);
      }
      return parseInt(this.text);
    },
    play() {
      let self = this;
      this.coupon[0].totalOdds = this.countCourses();
      this.coupon[0].bid = this.toInt();

      axios({
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
          this.coupon.totalOdds = couponCourse;
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
          }
        }
      }
      console.log(this.coupon[0]);
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
    formatPrice(value) {
      return value.slice(0, 5);
    },
    onFavSportChange() {
      if (this.modelSport == null) {
        this.filteredLastMatches = this.lastMatches;
        this.filteredLastLeagueMatches = this.lastLeagueMatches;
        this.filteredLastAthleteMatches = this.lastAthleteMatches;
        this.filteredNextMatches = this.nextMatches;
        this.filteredNextLeagueMatches = this.nextLeagueMatches;
        this.filteredNextAthleteMatches = this.nextAthleteMatches;
      } else {
        this.filteredLastMatches = this.lastMatches.filter((value) => {
          return value.strSport == this.modelSport;
        });
        this.filteredLastAthleteMatches = this.lastAthleteMatches.filter(
          (value) => {
            return value.strSport == this.modelSport;
          }
        );
        this.filteredLastLeagueMatches = this.lastLeagueMatches.filter(
          (value) => {
            return value.strSport == this.modelSport;
          }
        );
        this.filteredNextMatches = this.nextMatches.filter((value) => {
          return value.strSport == this.modelSport;
        });
        this.filteredNextAthleteMatches = this.nextAthleteMatches.filter(
          (value) => {
            return value.strSport == this.modelSport;
          }
        );
        this.filteredNextLeagueMatches = this.nextLeagueMatches.filter(
          (value) => {
            return value.strSport == this.modelSport;
          }
        );
      }
    },
    onFavLeagueChange() {
      if (this.modelSport != null) {
        this.filteredLastMatches = this.filteredLastMatches.filter((value) => {
          return (
            value.strLeague == this.modelLeague &&
            value.strSport == this.modelSport
          );
        });
        this.filteredLastLeagueMatches = this.filteredLastLeagueMatches.filter(
          (value) => {
            return (
              value.strLeague == this.modelLeague &&
              value.strSport == this.modelSport
            );
          }
        );
        this.filteredLastAthleteMatches =
          this.filteredLastAthleteMatches.filter((value) => {
            return (
              value.strLeague == this.modelLeague &&
              value.strSport == this.modelSport
            );
          });
        this.filteredNextMatches = this.filteredNextMatches.filter((value) => {
          return (
            value.strLeague == this.modelLeague &&
            value.strSport == this.modelSport
          );
        });
        this.filteredNextLeagueMatches = this.filteredNextLeagueMatches.filter(
          (value) => {
            return (
              value.strLeague == this.modelLeague &&
              value.strSport == this.modelSport
            );
          }
        );
        this.filteredNextAthleteMatches =
          this.filteredNextAthleteMatches.filter((value) => {
            return (
              value.strLeague == this.modelLeague &&
              value.strSport == this.modelSport
            );
          });
      } else if (this.modelLeague != null) {
        this.filteredLastMatches = this.filteredLastMatches.filter((value) => {
          return value.strLeague == this.modelLeague;
        });
        this.filteredLastAthleteMatches =
          this.filteredLastAthleteMatches.filter((value) => {
            return value.strLeague == this.modelLeague;
          });
        this.filteredLastLeagueMatches = this.filteredLastLeagueMatches.filter(
          (value) => {
            return value.strLeague == this.modelLeague;
          }
        );
        this.filteredNextMatches = this.filteredNextMatches.filter((value) => {
          return value.strLeague == this.modelLeague;
        });
        this.filteredNextAthleteMatches =
          this.filteredNextAthleteMatches.filter((value) => {
            return value.strLeague == this.modelLeague;
          });
        this.filteredNextLeagueMatches = this.filteredNextLeagueMatches.filter(
          (value) => {
            return value.strLeague == this.modelLeague;
          }
        );
      } else if (this.modelLeague == null) {
        this.filteredLastMatches = this.lastMatches;
        this.filteredLastLeagueMatches = this.lastLeagueMatches;
        this.filteredLastAthleteMatches = this.lastAthleteMatches;
        this.filteredNextMatches = this.nextMatches;
        this.filteredNextLeagueMatches = this.nextLeagueMatches;
        this.filteredNextAthleteMatches = this.nextAthleteMatches;
      }
    },
    onSportChange() {
      if (this.modelLiveSport == null) {
        this.filteredLiveMatches = this.liveMatches;
        this.filteredLiveLeagueMatches = this.liveLeagueMatches;
      } else {
        this.filteredLiveMatches = this.liveMatches.filter((value) => {
          return value.strSport == this.modelLiveSport;
        });
        this.filteredLiveLeagueMatches = this.liveLeagueMatches.filter(
          (value) => {
            return value.strSport == this.modelLiveSport;
          }
        );
      }
    },
    onLeagueChange() {
      if (this.modelLiveSport != null) {
        this.filteredLiveMatches = this.filteredLiveMatches.filter((value) => {
          return (
            value.strLeague == this.modelLiveLeague &&
            value.strSport == this.modelLiveSport
          );
        });
        this.filteredLiveLeagueMatches = this.filteredLiveLeagueMatches.filter(
          (value) => {
            return (
              value.strLeague == this.modelLiveLeague &&
              value.strSport == this.modelLiveSport
            );
          }
        );
      } else if (this.modelLiveLeague != null) {
        this.filteredLiveMatches = this.filteredLastMatches.filter((value) => {
          return value.strLeague == this.modelLiveLeague;
        });
        this.filteredLiveLeagueMatches = this.filteredLiveLeagueMatches.filter(
          (value) => {
            return value.strLeague == this.modelLiveLeague;
          }
        );
      } else if (this.modelLiveLeague == null) {
        this.filteredLiveMatches = this.liveMatches;
        this.filteredLiveLeagueMatches = this.liveLeagueMatches;
      }
    },
    currentDate() {
      let dt = new Date();
      let month = ("0" + (dt.getMonth() + 1)).slice(-2);
      let date = ("0" + dt.getDate()).slice(-2);
      let year = dt.getFullYear();
      const fullDate = year + "-" + month + "-" + date;
      return fullDate;
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
      return this.filteredMatches.filter((d) => {
        return d.strTime.split(":").join("") > parseInt(time);
      });
    },
  },
  mounted() {
    axios
      .request({
        method: "get",
        baseURL: url + `favourite/teams/matches/${this.date}`,
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.todayMatches = response.data;
        this.filteredMatches = this.todayMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/teams/lastmatches",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.lastMatches = response.data;
        this.filteredLastMatches = this.lastMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loadingLastMatches = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/athletes/lastmatches",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.lastAthleteMatches = response.data;
        this.filteredLastAthleteMatches = this.lastAthleteMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loadingLastAthleteMatches = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/athletes/nextmatches",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.nextAthleteMatches = response.data;
        this.filteredNextAthleteMatches = this.nextAthleteMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/leagues/lastmatches",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.lastLeagueMatches = response.data;
        this.filteredLastLeagueMatches = this.lastLeagueMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loadingLastAthleteMatches = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/leagues/nextmatches",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.nextLeagueMatches = response.data;
        this.filteredNextLeagueMatches = this.nextLeagueMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/athletes/nextmatches",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.nextAthleteMatches = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/teams/nextmatches",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.nextMatches = response.data;
        this.filteredNextMatches = this.nextMatches;
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
        response.data.forEach((element) => {
          this.filteredLeagues.push(element.strLeague);
        });
      });
    axios
      .request({
        method: "get",
        baseURL: url + "favourite/sports",
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        response.data.forEach((element) => {
          this.filteredSports.push(element.strSport);
        });
      });
    axios
      .request({
        method: "get",
        baseURL: url + `favourite/teams/livematches`,
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.liveMatches = response.data;
        this.filteredLiveMatches = this.liveMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loadingLiveMatches = false));
    axios
      .request({
        method: "get",
        baseURL: url + `favourite/leagues/livematches`,
        headers: {
          Authorization: "Bearer " + bearer,
        },
      })
      .then((response) => {
        this.liveLeagueMatches = response.data;
        this.filteredLiveLeagueMatches = this.liveLeagueMatches;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loadingLiveLeagueMatches = false));
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

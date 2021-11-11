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
      <div class="q-pa-md row" style="max-width: 350px; float: right">
        <q-list bordered separator>
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
              <q-item-section>
                <q-item-label>{{ sport.strSport }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
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
                label="Finished"
              />
              <q-tab name="upcoming" icon="upcoming" label="Upcoming" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="finished">
                <div class="q-pa-md" style="max-width: 630px">
                  <q-list class="bg-white">
                    <q-item v-for="match in lastMatches" :key="match.idEvent">
                      <q-item-section>
                        <q-item-label>{{ match.strLeague }}</q-item-label>
                        <q-item-label caption lines="2">{{
                          match.strEvent
                        }}</q-item-label>
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
                <div class="q-pa-md" style="max-width: 630px">
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
  name: "favourites",
  data() {
    return {
      leagues: [],
      sports: [],
      lastMatches: [],
      nextMatches: [],
      tab: ref("finished"),
    };
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
      .get("https://localhost:5001/api/SportDB/matches/lastbyteam/133602")
      .then((response) => (this.lastMatches = response.data));
    axios
      .get("https://localhost:5001/api/SportDB/matches/nextbyteam/133602")
      .then((response) => (this.nextMatches = response.data));
  },
};
</script>
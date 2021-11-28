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
          expand-separator
          icon="sports_esports"
          label="Favourite sports"
          header-class="text-blue"
          default-opened
        >
          <q-item
            clickable
            v-ripple
            v-for="sport in favouriteSports"
            :key="sport"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="sports_soccer" />
            </q-item-section>
            <q-item-section>{{ sport }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="person"
          label="Favourite athlete"
          header-class="text-blue"
        >
          <q-item
            clickable
            v-ripple
            v-for="athlete in favouriteAthletes"
            :key="athlete"
          >
            <q-item-section>{{ athlete }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="groups"
          label="Favourite teams"
          header-class="text-blue"
        >
          <q-item clickable v-ripple v-for="team in favouriteTeams" :key="team">
            <q-item-section>
              <q-item-section>{{ team.name }}</q-item-section>
              <q-item-label caption>{{ team.sport }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          icon="groups"
          label="Favourite leagues"
          header-class="text-blue"
        >
          <q-item
            clickable
            v-ripple
            v-for="league in favouriteLeagues"
            :key="league"
          >
            <q-item-section>
              <q-item-section>{{ league.name }}</q-item-section>
              <q-item-label caption>{{ league.sport }}</q-item-label>
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
</template>

<script>
import { ref } from "vue";

export default {
  name: "home-page-header",
  setup() {
    return {
      value: ref(true),
      favouriteSports: [
        "Football",
        "Tennis",
        "Basketball",
        "Volleyball",
        "Cricket",
        "Swimming",
      ],
      favouriteAthletes: ["Robet Lewandowski", "Kamil Stoch"],
      favouriteTeams: [
        { name: "Poland", sport: "Soccer" },
        { name: "FC Barcelona", sport: "Soccer" },
      ],
      favouriteLeagues: [
        { name: "English Premier League", sport: "Soccer" },
        { name: "PKO BP Ekstraklasa", sport: "Soccer" },
      ],
    };
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
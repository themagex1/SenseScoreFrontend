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
</template>

<script>
import { ref } from "vue";

export default {
  name: "home-page-header",
  setup() {
    return {
      value: ref(true),
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
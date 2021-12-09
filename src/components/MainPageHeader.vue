<template>
  <q-header elevated class="bg-light-blue-14">
    <q-toolbar style="gap: 20px">
      <q-toolbar-title>
        <img alt="App logo" src="@/assets/logo.png" @click="$router.push({path:'/'})" style="cursor: pointer"/>
      </q-toolbar-title>

      <div>
        <q-toggle
          v-model="value"
          color="grey-9"
          class="text-weight-bold text-grey-9"
          >Dark Mode
        </q-toggle>
      </div>
      <div>
        <q-btn
          class="text-weight-bold"
          icon-right="home"
          color="grey-9"
          flat
          no-caps
          @click="$router.push({name: 'MainPage'})"
          >Home
        </q-btn>
      </div>
      <div>
        <q-btn
          class="text-weight-bold"
          icon-right="people"
          color="grey-9"
          flat
          no-caps
          @click="$router.push({name: 'aboutUs'})"
          >About Us
        </q-btn>
      </div>
      <div>
        <q-btn-dropdown flat dropdown-icon="menu" color="grey-9">
          <q-list>
            <q-item clickable @click="$router.push({name:'FAQ'})">
              <q-item-section>
                <q-item-label>FAQ</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="question_answer" />
              </q-item-section>
            </q-item>
            <q-item clickable @click="$router.push({name: 'Contact'})">
              <q-item-section>
                <q-item-label>Contact</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="contact_support" />
              </q-item-section>
            </q-item>
            <q-item clickable @click="$router.push({name: 'Opinions'})">
              <q-item-section>
                <q-item-label>Opinions</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-icon name="grade" />
              </q-item-section>
            </q-item>
            <q-separator spaced />
            <span class="material-icons">copyright</span>
            <span style="font-size: 10px"> Sense Score</span>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { ref } from "vue";

export default {
  name: "main-page-header",
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
.q-toolbar {
  font-family: "Mochiy Pop One", sans-serif;
  font-family: "Ubuntu", sans-serif;
}
</style>

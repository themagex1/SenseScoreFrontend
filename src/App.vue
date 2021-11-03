<template>
  <q-layout
      view="hHh Lpr lFf"
      style="
      font-family: Roboto, sans-serif;
      font-size: 14px;
    "
      class="bg-grey-9"
  >
    <q-header elevated class="bg-light-blue-14">
      <q-toolbar style="gap: 20px">
        <q-toolbar-title>
          <img alt="App logo" src="@/assets/logo.png"/>
        </q-toolbar-title>

        <div>
          <q-toggle
              v-model="value"
              color="grey-9"
              class="text-weight-bold text-grey-9"
          >Dark Mode</q-toggle>
        </div>
        <div>

          <q-btn class="text-weight-bold" icon-right="home" color="grey-9" flat no-caps>Home</q-btn>
        </div>
        <div>
          <q-btn class="text-weight-bold" icon-right="people" color="grey-9" flat no-caps>About Us</q-btn>
        </div>
        <div>
          <q-btn-dropdown flat dropdown-icon="menu" color="grey-9">
            <q-list>
              <q-item clickable @click="click">
                <q-item-section>
                  <q-item-label>FAQ</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="question_answer"/>
                </q-item-section>
              </q-item>
              <q-item clickable @click="click">
                <q-item-section>
                  <q-item-label>Kontakt</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="contact_support"/>
                </q-item-section>
              </q-item>
              <q-item clickable @click="click">
                <q-item-section>
                  <q-item-label>Opinie</q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon name="grade"/>
                </q-item-section>
              </q-item>
              <q-separator spaced/>
              <span class="material-icons">copyright</span>
              <span style="font-size: 10px">   Sense Score</span>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div
          class="row items-center"
          style="text-align: center; position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);"
      >
        <div class="col">
          <div class="big-desc">
            <h1 class="text-light-blue-14">YOUR LEAGUE</h1>
            <h1 class="text-light-blue-14">YOUR MATCH</h1>
            <div class="row justify-center">
              <LoginPopUp/>
              <LoginPopUp/>
            </div>


            <div class="description-left text-center text-light-blue-14">
              Sense Score jest serwisem w którym możesz zarządzać swoimi
              ulubionymi zespołami sportowymi oraz zagrać w wirtualną grę
              bukmacherską.
            </div>
          </div>
        </div>
        <div class="col">
          <div class="big-desc-1 text-center items-center">
            <Tablet/> <!-- Tu trzeba zaimplementowac animacje -->

          </div>
        </div>
      </div>

      <!--<login-register />-->
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import LoginPopUp from '@/components/loginPopUp'
import Tablet from '@/components/Tablet'
export default {
  name: 'LayoutDefault',
  components:{
    Tablet,
    LoginPopUp,
  },
  setup () {
    return {
      leftDrawerOpen: ref(false),
      value: ref (true)
    }
  },
}
</script>
<style>
.description-left {
  color: white;
  max-width: 400px;
  margin: 40px auto;
}
</style>

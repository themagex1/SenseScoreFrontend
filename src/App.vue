<template>
  <q-layout
      view="hHh Lpr lFf"
      style="
      font-family: Roboto, sans-serif;
      font-size: 14px;
    "
      class="bg-grey-9"
  >
    <MainPageHeader/>

    <q-page-container>
      <router-view></router-view>
      <div
          class="fit row wrap container"

      >
        <div class="col self-center column-1">
          <div class="big-desc">
            <h1 class="text-light-blue-14 title">YOUR LEAGUE</h1>
            <h1 class="text-light-blue-14 title">YOUR MATCH</h1>
            <div class="row justify-center">
              <LoginPopUp/>
              <RegisterPopUp/>
            </div>
          </div>

          <div class="description__left text-light-blue-14">
            Sense Score jest serwisem w którym możesz zarządzać swoimi
            ulubionymi zespołami sportowymi oraz zagrać w wirtualną grę
            bukmacherską.
          </div>

        </div>
        <div class="col self-center column-2">
          <div class="section__carousel text-center items-center">
            <q-carousel animated
                        v-model="slide"
                        arrows
                        navigation
                        infinite
                        :autoplay="autoplay"
                        transition-next="slide-left"
                        transition-prev="slide-right"
                        @mouseleave="autoplay=true"
                        @mouseenter="autoplay=false"
            >
              <q-carousel-slide :name="1" img-src="@/assets/pilka-nozna.jpeg"/>
              <q-carousel-slide :name="2" img-src="@/assets/koszykowka.jpeg"/>
              <q-carousel-slide :name="3" img-src="@/assets/tenis-ziemny.jpeg"/>
              <q-carousel-slide :name="4" img-src="@/assets/pilka-nozna.jpeg"/>
              <q-carousel-slide :name="5" img-src="@/assets/tenis-ziemny.jpeg"/>
            </q-carousel>

          </div>

          <div class="icon-description">

          </div>

        </div>
        <div class="col column-3"
             style="overflow: auto; min-width: 100%; max-width: 100%; position: fixed; left: 0px; bottom: 0px">
          <div class="image__marquee"></div>

        </div>

      </div>

    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import LoginPopUp from '@/components/loginPopUp'
import MainPageHeader from '@/components/MainPageHeader'
import RegisterPopUp from '@/components/registerPopUp'

export default {
  name: 'LayoutDefault',
  components: {
    RegisterPopUp,
    MainPageHeader,
    LoginPopUp,
  },
  setup () {
    return {
      leftDrawerOpen: ref(false),
      value: ref(true),
      slide: ref(1),
      autoplay: ref(true)
    }
  },
}
</script>
<style scoped lang="scss">
@import 'quasar.variables';

.container {
  margin: 5vh auto;
}

.description__left {
  color: white;
  max-width: 400px;
  margin: 40px auto;
  font-family: "News of the World";
  font-size: 1.1vw;
}

.title {
  font-size: 7vw;
  text-align: center;
  font-family: "News of the World";
  margin: 10vh auto;
}

.section__carousel {
  margin-right: 5%;
  margin-left: 5%;
  border: 1.5em solid $light-blue-14;
  border-radius: 20px;
  box-shadow: 10px 10px 10px 5px $light-blue-14;

}

.image__marquee {
  height: 50px; /* Any size you want */
  background-image: url("../src/assets/soccersi.jpeg");
  animation: imageMovement 8s linear infinite;
  @keyframes imageMovement {
    100% {
      background-position-x: 728px; /* width of the image */
    }
  }


}
</style>

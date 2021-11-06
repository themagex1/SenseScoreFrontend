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
          class="row items-center"
          style="text-align: center; position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);"
      >
        <div class="col">
          <div class="big-desc">
            <h1 class="text-light-blue-14 big-text">YOUR LEAGUE</h1>
            <h1 class="text-light-blue-14 big-text">YOUR MATCH</h1>
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
          <div class="carousel-section text-center items-center">
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
          <div class="imageMarquee"></div>
        </div>

      </div>

      <!--<login-register />-->

    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import LoginPopUp from '@/components/loginPopUp'
import MainPageHeader from '@/components/MainPageHeader'

export default {
  name: 'LayoutDefault',
  components: {
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
<style lang="scss">
@import 'quasar.variables';

.description-left {
  color: white;
  max-width: 400px;
  margin: 40px auto;
}

.big-text {
  font-size: 5rem;
}

.carousel-section {
  margin-right: 5%;
  margin-left: 5%;
  border: 1.5em solid $light-blue-14;
  border-radius: 20px;
  box-shadow: 10px 10px 10px 5px $light-blue-14;

}

.imageMarquee {
  margin-right: 5%;
  height: 20px; /* Any size you want */
  background-image: url(http://www.tedmontgomery.com/tutorial/bckgrnds/outrspc4.gif);
  animation: imageMovement 5s linear infinite;
}

@keyframes imageMovement {
  100% {
    background-position-x: 320px; /* width of the image */
  }
}
</style>

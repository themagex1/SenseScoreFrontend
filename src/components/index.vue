<template>
  <div class="fit row wrap container">
    <div class="col self-center column-1">
      <div class="big-desc">
        <h1 class="text-light-blue-14 title">YOUR LEAGUE</h1>
        <h1 class="text-light-blue-14 title">YOUR MATCH</h1>
        <div class="row justify-center">
          <LoginPopUp />
          <RegisterPopUp />
        </div>
      </div>

      <div class="description__left text-light-blue-14">
        Sense Score jest serwisem w którym możesz zarządzać swoimi ulubionymi
        zespołami sportowymi oraz zagrać w wirtualną grę bukmacherską.
      </div>
    </div>
    <div class="col self-center column-2">
      <div class="section__carousel text-center items-center">
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          :autoplay="autoplay"
          transition-next="slide-left"
          transition-prev="slide-right"
          @mouseleave="autoplay = true"
          @mouseenter="autoplay = false"
        >
          <q-carousel-slide :name="1" img-src="@/assets/pilka-nozna.jpeg" />
          <q-carousel-slide :name="2" img-src="@/assets/koszykowka.jpeg" />
          <q-carousel-slide :name="3" img-src="@/assets/tenis-ziemny.jpeg" />
          <q-carousel-slide :name="4" img-src="@/assets/pilka-nozna.jpeg" />
          <q-carousel-slide :name="5" img-src="@/assets/tenis-ziemny.jpeg" />
        </q-carousel>
      </div>

      <div class="icon-description"></div>
    </div>
    <div
      class="col column-3"
      style="
        overflow: auto;
        min-width: 100%;
        max-width: 100%;
        position: fixed;
        left: 0px;
        bottom: 0px;
      "
    >
      <div class="image__marquee"></div>
    </div>
  </div>
</template>

<script>
import LoginPopUp from "@/components/loginPopUp";

export default {
  name: "index",
  components: {
    LoginPopUp,
  },
};
</script>

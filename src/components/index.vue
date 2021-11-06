<template>
  <div
    class="row items-center"
    style="
      text-align: center;
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    "
  >
    <div class="col">
      <div class="big-desc">
        <h1 class="text-light-blue-14">YOUR LEAGUE</h1>
        <h1 class="text-light-blue-14">YOUR MATCH</h1>
        <div class="row justify-center">
          <LoginPopUp />

        </div>

        <div class="description-left text-center text-light-blue-14">
          Sense Score jest serwisem w którym możesz zarządzać swoimi ulubionymi
          zespołami sportowymi oraz zagrać w wirtualną grę bukmacherską.
        </div>
      </div>
    </div>
    <div class="col">
      <div class="big-desc-1 text-center items-center">
        <Tablet />
        <!-- Tu trzeba zaimplementowac animacje -->
      </div>
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

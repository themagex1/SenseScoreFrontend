<template>
  <q-page class="flex flex-start">
    <div style="margin-top: 5rem; margin-left: 2rem">
      <q-card
        class="my-card text-white"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <q-card-section>
          <div class="text-h6">Get full features of our app</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
        <q-separator dark />

        <q-card-actions>
          <q-btn
            color="primary"
            text-color="white"
            push
            label="Sign in"
            icon="login"
            flat
            @click="card = true"
          ></q-btn>
          <q-dialog v-model="card">
            <q-card class="my-card">
              <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

              <q-card-section>
                <q-btn
                  fab
                  color="primary"
                  icon="place"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%)"
                />

                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">Cafe Basilico</div>
                  <div
                    class="
                      col-auto
                      text-grey text-caption
                      q-pt-md
                      row
                      no-wrap
                      items-center
                    "
                  >
                    <q-icon name="place" />
                    250 ft
                  </div>
                </div>

                <q-rating v-model="stars" :max="5" size="32px" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-subtitle1">$・Italian, Cafe</div>
                <div class="text-caption text-grey">
                  Small plates, salads & sandwiches in an intimate setting.
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Reserve" />
                <q-btn v-close-popup flat color="primary" round icon="event" />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-btn
            color="primary"
            text-color="white"
            push
            label="Sign up"
            icon="how_to_reg"
            flat
          ></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { ref } from "vue";

export default {
  name: "LoginRegister",
  setup() {
    return {
      card: ref(false),
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
    };
  },
};
</script>

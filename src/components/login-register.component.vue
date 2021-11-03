<template>
  <q-page class="flex flex-start">
    <div
      style="
        clear: right;
        width: 190vh;
        margin: 0 auto;
        margin-top: 5rem;
        text-align: center;
      "
    >
      <q-card
        class="my-card text-white"
        style="
          background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
          border-radius: 2rem;
        "
      >
        <q-card-section>
          <div class="text-h1">Sense Score</div>
          <div class="text-h2">Follow, like, bet</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ description }}
        </q-card-section>
        <q-separator dark />

        <q-card-actions style="justify-content: center">
          <q-btn
            color="primary"
            text-color="white"
            push
            label="Sign in"
            icon="login"
            flat
            @click="login"
          ></q-btn>
          <LoginPopUp/>
          <q-btn
            color="primary"
            text-color="white"
            push
            label="Sign up"
            icon="how_to_reg"
            flat
            @click="card1 = true"
          ></q-btn>
          <q-dialog v-model="card1" class="justify-center">
            <q-card class="my-card flex flex-center column">
              <div
                class="text-h2 text-weight-bolder popUpText"
                style="margin: 3vw"
              >
                SIGN UP
              </div>
              <!--Register form -->
              <div  style="min-height: 35vh; min-width: 50vh">
                <div class="q-pa-md flex-center column">
                  <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md column"
                  >
                    <q-input
                      standout
                      v-model="name"
                      type="email"
                      label="Your e-mail *"
                      hint="Please type your e-mail"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'You must type your e-mail',
                      ]"
                    ></q-input>
                    <q-input
                      standout
                      v-model="password"
                      type="password"
                      label="Your password *"
                      hint="Please type your password"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 5) ||
                          'Your password must contain at least six characters',
                      ]"
                    ></q-input>
                    <q-input
                      standout
                      v-model="password"
                      type="password"
                      label="Confirm your password *"
                      hint="Please type your password again"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 5) ||
                          'Your password must contain at least six characters',
                      ]"
                    ></q-input>
                    <q-toggle
                      v-model="accept"
                      label="I accept the license and terms"
                      checked-icon="check"
                      color="green"
                      unchecked-icon="clear"
                    ></q-toggle>
                    <div class="row flex-center" style="margin: 2vw">
                      <q-btn
                        outline
                        label="Register"
                        type="submit"
                        color="black"
                      ></q-btn>
                      <q-btn
                        label="Reset form"
                        type="reset"
                        color="primary"
                        flat
                        class="q-ml-sm"
                      ></q-btn>
                    </div>
                  </q-form>
                </div>
              </div>

              <q-separator />
            </q-card>
          </q-dialog>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<style>
.popUpText {
  margin: 2rem 6rem;
  font-family: Impact;
  text-shadow: #21ba45 0.1em 0.1em 0.5em;
}
.text-h1,
.text-h2,
.q-pt-none {
  width: 100%;
}

.q-pt-none {
  font-size: 16px;
}
</style>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import LoginPopUp from '@/components/loginPopUp'

export default {
  name: "LoginRegister",
  components: { LoginPopUp },
  data() {},
  methods: {
    login(){
      this.$router.push('/login')
    }
  },
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const password = ref(null);
    const accept = ref(null);
    return {
      name,
      password,
      accept,
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },
      onReset() {
        name.value = null;
        password.value = null;
        accept.value = false;
      },
      card: ref(false),
      card1: ref(false),
      description:
        "Welcome in our app. Set up an account to get all features. Manage your favourite teams, follow results and climb up in our bookmaker's game.",
    };
  },
};
</script>

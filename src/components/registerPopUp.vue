<template>
  <div class="q-pa-md q-gutter-sm register__content">
    <q-btn outline
           label="REGISTER"
           text-color="light-blue-14"
           @click="card = true"
           class="button__register"
    />

    <q-dialog v-model="card" class="justify-center dialog" style="background-color: rgba(0,0,0,0.8)">
      <q-card class="card__Popup flex flex-center column bg-light-blue-14">
        <div class="row flex-center container">

          <div class="col column__1">
            <div class="column__1-title">
              <h2 class="column__1-title-header">Welcome to Sense Score</h2>
            </div>
            <div class="column__1-description">
              <div class="column__1-description-text">
                Odkryj świat sportu i stań się mistrzem gry bukmacherskiej
              </div>
            </div>
          </div>


          <div class="col column__2">
            <div class="column__2-title">
              <h2 class="column__2-title-header text-center text-grey-9">Log In</h2>
            </div>
            <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md register__form"
            >
              <q-input
                  standout
                  v-model="email"
                  label="Adres E-mail"
                  type="email"
                  bg-color="grey-9"
                  label-color="light-blue-14"
                  class="register__form-input"
              />
              <q-input
                  class="register__form-input"
                  bg-color="grey-9"
                  label-color="light-blue-14"
                  standout="bg-grey-9 text-light-blue-14"
                  v-model="password"
                  label="Password"
                  type="password"
                  lazy-rules:rules="[val => val !== null && val.length > 5 ||
                'Your password must contain at least six characters',]"
              />
              <q-input
                  class="register__form-input"
                  bg-color="grey-9"
                  label-color="light-blue-14"
                  standout="bg-grey-9 text-light-blue-14"
                  v-model="repeatPassword"
                  label="Confirm password"
                  type="password"
                  lazy-rules:rules="[val => val == password ||
                'Password is not matched',]"
              />
              <q-toggle class="acceptToggle"
                        color="grey-9"
                        v-model="accept"
                        label="I accept the license and terms"
                        keep-color
              />
              <div class="form__button">
                <q-btn label="REGISTER"
                       type="submit"
                       color="grey-9"
                       class="button__login text-light-blue-14"
                />
                <q-btn label="RESET"
                       type="reset"
                       color="light-blue-14"
                       flat class="q-ml-sm button__reset text-grey-9"
                />
              </div>
            </q-form>

          </div>
        </div>
        <q-separator/>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'registerPopUp',
  setup () {

    const email = ref(null)
    const password = ref(null)
    const repeatPassword = ref(null)
    const accept = ref(false)
    return {
      card: ref(false),
      email,
      password,
      repeatPassword,
      accept,

      onSubmit () {

      },
      onReset () {
        email.value = null
        password.value = null
        repeatPassword.value = null
        accept.value = false

      }
    }
  },

}
</script>

<style scoped lang="scss">
@import "src/quasar.variables";

.button__register {
  font-size: 1.5vw;
  width: 10vw;
  font-family: "News of the World";
  color: $grey-9;
}

.column__1-title {
  font-family: "News of the World";
  font-style: italic;
  font-weight: bold;
  color: $grey-9;
  text-align: center;
}
</style>

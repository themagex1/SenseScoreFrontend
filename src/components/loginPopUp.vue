<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
        label="LOGIN"
        color="light-blue-14"
        text-color="grey-9"
        @click="card = true"
        class="button__login"
    />
    <q-dialog
        v-model="card"
        class="justify-center dialog"
        style="background-color: rgba(0, 0, 0, 0.8)"
    >
      <q-card class="card__loginPopup flex flex-center column bg-light-blue-14">
        <div class="row flex-center container">
          <div class="col column__loginPopup-1">
            <div class="column__loginPopup-description">
              <h2 class="column__loginPopup-title">
                Welcome Back in Sense Score
              </h2>
            </div>
            <div class="column__loginPopup-description_2">
              <div class="column__loginPopup-description_2-1">
                Odkryj świat sportu i stań się mistrzem gry bukmacherskiej
              </div>
            </div>
          </div>
          <div class="col column__loginPopup-2">
            <div class="description-login">
              <h2 class="login-h text-center text-grey-9">Log In</h2>
            </div>
            <q-form class="q-gutter-md login-form">
              <q-input
                  standout
                  v-model="email"
                  label="Adres E-mail"
                  type="email"
                  bg-color="grey-9"
                  label-color="light-blue-14"
                  class="email-input"
              />
              <q-input
                  class="pass-input"
                  bg-color="grey-9"
                  label-color="light-blue-14"
                  standout="bg-grey-9 text-light-blue-14"
                  v-model="password"
                  label="Password"
                  type="password"
              />
              <q-toggle
                  class="acceptToggle"
                  color="grey-9"
                  v-model="accept"
                  label="I accept the license and terms"
                  keep-color
              />
              <div class="buttons">
                <q-btn
                    label="LOGIN"
                    type="submit"
                    color="grey-9"
                    class="button__login-1 text-light-blue-14"
                    @click="doLogin"
                />
                <q-btn
                    label="RESET"
                    type="reset"
                    color="light-blue-14"
                    flat
                    class="q-ml-sm button__reset text-grey-9"
                    @click="onReset"
                />
              </div>
              <div class="repeat-pass-desc">
                <passwordRecovery/>
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

import { getAuthService } from '@/services/authService'
import passwordRecovery from '@/components/passwordRecovery'

export default {
  data () {
    return {
      email: '',
      password: '',
      accept: false,
      card: false
    }
  },
  name: 'loginPopUp',
  methods: {
    async doLogin () {
      const loggedIn = await getAuthService().logIn(this.email, this.password)
      if (loggedIn) {
        await this.$router.push({
          name: 'home',
        })
      }
    },
    onReset () {
      this.accept = false
      this.email = null
      this.password = null
    }
  },
  components: {
    passwordRecovery
  }
}
</script>

<style scoped lang="scss">
/* Cały popup */
@import "src/quasar.variables.scss";

.card__loginPopup {
  border-radius: 25px 0 25px 0;
  min-width: 50vw;
  min-height: 60vh;
  border: 10px solid $grey-9;
}

.column__loginPopup-1 {
  border-right: solid $grey-9;
}

/* Lewa strona */
.column__loginPopup-description {
  margin: 4vw 2vw;
}

.column__loginPopup-description_2 {
  margin: 0 2vw;
}

.column__loginPopup-title {
  font-family: "News of the World";
  font-style: italic;
  font-weight: bold;
  font-size: 5vw;
  color: $grey-9;
  text-align: center;
}

.column__loginPopup-description_2-1 {
  font-family: "News of the World";
  font-weight: inherit;
  font-size: 1.2vw;
  color: $grey-9;
}

/* Prawa strona */
.login-h {
  font-family: "News of the World";
  font-weight: bold;
  font-size: 4vw;
}

.login-form {
  margin: 0 4vw;
  color: $light-blue-14;

  .email-input,
  .pass-input {
    margin-left: auto;
    margin-right: auto;
    font-family: "News of the World";
    font-size: 1.2vw;
  }
}

.acceptToggle,
.buttons,
.repeat-pass-desc {
  margin-left: auto;
  margin-right: auto;
  font-family: "News of the World";
  font-size: 1.1vw;
  color: $grey-9;
}

.buttons {
  text-align: center;

  .button__login-1,
  .button__reset {
    font-size: 1.2vw;
    width: 6vw;
  }
}

.button__login {
  font-size: 1.5vw;
  width: 10vw;
  font-family: "News of the World";
  color: $grey-9;
}
</style>

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
              <h2 class="column__loginPopup-title" style="letter-spacing: 3px">
                Welcome Back to Sense Score
              </h2>
            </div>
            <div class="column__loginPopup-description_2">
              <div class="column__loginPopup-description_2-1">
                Discover the world of sport and become the master of sport betting!
              </div>
            </div>
          </div>
          <div class="col column__loginPopup-2">
            <div class="description-login">
              <h2 class="login-h text-center text-grey-9" style="letter-spacing: 4px">Log In</h2>
            </div>
            <q-card-section>
              <q-form class="q-gutter-md login-form">
                <q-input
                    standout
                    v-model="username"
                    label="E-mail or username"
                    type="text"
                    name="email"
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
              </q-form>
              <div class="errors">
                <div v-if="usernameError" style="text-align: center" class="text-red-9">
                  Username cannot be empty!
                </div>
                <div v-if="passwordError" style="text-align: center" class="text-red-9">
                  Password must be contain at least six characters!
                </div>
                <div v-if="acceptError" style="text-align: center" class="text-red-9">
                  You must accept the license and terms!
                </div>
                <div v-if="userError" style="text-align: center" class="text-red-9">
                  This account doesn't exist!
                </div>
              </div>

            </q-card-section>
            <q-card-actions>
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
                    name="password"
                    class="q-ml-sm button__reset text-grey-9"
                    @click="onReset"
                />
              </div>
            </q-card-actions>

            <div class="repeat-pass-desc">
              <passwordRecovery/>
            </div>
          </div>
        </div>

        <q-separator/>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import passwordRecovery from '@/components/passwordRecovery'
//import * as md5 from 'md5'

export default {
  data () {
    return {
      username: '',
      password: '',
      accept: false,
      card: false,
      acceptError: false,
      usernameError: false,
      passwordError: false,
      userError: false
    }
  },
  name: 'loginPopUp',
  methods: {
    async doLogin () {
      let validPassword = this.validPassword()
      let acceptTerm = this.acceptTerms()
      let validLogin = this.validLogin()
      if (validPassword && acceptTerm && validLogin) {
        await this.$store.dispatch('auth/login', {
          login: this.username,
          passHash: this.password
        })
            .then(() => {
              localStorage.getItem('isAuthenticated')
              if (localStorage.getItem('isAuthenticated') === 'false') {
                this.$router.push({ path: '/preferencesSports' })
              } else {
                this.$router.push({ path: '/home' })
              }
            })
            .catch(() => {
              this.userError = true
            })

      } else {
        console.log('Login error')
      }

    },
    validLogin () {
      if (this.username.length === 0) {
        this.usernameError = true
        return false
      } else {
        this.usernameError = false
        return true
      }

    },
    validPassword () {
      if (this.password.length < 6) {
        this.passwordError = true
        return false
      } else {
        this.passwordError = false
        return true
      }

    },

    acceptTerms () {
      if (this.accept === false) {
        this.acceptError = true
        return false
      } else {
        this.acceptError = false
        return true
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
  font-size: 85px;
  color: $grey-9;
  text-align: center;
}

.column__loginPopup-description_2-1 {
  font-family: "News of the World";
  font-weight: inherit;
  font-size: 30px;
  color: $grey-9;
}

/* Prawa strona */
.login-h {
  font-family: "News of the World";
  font-weight: bold;
  font-size: 75px;
}

.login-form {
  margin: 0 4vw;
  color: $light-blue-14;

  .email-input,
  .pass-input {
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;

  }
}

.acceptToggle,
.buttons,
.repeat-pass-desc {
  margin-left: auto;
  margin-right: auto;
  font-family: "News of the World";
  font-size: 22px;
  color: $grey-9;
  text-align: center;
}

.buttons {
  text-align: center;
  font-family: "News of the World";

  .button__login-1,
  .button__reset {
    font-size: 23px;
    width: 120px;
  }
}

.button__login {
  font-size: 30px;
  width: 200px;
  font-family: "News of the World";
  color: $grey-9;
}

@media (max-width: $phone-max-width) {
  .container {
    flex-direction: column;
    margin-top: -30px;
  }
  .login-h {
    margin: -10px auto;
  }
  .column__loginPopup-description_2-1 {
    text-align: center;
    max-width: 250px;
    margin: -50px auto 10px auto;
    font-size: 25px;
  }

}

@media (max-width: 500px) {
  .container {
    margin-top: -30px;
  }
  .login-h {
    font-size: 60px;
  }
  .column__loginPopup-title {
    font-size: 65px;
  }
  .column__loginPopup-description_2-1 {
    font-size: 23px;
  }
  .acceptToggle {
    font-size: 20px;
  }
  .buttons {
    font-size: 20px;
  }
}

@media (max-width: 375px) {
  .container {
    margin-top: 60px;
  }
}
</style>

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
              <h2 class="column__1-title-header" style="letter-spacing: 3px">Welcome to Sense Score</h2>
            </div>
            <div class="column__1-description">
              <div class="column__1-description-text">
                Discover the world of sport and become the master of sport betting!
              </div>
            </div>
          </div>


          <div class="col column__2">
            <div class="column__2-title">
              <h2 class="column__2-title-header text-center text-grey-9" style="letter-spacing: 3px">Register Now</h2>
            </div>
            <q-card-section>
              <q-form

                  @reset="onReset"
                  class="q-gutter-md register__form"
              >
                <q-input
                    standout
                    v-model="username"
                    label="Username"
                    type="text"
                    name="login"
                    bg-color="grey-9"
                    label-color="light-blue-14"
                    class="register__form-input"

                />
                <q-input
                    standout
                    v-model="email"
                    label="E-mail"
                    name="email"
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
                    name="password"

                />
                <q-input
                    class="register__form-input"
                    bg-color="grey-9"
                    label-color="light-blue-14"
                    standout="bg-grey-9 text-light-blue-14"
                    v-model="confirm_password"
                    label="Confirm password"
                    type="password"

                />
                <q-toggle class="acceptToggle"
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
                <div v-if="emailError" style="text-align: center" class="text-red-9">
                  E-mail cannot be empty!
                </div>
                <div v-if="passwordError" style="text-align: center" class="text-red-9">
                  Password must be contain at least six characters!
                </div>
                <div v-if="acceptError" style="text-align: center" class="text-red-9">
                  You must accept the license and terms!
                </div>
                <div v-if="confirmError" style="text-align: center" class="text-red-9">
                  Passwords must match!
                </div>
                <div v-if="userError" style="text-align: center" class="text-red-9">
                  {{error}}
                </div>
              </div>

            </q-card-section>
            <q-card-actions>
              <div class="form__button">
                <q-btn label="REGISTER"
                       color="grey-9"
                       class="button__register-1 text-light-blue-14"
                       @click.prevent="doSignUp"
                />
                <q-btn label="RESET"
                       type="reset"
                       color="light-blue-14"
                       flat class="q-ml-sm button__reset text-grey-9"
                />
                <Spinner v-if="isLoading"/>
              </div>
            </q-card-actions>
          </div>
        </div>
        <q-separator/>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { ref } from 'vue'
import * as sha256 from 'sha256'
import Spinner from '@/components/Spinner'

export default {
  name: 'registerPopUp',
  components: { Spinner },
  setup () {
    const accept = ref(false)

    return {
      card: ref(false),
      accept,
      onReset () {
        accept.value = false

      }
    }
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      acceptError: false,
      usernameError: false,
      passwordError: false,
      confirmError: false,
      emailError: false,
      userError: false,
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async doSignUp () {
      let _validMatch = this.validMatch()
      let _validEmail = this.validEmail()
      let _validLogin = this.validLogin()
      let _acceptTerms = this.acceptTerms()
      let _validPassword = this.validPassword()
      if (_validMatch && _validEmail && _acceptTerms && _validPassword && _validLogin) {
        this.isLoading = true
        this.$store.dispatch('auth/register', {
          username: this.username,
          eMail: this.email,
          passHash: sha256(this.password)
        }).then(() => {
          this.card = false
        })
            .catch((error) => {
              this.userError = true
              this.isLoading = false
              this.error = error.response.data
            })

      } else {
        console.log('Error')
      }
    },
    validMatch () {
      if (this.password !== this.confirm_password) {
        this.confirmError = true
        return false
      } else {
        this.confirmError = false
        return true
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
    validEmail () {
      if (this.email.length === 0) {
        this.emailError = true
        return false
      } else {
        this.emailError = false
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

  }

}
</script>

<style scoped lang="scss">
@import "src/quasar.variables";

.column__1-title {
  font-family: "News of the World";
  font-style: italic;
  font-weight: bold;
  color: $grey-9;
  text-align: center;
}

.card__Popup {
  border-radius: 25px 0 25px 0;
  min-width: 50vw;
  min-height: 70vh;
  border: 10px solid $grey-9;
}

.column__1 {
  border-right: solid $grey-9;
}

.column__1-title {
  margin-left: 2vw;
  margin-right: 2vw;
}

.column__1-description {
  margin-right: 2vw;
  margin-left: 2vw;
}

.column__1-title-header {
  font-family: "News of the World";
  font-style: italic;
  font-weight: bold;
  font-size: 85px;
  color: $grey-9;
  text-align: center;
}

.column__1-description-text {
  font-family: "News of the World";
  font-weight: inherit;
  font-size: 30px;
  color: $grey-9;
}

.column__2-title-header {
  font-family: "News of the World";
  font-weight: bold;
  font-size: 60px;
}

.register__form {
  margin: 0 4vw;
  color: $light-blue-14;
}

.register__form-input {
  margin-left: auto;
  margin-right: auto;
  font-family: "News of the World";
  font-size: 25px;
}

.acceptToggle, .form__button {
  margin-left: auto;
  margin-right: auto;
  font-family: "News of the World";
  font-size: 23px;
  color: $grey-9;
}

.form__button {
  text-align: center;
}

.button__register-1, .button__reset {
  font-size: 25px;
  width: 120px;
}

.button__register {
  font-size: 30px;
  width: 200px;
  font-family: "News of the World";
  color: $grey-9;
}

@media (max-width: $phone-max-width) {
  .column__1-title-header{
    font-size: 60px;
  }
  .container {
    flex-direction: column;
    margin-top: 200px;
  }

}
@media (max-width: 345px) {
  .container {
    margin-top: 400px;
  }
}


</style>

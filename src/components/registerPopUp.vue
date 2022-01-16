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
              <h2 class="column__2-title-header text-center text-grey-9">Register Now</h2>
            </div>
            <q-card-section>
              <q-form
                  @submit="doSignUp"
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
                    :rules="[rules.required]"
                />
                <q-input
                    standout
                    v-model="email"
                    label="E-mail"
                    name="email"
                    bg-color="grey-9"
                    label-color="light-blue-14"
                    class="register__form-input"
                    :rules="[rules.required, rules.email]"
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
                    :rules="[rules.required]"
                />
                <q-input
                    class="register__form-input"
                    bg-color="grey-9"
                    label-color="light-blue-14"
                    standout="bg-grey-9 text-light-blue-14"
                    v-model="confirm_password"
                    label="Confirm password"
                    type="password"
                    :rules="[rules.required]"
                    :error="!valid()"
                />
                <q-toggle class="acceptToggle"
                          color="grey-9"
                          v-model="acceptTerms"
                          label="I accept the license and terms"
                          keep-color
                />
              </q-form>
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
//import { getAccountService } from '@/services/accountService'
//import { getAuthService } from '@/services/authService'


export default {
  name: 'registerPopUp',
  setup () {
    const acceptTerms = ref(false)

    return {
      card: ref(false),
      acceptTerms,
      onReset () {
        acceptTerms.value = false

      }
    }
  },
  data(){
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      rules: {
        required: value => !!value || 'Required',
        email: value => {
          const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
          return pattern.test(value) || 'Invalid e-mail'
        }
      }
    }
  },
  methods: {
    async doSignUp () {
      if (this.valid) {
        this.$store.dispatch('auth/register', {
          username: this.username,
          eMail: this.email,
          passHash: this.password
        }).then(() => {
          this.$router.push({ path: '/' })
        })

      }
    },
    valid(){
      this.password === this.confirm_password
    }

  }

}
</script>

<style scoped lang="scss">
@import "src/quasar.variables";

.button__register {
  font-size: 1.5vw;
  width: 11vw;
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
  margin: 4vw 2vw;
}

.column__1-description {
  margin: 0 2vw;
}

.column__1-title-header {
  font-family: "News of the World";
  font-style: italic;
  font-weight: bold;
  font-size: 5vw;
  color: $grey-9;
  text-align: center;
}

.column__1-description-text {
  font-family: "News of the World";
  font-weight: inherit;
  font-size: 1.2vw;
  color: $grey-9;
}

.column__2-title-header {
  font-family: "News of the World";
  font-weight: bold;
  font-size: 4vw;
}

.register__form {
  margin: 0 4vw;
  color: $light-blue-14;
}

.register__form-input {
  margin-left: auto;
  margin-right: auto;
  font-family: "News of the World";
  font-size: 1.3vw;
}

.acceptToggle, .form__button {
  margin-left: auto;
  margin-right: auto;
  font-family: "News of the World";
  font-size: 1.1vw;
  color: $grey-9;
}

.form__button {
  text-align: center;
}
.button__register-1, .button__reset {
  font-size: 1.2vw;
  width: 6vw;
}
.button__register {
  font-size: 30px;
  width: 200px;
  font-family: "News of the World";
  color: $grey-9;
}
</style>

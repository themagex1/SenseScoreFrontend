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
                  bg-color="grey-9"
                  label-color="light-blue-14"
                  class="register__form-input"
              />
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
              />
              <q-input
                  class="register__form-input"
                  bg-color="grey-9"
                  label-color="light-blue-14"
                  standout="bg-grey-9 text-light-blue-14"
                  v-model="repeatPassword"
                  label="Confirm password"
                  type="password"
              />
              <q-toggle class="acceptToggle"
                        color="grey-9"
                        v-model="accept"
                        label="I accept the license and terms"
                        keep-color
              />
              <div class="form__button">
                <q-btn label="REGISTER"
                       color="grey-9"
                       class="button__register-1 text-light-blue-14"
                       @click="doSignUp"
                       type="submit"
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
import { getAccountService } from '@/services/accountService'
import { getAuthService } from '@/services/authService'


export default {
  name: 'registerPopUp',
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
  data(){
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  },
  methods: {
    async doSignUp () {
      try {
        const result = await getAccountService().addAccount(this.email, this.username, this.password)
        if(result) {
          await getAuthService().logIn(this.email, this.password)
          console.log('OK')
          await this.$router.push({
            name: 'home'
          })
        }
        else {
          //
        }
      }
      catch (e) {
        //do nothing
      }
    },

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
  font-size: 1.5vw;
  width: 10vw;
  font-family: "News of the World";
  color: $grey-9;
}
</style>

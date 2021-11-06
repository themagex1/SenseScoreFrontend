<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="LOGIN" color="light-blue-14" text-color="grey-9" @click="card = true"/>
    <q-dialog v-model="card" class="justify-center ">
      <q-card class="my-card flex flex-center column bg-light-blue-14">
        <div class="row flex-center">
          <div class="col kolumna-1">
            <div class="description-1">
              <h2 class="welcome-1">Welcome Back in Sense Score</h2>
            </div>
            <div class="description-2">
              <div class="odkryj-2">
                Odkryj świat sportu i stań się mistrzem gry bukmacherskiej
              </div>
            </div>
          </div>
          <div class="col kolumna-2">
            <div class="description-login">
              <h2 class="login-h">Log In</h2>
            </div>
            <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md login-form"
            >
              <q-input
                  filled
                  v-model="email"
                  label="Adres E-mail"
                  hint="Wprowadź adres e-mail"
                  type="email"
                  class="email-input"
              />
              <q-input
                  class="pass-input"
                  filled
                  v-model="password"
                  label="Password"
                  hint="Wprowadź hasło"
                  type="password"
                  lazy-rules:rules="[val => val !== null && val.length > 5 ||
                'Your password must contain at least six characters',]"
              />
              <q-toggle class="acceptToggle" v-model="accept" label="I accept the license and terms"/>
              <div class="buttons">
                <q-btn label="LOGIN" type="submit" color="primary"/>
                <q-btn label="RESET" type="reset" color="primary" flat class="q-ml-sm"/>
              </div>
              <div class="repeat-pass-desc">
                <span>Zapomniales hasla ?</span>
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
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()
    const email = ref(null)
    const password = ref(null)
    const accept = ref(false)

    return {
      card: ref(false),
      email,
      password,
      accept,
      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud-done',
            message: 'Submitted'
          })
        }
      },
      onReset () {
        email.value = null
        password.value = null
        accept.value = false
      }
    }
  },
  name: 'loginPopUp'
}
</script>

<style scoped>
/* Cały popup */
.my-card {
  border-radius: 25px 0 25px 0;
  min-width: 40vw;
}
.kolumna-1 {
  border-right:solid black;
}
/* Lewa strona */
.description-1 {
  margin: 4vw 2vw;
}

.description-2 {
  margin: 0 2vw;
}

.welcome-1 {
  font-family: "News of the World";
  font-style: italic;
  font-weight: bold;
  font-size: 60px;
}

.odkryj-2 {
  font-family: "News of the World";
  font-weight: bold;
  font-size: 18px;
}

/* Prawa strona */
.login-h {
  font-family: "News of the World";
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  max-width: 200px;
}
.login-form{
  margin: 1vw 3vw;
}
.email-input, .pass-input, .acceptToggle, .buttons,.repeat-pass-desc{
  margin-left: auto;
  margin-right: auto;
  max-width: 26vh;
}




</style>

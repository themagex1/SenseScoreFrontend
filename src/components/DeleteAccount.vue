<template>
  <div class=" q-gutter-sm">
    <!-- cos-->
    <div style="max-width: 350px">
      <q-list bordered style="max-width: 350px">
        <q-expansion-item label="SETTINGS" class="bg-light-blue-14 text-white settings" icon="settings">
          <q-list class="bg-white text-light-blue-14">
            <q-item @click="normalAccount = true" v-if="isNormal" clickable>
              Delete this account
            </q-item>
            <q-item @click="googleAccount = true" v-if="isGoogle" clickable>
              Delete is account
            </q-item>
            <q-item v-if="isNormal" clickable>
              Change password
            </q-item>
          </q-list>
        </q-expansion-item>

      </q-list>
    </div>
    <q-dialog v-model="normalAccount">
      <q-card style="width: 500px">
        <q-card-section>
          <div style="font-size: 18px; text-align: center; margin-bottom: 20px; margin-top: 20px">
            If you want to delete this account, fill out the form below
          </div>
          <q-form style="width: 250px; margin: 0 auto">

            <q-input label="Login" v-model="username"></q-input>
            <q-input label="Password" type="password" v-model="password"></q-input>
            <q-input label="Confirm password" type="password" v-model="confirmPassword"></q-input>
          </q-form>
        </q-card-section>
        <div class="errors" v-if="Errors" style="text-align: center">
          <div class="LoginError text-red-9" v-if="loginError">
            Login doesn't match!
          </div>
          <div class="text-red-9" v-if="passwordError">
            Passwords must match!
          </div>
        </div>
        <q-card-actions>

          <q-btn label="Send" @click="deleteNormalAccount" style="margin: 20px auto">

          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="googleAccount">
      <q-card style="width: 400px; height: 150px;">
        <q-card-section style="text-align: center; font-size: 20px">
          To delete an account click 'Confirm'
        </q-card-section>

        <q-card-actions>
          <q-btn @click="deleteGoogleAccount" label="Confirm" style="margin: 0 auto" class="bg-light-blue-14">

          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axiosR from '../services/api'
import * as sha256 from 'sha256'

const bearer = localStorage.getItem('bearer')
export default {
  name: 'DeleteAccount',
  data () {
    return {
      normalAccount: false,
      googleAccount: false,
      isNormal: false,
      isGoogle: false,
      username: '',
      password: '',
      confirmPassword: '',
      loginError: false,
      passwordError: false,
      Errors: false
    }
  },
  methods: {
    deleteGoogleAccount () {
      this.$gAuth.signOut()
      let id_token = localStorage.getItem('googleID')
      axiosR({
        method: 'delete',
        baseURL: 'api/Account/googleaccount',
        headers: {
          Authorization: 'Bearer ' + bearer,
        },
        data: {
          id_token: id_token
        },
      })
          .then(() => {
            this.$router.push('/')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('bearer')
            localStorage.removeItem('refreshToken')
          })
          .catch(function (error) {
            console.log(error)
          })
    },

    deleteNormalAccount () {
      let _validUser = this.validUsername()
      let _validPass = this.validPassword()
      if (_validPass && _validUser){
        axiosR({
          method: 'delete',
          baseURL: 'api/Account/account',
          headers: {
            Authorization: 'Bearer ' + bearer,
          },
          data: {
            login: this.username,
            passHash: sha256(this.password)
          }
        })
            .then(() => {
              this.$router.go(1)
              localStorage.removeItem('user')
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')
              localStorage.removeItem('bearer')
              //window.location.reload(true)
            })
      }
      else {
        this.Errors = true
      }

    },
    validUsername () {
      if (this.username !== localStorage.getItem('user')) {
        this.loginError = true
        return false
      } else {
        this.loginError = false
        return true
      }
    },
    validPassword () {
      if (this.password !== this.confirmPassword) {
        this.passwordError = true
        return false
      }
      else {
        this.passwordError = false
        return true
      }
    },

  },
  mounted () {
    if (localStorage.getItem('accountFlag') === '1') {
      this.isGoogle = true
    } else {
      this.isNormal = true
    }

  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Ubuntu&display=swap");

.q-item,
q.input,
q.list,
p,
.q-tab,
.q-btn,
.q-select {
  font-family: "Mochiy Pop One", sans-serif;
  font-family: "Ubuntu", sans-serif;
}

.settings {
  font-family: "Ubuntu"
}
</style>

<template>
  <div class="content">
    <span @click="card = true" style="cursor: pointer">
      Forgot your password?
    </span>
    <q-dialog v-model="card" class="justify-center dialog" style="background-color: rgba(0, 0, 0, 0.8)">
      <q-card class="flex flex-center column bg-light-blue-14 popUp" style="width: 40%; height: 50%">
        <h2 style="font-family: 'News of the World'" class="text-grey-9"> Password Recovery</h2>
        <q-form class="">
          <q-input v-model="eMail"
                   standout=""
                   label="E-mail"
                   bg-color="grey-9"
                   label-color="light-blue-14"
                   style="margin-bottom: 10px; width: 300px"
                   class="">

          </q-input>
          <q-input v-model="password"
                   label="New password"
                   bg-color="grey-9"
                   label-color="light-blue-14"
                   style="margin-bottom: 10px; min-width: 200px"
                   standout>

          </q-input>
          <q-input v-model="passwordConfirm"
                   label="Confirm password"
                   standout
                   bg-color="grey-9"
                   label-color="light-blue-14"
                   style="margin-bottom: 10px; width: 300px">

          </q-input>
          <q-card-actions>
            <q-btn color="grey-9"
                   text-color="light-blue-14"
                   @click="resetPassword"
                   style="margin: 0 auto; width: 80px"
                   label="Send">

            </q-btn>
          </q-card-actions>

        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
//import { getAccountService } from '@/services/accountService'

export default {
  name: 'passwordRecovery',
  data () {
    return {
      card: false,
      eMail: '',
      password: '',
      passwordConfirm: '',
      token: this.$route.query.token
    }
  },
  methods: {
    resetPassword() {

    }
  }
}
</script>

<style scoped>

</style>

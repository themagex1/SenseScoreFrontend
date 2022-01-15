<template>
  <div class="content">
    <span @click="card = true" style="cursor: pointer">
      Forgot your password?
    </span>
    <q-dialog v-model="card" class="justify-center dialog" style="background-color: rgba(0, 0, 0, 0.8)">
      <q-card class="flex flex-center column bg-light-blue-14 popUp">
        <h2 style="font-family: 'News of the World'" class="text-grey-9"> Password Recovery</h2>
        <q-form>
          <q-input v-model="eMail"
                   label="E-mail"
                   bg-color="grey-9"
                   label-color="light-blue-14">

          </q-input>
          <q-input v-model="password"
                   label="New password"
                   bg-color="grey-9"
                   label-color="light-blue-14">

          </q-input>
          <q-input v-model="passwordConfirm"
                   label="Confirm password"
                   standout
                   bg-color="grey-9"
                   label-color="light-blue-14">

          </q-input>
          <q-btn color="grey-9"
                 text-color="light-blue-14"
                 @click="resetPassword">
            Send
          </q-btn>
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
    // async resetPassword () {
    //   let result = await getAccountService().resetPassword(this.eMail, this.token, this.password)
    //   if(result){
    //     await this.$router.push({
    //       path: '/'
    //     })
    //   }
    // }
  }
}
</script>

<style scoped>

</style>

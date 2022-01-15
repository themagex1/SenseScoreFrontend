<template>
  <MainPageHeader/>

  <q-page-container>

    <q-card>
      <q-card-section>
        <q-form>
          <q-input class=""
                   label="Login"
                   name="login"
                   v-model="username"

          />
          <q-input class=""
                   label="Password"
                   name="password"

                   type="password"
                   v-model="password"
          />
        </q-form>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-actions>
        <q-btn to="/signup" outline>Sign Up</q-btn>
        <q-space></q-space>
        <q-btn @click.prevent="login()">
          Login
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page-container>


</template>

<script>
import MainPageHeader from '@/components/MainPageHeader'

export default {
  name: 'Login',
  components: { MainPageHeader },
  data () {
    return {
      username: '',
      password: '',
      info: '',
      error: false
    }
  },
  methods: {
     async login() {
       await this.$store.dispatch('auth/login', {
        login: this.username,
        passHash: this.password
      })
      .then(() => {
        //
      })
       localStorage.getItem('isAuthenticated')
      if(localStorage.getItem('isAuthenticated') === 'false'){
        await this.$router.push({path: '/preferencesSports'})
      }
      else {
        await this.$router.push({path: '/home'})
      }



    }
  }
}
</script>

<style scoped>

</style>

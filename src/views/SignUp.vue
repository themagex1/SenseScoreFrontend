<template>
  <MainPageHeader/>
  <q-page-container>
    <q-card class="">
      <q-card-section>
        <q-form>

          <q-input class=""
                   label="Login"
                   name="login"
                   v-model="username"
                   :rules="[rules.required]"
          />

          <q-input class=""
                   label="E-mail"
                   name="email"
                   v-model="email"
                   :rules="[rules.required, rules.email]"

          />

          <q-input class=""
                   label="Password"
                   name="password"
                   :rules="[rules.required]"
                   type="password"
                   v-model="password"
          />
          <q-input class=""
                   label="Confirm password"
                   name="password"
                   :rules="[rules.required]"
                   type="password"
                   v-model="confirm_password"
                   :error="!valid()"
          />
        </q-form>
      </q-card-section>
      <q-separator/>
      <q-card-actions>
        <q-btn to="/login" outline>Login</q-btn>
        <q-space></q-space>
        <q-btn @click.prevent="register()">
          Register
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page-container>
</template>

<script>
import MainPageHeader from '@/components/MainPageHeader'

export default {
  name: 'SignUp',
  components: {
    MainPageHeader
  },
  data () {
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
    register () {
      if (this.valid) {
        this.$store.dispatch('auth/register', {
          username: this.username,
          eMail: this.email,
          passHash: this.password
        }).then(() => {
          this.$router.push({ path: '/login' })
        })

      }

    },
    valid () {
      this.password === this.confirm_password
    }
  }
}
</script>

<style scoped>

</style>

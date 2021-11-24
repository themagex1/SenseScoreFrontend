import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import GAuth from 'vue3-google-oauth2'

const gauthOption = {
    clientId: '32514753217-v7buuqeo4375k1aq1fg3fg2akps6cjjl.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    fetch_basic_profile: true
}




createApp(App).use(router).use(Quasar, quasarUserOptions).use(GAuth, gauthOption).mount('#app')
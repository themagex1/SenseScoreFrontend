import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import GAuth from 'vue3-google-oauth2'
import store from './stores'
import setupInterceptors from './services/setupInterceptors';
import Vuex from 'vuex';


const gauthOption = {
  clientId: '32514753217-v7buuqeo4375k1aq1fg3fg2akps6cjjl.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}

setupInterceptors(store)

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/FAQ', 'contact', '/opinions', '/about', '/contact']
  const authRequired = !publicPages.includes(to.path)
  const privates = publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('accessToken')

  if (authRequired && !loggedIn) {
    alert('You must sign in')
    next('/')
  } else if (privates && loggedIn) {
    next('/home')
  } else {
    next()
  }

})

createApp(App).use(router).use(Quasar, quasarUserOptions).use(Vuex)
  .use(GAuth, gauthOption)
  .use(store)
  .mount('#app')

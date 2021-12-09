import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MainPage',

    component: () => import(/* webpackChunkName: "about" */ '../views/MainPage.vue')
  },
  {
    path: '/login',
    name: 'loginPopUp',

    component: () => import(/* webpackChunkName: "about" */ '../components/loginPopUp')
  },
  {
    path: '/home',
    name: 'home',

    component: () => import(/* webpackChunkName: "about" */ '../views/home'),
  },
  {
    path: '/all-events',
    name: 'allEvents',

    component: () => import(/* webpackChunkName: "about" */ '../views/AllEvents'),
  },
  {
    path: '/coupons',
    name: 'Coupons',

    component: () => import(/* webpackChunkName: "about" */ '../views/Coupons'),
  },
  {
    path: '/add-favourites',
    name: 'addFavourites',

    component: () => import(/* webpackChunkName: "about" */ '../views/AddFavourites'),
  },
  {
    path: '/preferences',
    name: 'preferencesPage',
    component: () => import('../views/preferencesPage')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

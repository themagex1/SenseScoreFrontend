import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MainPage',

    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/login',
    name: 'loginPopUp',

    component: () => import('../components/loginPopUp')
  },
  {
    path: '/home',
    name: 'home',

    component: () => import('../views/home'),
  },
  {
    path: '/all-events',
    name: 'allEvents',

    component: () => import('../views/AllEvents'),
  },
  {
    path: '/coupons',
    name: 'Coupons',

    component: () => import('../views/Coupons'),
  },
  {
    path: '/ranks',
    name: 'Ranks',

    component: () => import('../views/Ranks'),
  },
  {
    path: '/add-favourites',
    name: 'addFavourites',

    component: () => import('../views/AddFavourites'),
  },
  {
    path: '/preferencesSports',
    name: 'preferencesSports',
    component: () => import('../views/preferencesSports')
  },
  {
    path: '/about',
    name: 'aboutUs',
    component: () => import('../views/About')
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: () => import('../views/FAQ')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact')
  },
  {
    path: '/opinions',
    name: 'Opinions',
    component: () => import('../views/Opinions')
  },
  {
    path: '/preferencesOther',
    name: 'preferencesOther',
    component: () => import('../views/preferencesOther')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

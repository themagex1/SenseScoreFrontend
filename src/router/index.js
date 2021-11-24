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
    path: '/add-favourites',
    name: 'addFavourites',

    component: () => import(/* webpackChunkName: "about" */ '../views/AddFavourites'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

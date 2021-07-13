import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/home-page.vue'
import aboutPage from '../views/about-page'
import bookDetails from '../views/book-details'
import bookApp from '../views/book-app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/about',
    component: aboutPage
  },
  {
    path: '/book',
    component: bookApp
  },
  {
    path: '/book/:id',
    component: bookDetails
  }
]

const router = new VueRouter({
  routes
})

export default router

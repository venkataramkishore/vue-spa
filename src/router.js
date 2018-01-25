import Vue from 'vue'
import VueRouter from 'vue-router'
// For load early
import Home from './home/Home.vue'
import Login from './login/Login.vue'
import Category from './theme/category/Category.vue'
import NotFound from './not-found/NotFound.vue'

// For load lazy
// const Login = () => System.import('./login/Login.vue')
// const Category = () => System.import('./theme/category/Category.vue')
// const NotFound = () => System.import('./not-found/NotFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({

  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/home', component: Home
    },
    {
      path: '/login', component: Login
    },
    {
      path: '/category/:id', component: Category
    },
    {
      path: '/', redirect: '/home'
    },
    {
      path: '*', component: NotFound
    }
  ]
})

export default router

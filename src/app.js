import Vue from 'vue'
import store from './vue-store/index'
import AppLayout from './theme/Layout.vue'
import router from './router'

const app = new Vue({
  router,
  // render: h => h.render(AppLayout)
  ...AppLayout,
  store
})

export {app, router, store}

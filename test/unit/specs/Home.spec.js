import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../../../src/home/Home.vue'

describe('Home.vue', () => {
  it('should show no page found', () => {
    Vue.use(VueRouter)
    const router = new VueRouter({
      routes: [
        {
          path: '/', component: Home
        }
      ]
    })
    const comp = new Vue({
      el: document.createElement('div'),
      router,
      render: h => h('router-view')
    })
    expect(comp.$el.innerHTML).to.equal('Welcome to vue.js demo app')
  })
})

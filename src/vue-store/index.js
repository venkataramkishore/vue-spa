import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../services/app.service'
import postsModule from './post-module'

Vue.use(Vuex)

const state = {
  isAuthenticated: false,
  profile: {}
}

const store = new Vuex.Store({
  modules: {
    postsModule
  },
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    getProfile: () => {
      return state.profile
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        appService.login(credentials)
          .then(data => {
            context.commit('login', data)
            context.commit('profile')
            resolve(data)
          }).catch(() => {
            window.alert('Unable to login.')
          })
      })
    },
    profile (context) {
      context.commit('profile')
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        window.localStorage.clear()
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      console.log(token)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token.token)
        window.localStorage.setItem('tokenExpiration', token.expiration)
      }
      state.isAuthenticated = true
    },
    profile (state) {
      return new Promise((resolve, reject) => {
        appService.getProfile()
          .then(response => {
            console.log(response)
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('profile', response)
            }
            state.profile = response
            resolve(state.profile)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    }
  }

})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    let expiration = window.localStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    console.log(`${expiration}, ${unixTimestamp}`)
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      state.isAuthenticated = true
    }
  })
}
export default store

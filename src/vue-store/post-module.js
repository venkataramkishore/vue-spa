import appService from '../services/app.service'

const defaultState = {
  posts: [],
  categoryId: 0
}

const inBrowser = typeof window !== 'undefined'
const state = (inBrowser && window._INITIAL_STATE_) ? window._INITIAL_STATE_.postsModule : defaultState

const actions = {
  updateCategoryId (context, categoryId) {
    context.commit('updateCategoryId', categoryId)
  },
  getPosts (context) {
    context.commit('getPosts')
  }
}

const mutations = {
  updateCategoryId (state, categoryId) {
    state.categoryId = categoryId
    console.log(`Category updated: ${state.categoryId}`)
  },
  getPosts (state, posts) {
    return new Promise(() => {
      appService.getPosts(state.categoryId)
        .then(resPosts => {
          state.posts = resPosts
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}

const getters = {
  posts: state => state.posts
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

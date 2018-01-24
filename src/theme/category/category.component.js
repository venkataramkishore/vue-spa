import Posts from '../posts/Posts.vue'
import { mapGetters } from 'vuex'

const fetchInitialData = (store, route) => {
  let categoryId = 2
  if (route.params.id === 'mobile') {
    categoryId = 11
  }
  store.dispatch('postsModule/updateCategoryId', categoryId)
  return store.dispatch('postsModule/getPosts')
}
export default {
  asyncData (store, route) {
    return fetchInitialData(store, route)
  },
  components: {
    'app-post': Posts
  },
  computed: {
    ...mapGetters('postsModule', ['posts'])
  },
  methods: {
    loadPosts () {
      fetchInitialData(this.$store, this.$route)
    }
  },
  watcher: {
    '$route' (to, from) {
      this.loadPosts()
    }
  },
  created () {
    this.loadPosts()
  }
}

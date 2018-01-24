import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    login () {
      this.$store.dispatch('login', {username: this.username, password: this.password})
        .then(data => {
          this.resetUser()
          this.$store.dispatch('profile')
        })
    },
    resetUser () {
      this.username = ''
      this.password = ''
    }
  }
}

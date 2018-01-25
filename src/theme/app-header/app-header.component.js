import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      navItems: [
        { id: 'home', name: 'Home', route: '/home', visible: true },
        { id: 'front-end', name: 'Front-end', route: '/category/front-end', visible: true },
        { id: 'mobile', name: 'Mobile', route: '/category/mobile', visible: true },
        { id: 'sections', name: 'Sections', route: '/sections', visible: true },
        { id: 'login', name: 'Login', route: '/login', visible: true }
      ],
      userNavItems: [
        {
          id: 'user',
          name: 'User',
          route: '/user',
          visible: true,
          isdropdown: true,
          dropdown: [
            { id: 'username', name: 'Profile', route: '/profile', visible: true, isdropdown: false },
            { id: 'changepwd', name: 'Change Password', route: '/changepwd', visible: true, isdropdown: false },
            { id: 'logout', name: 'Logout', route: '/logout', visible: true, isdropdown: false }
          ]
        },
        { id: 'settings', name: 'Settings', route: '/settings', visible: true, isdropdown: false, dropdown: [] }
      ]
    }
  },
  methods: {
    logout: 'logout'
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getProfile'])
  }
}

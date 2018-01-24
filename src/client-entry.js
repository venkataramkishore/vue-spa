import { app, router } from './app'

router.onReady(() => {
  app.$mount('#vueSPAApp')
})

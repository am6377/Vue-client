import Vue from 'vue'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGoogle,
  faFacebook,
  faReddit,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGoogle, faFacebook, faReddit, faLinkedin)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (window.Cypress) {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// If running inside Cypress...
if (window.Cypress) {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}

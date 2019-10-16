import Vue from 'vue'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'
import vuexI18n from 'vuex-i18n/dist/vuex-i18n.cjs'
import VueMaterial from 'vue-material'
import { translationsEn } from './assets/lang/en'
import { translationsDe } from './assets/lang/de'
require('./icons/index.css')
require('./assets/style/vue-material.css')
require('./assets/style/style.css')
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(vuexI18n.plugin, store)
Vue.use(VueMaterial)


Vue.material.registerTheme('default', {
  primary: 'white',
  accent: 'green',
  warn: 'red',
  background: {
    color: 'light-blue',
    hue: 900
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

Vue.i18n.add('en', translationsEn)
Vue.i18n.add('de', translationsDe)
Vue.i18n.set(store.getters.lang)
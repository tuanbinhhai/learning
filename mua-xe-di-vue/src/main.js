import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import login from './components/Login/login'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import pagination from "vuejs-uib-pagination";


library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(pagination);
Vue.component('login', login)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  render: h => h(App, login)
}).$mount('#app')

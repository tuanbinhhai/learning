import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import login from './components/Login/login'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.component('login', login)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  render: h => h(App, login)
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import login from '../components/Login/login.vue'
import signup from '../components/Signup/signup.vue'
import Review from '../components/Review/Review.vue'
import 'bootstrap'
import pagination from 'vuejs-uib-pagination'

Vue.use(pagination)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/review',
      name: 'Review',
      component: Review,
      props: true
    }
  ],
  mode: 'history'
})

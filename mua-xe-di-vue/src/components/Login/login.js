// import Signup from '../Signup/signup.vue'
import router from '../../router/'
import auth from '../../auth/'
import Vue from 'vue'

export default {
  name: 'login',

  components: {
    // Signup
  },
  data () {
    return {
      signin: {
        username: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {
    checkAuth: function () {
      if (auth.user.authenticated) {
        router.push({name: 'Userinfo'})
        this.ischangeinfo = true
      } else router.push({name: 'login'})
    },

    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submit()
          return
        }
        // alert('Please check your form')
      })
    },
    submit () {
      var credentials = {
        username: this.signin.username,
        password: this.signin.password
      }
      auth.login(this, credentials)
    },
    disabled_error () {
      this.error = false
    }
  },
  created () {
    this.checkAuth()
  }
}

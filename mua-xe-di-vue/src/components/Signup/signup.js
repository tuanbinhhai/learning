import login from '../Login/login.vue'
import auth from '../../auth/'
import router from '../../router/'
export default {
  name: 'signup',
  components: {
    'login': login
  },
  data () {
    return {
      signup: {
        email: '',
        password: '',
        username: '',
        phone: '',
        location: ''
      },
      error: ''
    }
  },
  methods: {
    checkAuth: function () {
      if (auth.user.authenticated) {
        router.push({name: 'Userinfo'})
        this.ischangeinfo = true
      } else router.push({name: 'signup'})
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submit()
          return
        }
      })
    },
    submit: function () {
      var credentials = {
        email: this.signup.email,
        password: this.signup.password,
        username: this.signup.username,
        phone: this.signup.phonenumber,
        location: this.signup.location
      }
      auth.signup(this, credentials, {emulateJSON: true})
    },
    disabled_error () {
      this.error = false
    }
  },
  created () {
    this.checkAuth()
  }

}

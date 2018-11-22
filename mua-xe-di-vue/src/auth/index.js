// URL and endpoint constants
// const API_URL = 'http://localhost:3000/'
const API_URL = 'https://timxengon.herokuapp.com/'
// const API_URL = 'https://timxengon.herokuapp.com/'
const SOCIAL_LOGIN_URL = API_URL + 'social'
const LOGIN_URL = API_URL + 'signin'
const SIGNUP_URL = API_URL + 'signup'
const SIGNOUT_URL = API_URL + 'signout'
import router from '../router/'
export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },
  error: '',
  avatardefault: 'http://bootdey.com/img/Content/user_1.jpg',
  // Send a request to the login URL and save the returned JWT
  login (context, creds) {
    context.$http.post(LOGIN_URL, creds)
      .then(response => {
        localStorage.setItem('authentoken', response.body.authentoken)
        localStorage.setItem('username', response.body.username)
        localStorage.setItem('userId', response.body.id)
        if (response.body.avatar === null) {
          localStorage.setItem('userava', this.avatardefault)
        } else {
          localStorage.setItem('userava', response.body.avatar)
        }
        this.user.authenticated = true
        // router.go(-1)
        // router.push({name: 'Homepage'})
        history.go(-1)
        setTimeout(function () {
          window.location.reload()
        }, 100)
      }).catch((err) => {
        context.error = err.body.errors
      })
  },
  signup (context, creds) {
    context.$http.post(SIGNUP_URL, creds)
      .then(response => {
        localStorage.setItem('authentoken', response.body.authentoken)
        localStorage.setItem('username', response.body.username)
        localStorage.setItem('userId', response.body.id)
        localStorage.setItem('userava', this.avatardefault)
        this.user.authenticated = true
        router.push({name: 'Homepage'})
        location.reload()
      }).catch((err) => {
        context.error = err.body.errors
      })
  },

  // To log out, we just need to remove the token
  logout (context, creds) {
    context.$http.post(SIGNOUT_URL, creds)
      .then(response => {
        if (response.body.result) {
          localStorage.removeItem('authentoken')
          localStorage.removeItem('username')
          localStorage.removeItem('userId')
          localStorage.removeItem('query')
          localStorage.removeItem('userava')
          this.user.authenticated = false
          router.push({name: 'Homepage'})
        }
      })
  },
  checkAuth () {
    var jwt = localStorage.getItem('authentoken')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}

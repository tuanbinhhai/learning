<template>
  <div id="navigator">
    <nav class="navbar navbar-expand-lg navbar-light">
  <router-link :to="'/'" class="navbar-brand" href="#"><img src="../assets/images/logo.png" /></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link :to="'/'" exact class="nav-link nav-text" active-class="active" data-toggle="tab" role="tab">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Compare' }" exact class="nav-link nav-text" active-class="active" data-toggle="tab" role="tab">Compare</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'Review' }" exact class="nav-link nav-text" active-class="active" data-toggle="tab" role="tab">Review</router-link>
      </li>
      <li class="nav-item" @click="checkAuth_beforecontinue()">
        <router-link :to="{ name: 'SellCar' }" exact class="nav-link nav-text" active-class="active" data-toggle="tab" role="tab">Sell</router-link>
      </li>
      <!-- <li v-if="userstatus.authenticated && !adminstatus.status" class="nav-item">
       <img v-bind:src="userava" class="img-avatar" id="useravar" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       <div id="userinfo" class="dropdown-menu">
         <a class="dropdown-item" @click="routeruserinfo()">{{this.JsonContent.userinfo}}</a>
         <a class="dropdown-item" @click="routerusersellcar()">{{this.JsonContent.sellinglist}}</a>
         <a class="dropdown-item" @click="routeruserdraftcar()">{{this.JsonContent.draftlist}}</a>
         <a class="dropdown-item" @click="routerusersavecar()">{{this.JsonContent.savedlist}}</a>
         <a <button class="nav-link signout-btn" v-if="userstatus.authenticated" @click="logout">{{this.JsonContent.buttonlogout}}</button></a>
       </div>
     </li> -->
      <li class="nav-item">
        <router-link :to="{ name: 'login' }" class="nav-link signup-btn">Login</router-link>
      </li>
    </ul>

  </div>
</nav>
  </div>
</template>

<script>
// import auth from '../auth/'
import router from '../router/'

export default {
  name: 'navigation',
  data () {
    return {
      userava: localStorage.getItem('userava'),
      userinfo: true,
      usersavecar: true,
      user_sell_car: true,
      user_draft_car: true,
      posLatitude: 0,
      posLongitude: 0,
      localstorageCity: '',
      // userstatus: auth.user,
      // adminstatus: auth.admin,
      signout: {
        username: '',
        authentoken: ''
      }
    }
  },
  methods: {
    // checkAuth_beforecontinue: function () {
    //   if (auth.user.authenticated) {
    //     router.push({name: 'SellCar'})
    //   } else {
    //     router.push({name: 'login'})
    //   }
    // },
    // logout () {
    //   var credentials = {
    //     username: localStorage.getItem('username'),
    //     authentoken: localStorage.getItem('authentoken')
    //   }
    //   auth.logout(this, credentials)
    // }
  },
}
</script>

<style scoped>
#navigator {
  background: #2b3977;
}
.nav-text {
  color: #ffffff !important;
}
.nav-text:focus, .nav-text:hover {
  color: #f6a83c !important;
}
.active {
  color: #f6a83c !important;
}
#navbarDropdownMenuLink{
  background: #ffffff;
  color: #000000;
  border:1px solid #00a3cb;
  text-shadow: none;
  }
.mr-auto {
  margin-left: 2%;
}
.ml-auto {
  margin-right: 2%;
}
.signup-btn {
  background: #f49c20;
  border-radius:3px;
  color: #ffffff !important;
}
.signup-btn:focus, .signup-btn:hover {
  color: rgba(0,0,0,.7) !important;
}
#navigator .signout-btn {
  background: #f49c20;
  border-radius:3px;
  border: none;
  width: 80%;
  color: white;
  margin-left: 10%;
}
#navigator .signout-btn:hover {
  color: rgba(0,0,0,.7);
  cursor: pointer;
}
#useravar {
  border-radius: 50%;
  width: 35px;
}
#userinfo:hover, #useravar:hover {
  cursor: pointer;
}
@media (min-width: 992px) {
  .dropdown-menu {
    width: 13em;
  }
  #navbarDropdownMenuLink{
    width: 13em;
      position: relative;
  }
  #useravar {
    margin-left: 25%;
    border-radius: 50%;
    width: 35px;
  }
  #userinfo {
    margin-left: 82%;
    float: right;
    width: 15%;
  }
  #userinfo:hover, #useravar:hover {
    cursor: pointer;
  }
}
</style>

<template>
  <div id="login">

    <div class="wrapper">
      <div class="form-signin">
        <h2 class="form-signin-heading">Login</h2>
        <input v-model="signin.username" v-on:keyup.enter="validateBeforeSubmit"
               @focus="disabled_error()" type="text" class="form-control" name="username"
               placeholder="Username" v-validate="'required|min:6|max:120'"
               :class="{'input': true, 'is-danger': errors.has('username') }"
               data-vv-validate-on="blur" />

        <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>

        <input v-model="signin.password" v-on:keyup.enter="validateBeforeSubmit"
               @focus="disabled_error()" type="password" class="form-control" name="password"
               placeholder="Password" v-validate="'required|min:6|alpha_num|max:120'"
               :class="{'input': true, 'is-danger': errors.has('password') }"
               data-vv-validate-on="blur" />

        <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

        <p class="message" v-if="error">{{error}}</p>

        <button class="btn btn-lg btn-primgit sary btn-block btn-nomarl" @click="validateBeforeSubmit">login</button>

        <p id="changepage">Don't have account <router-link :to="{ name: 'signup' }">Signup</router-link></p>
      </div>
    </div>
  </div>
</template>
<script src="./login.js"></script>
<style src="./login.css" scoped></style>

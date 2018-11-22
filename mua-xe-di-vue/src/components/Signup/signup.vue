<template>
<div id="signup">
  <form @submit.prevent="validateBeforeSubmit" class="signup-form" action="index.html" method="">

         <h2>Signup</h2>
         <h6>Information clear will help you easy sell car</h6>

         <fieldset>
           <legend><span class="number"></span>Signup Information</legend>


           <label for="name">User name(*)</label>
            <input  v-model="signup.username"
                    @focus="disabled_error()"
                    type="text"
                    name="Username"
                    id="username"
                    placeholder="User name at least 6 characters"
                    v-validate="'required|min:6|alpha_num|max:120'" :class="{'input': true, 'is-danger': errors.has('Username') }"
                    data-vv-validate-on="blur">
            <span   v-show="errors.has('Username')"
                    class="help is-danger">{{ errors.first('Username') }}</span>


           <label for="password">Password(*)</label>
           <input   v-model="signup.password"
                    @focus="disabled_error()"
                    type="password"
                    id="password"
                    name="Password"
                    placeholder="Password at least 6 characters"
                    v-validate="'required|min:6|alpha_num|max:120'" :class="{'input': true, 'is-danger': errors.has('Password') }"
                    data-vv-validate-on="blur">

            <span   v-show="errors.has('Password')"
                    class="help is-danger">{{ errors.first('Password') }}</span>


         </fieldset>

         <fieldset>
           <legend><span class="number"></span>Personal Information</legend>
           <label for="number">Phone number</label>
           <input v-model="signup.phonenumber"
                  @focus="disabled_error()"
                  type="text"
                  id="phonenumber"
                  name="Phonenumber"
                  v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('Phonenumber') }"
                  data-vv-validate-on="blur">

          <span   v-show="errors.has('Phonenumber')"
                  class="help is-danger">{{ errors.first('Phonenumber') }}</span>

           <label for="mail">Email</label>
           <input v-model="signup.email"
                  @focus="disabled_error()"
                  type="text"
                  id="email"
                  name="Email"
                  v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('Email') }"
                  data-vv-validate-on="blur">

          <span   v-show="errors.has('Email')"
                  class="help is-danger">{{ errors.first('Email') }}</span>

           <label for="text">Address</label>
           <input v-model="signup.location"
                  @focus="disabled_error()"
                  type="text" id="location" name="Location"
                  v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('Location') }"
                  data-vv-validate-on="blur">

          <span   v-show="errors.has('Location')"
                  class="help is-danger">{{ errors.first('Location') }}</span>
         </fieldset>
         <p class="message" v-if="error">{{error}}</p>
         <button type="submit">Signup</button>
         <p id="changepage">Already have account <router-link :to="{ name: 'login' }">Login</router-link></p>
       </form>
</div>
</template>
<!-- Post sever -->
 <script src="./signup.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./signup.css"></style>

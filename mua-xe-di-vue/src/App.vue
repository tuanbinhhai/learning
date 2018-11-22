<template>
  <div id="app">
    <AppNav></AppNav>
    <router-view></router-view>
    <AppFooter></AppFooter>
  </div>
</template>

<script>

import AppFooter from './components/AppFooter.vue'
import AppNav from './components/AppNavigation.vue'

export default {
  name: 'app',
  components: {
    AppFooter,
    AppNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>

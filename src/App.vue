<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
import './assets/font/DIN-Regular/DIN-Regular.css'
import Paths from './model/paths.vue'
import Rects from './model/rects.vue'
import leftVue from './components/left/left'
import rightvue from './components/right/right'
export default {
  name: 'App',
  components: {
    Paths, Rects, leftVue, rightvue
  }
}
</script>

<style>
</style>

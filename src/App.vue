<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
window.events = require('./services/events')
export default {
  name: 'App'
}
</script>

<style>
</style>

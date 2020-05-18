<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = 'http://g.alicdn.com/sd/ncpc/nc.js?t=2015052012'
      document.body.appendChild(s)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  * {
    margin: 0 0;
    padding:  0 0;
  }
</style>

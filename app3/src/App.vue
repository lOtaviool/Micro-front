<template>
  <div id="app">
    <img alt="Vue logo" width="100" height="90" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png">
    <HelloWorld msg="Bem vindo ao seu Vue.js"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
let user = {}

const app = async ()=>{
  await window.addEventListener('userVue', (event) => {
      user = event.detail;
      console.log('USER VUE', user)
  });
}

app();

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: 300px
}
</style>

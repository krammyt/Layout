<template>
  <div id="app">
    <iv-title-bar/>
    <iv-visualisation>
    <Sidebar position="left">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum error quam cupiditate saepe deleniti. Natus nobis inventore asperiores repudiandae quos.
    </Sidebar>
    </iv-visualisation>
  </div>
</template>

<script>
console.log("hello");
import Sidebar from './components/Sidebar/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Sidebar
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
}
</style>

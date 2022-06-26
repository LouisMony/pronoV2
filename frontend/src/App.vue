<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>

import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  margin-top:60px;
  background: #0F0F0F;
  color: white;

}
</style>

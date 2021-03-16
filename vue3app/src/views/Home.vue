<template>
  <div class="home">
        vue3 app page
    <img alt="Vue logo" src="../assets/logo.png">
    <div @click="goHome">去app1</div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  methods:{
    goHome(){
      this.$router.push('/app1');
    }
  }
  // components: {
  //   HelloWorld
  // }
})
</script>

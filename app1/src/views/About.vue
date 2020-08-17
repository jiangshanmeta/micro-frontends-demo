<template>
  <div class="about">
    <h1>app1 about</h1>
    <button @click="handleClick">跳转到app2 </button>
  </div>
</template>

<script>
export default{
  methods:{
    handleClick(){
      this.$router.push('/app2')
    }
  },
}
</script>

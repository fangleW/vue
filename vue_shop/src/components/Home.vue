<template>
  <div class="home">
    <a-button type="info" @click="logout">退出</a-button>
  </div>
</template>
 
<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>
 
<style scoped lang = "scss">
</style>
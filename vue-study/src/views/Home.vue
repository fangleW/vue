<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <children1 msg="welcome to vue.js" @add="cartAdd($event)"></children1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import children1 from '@/components/communication/children1.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    children1
  },
  methods:{
    cartAdd(val){
      console.log(val)
    }
  }
}
</script>

<template>
  <div class="Addition">
    <!-- <h3>当前最新的count值为:{{ $store.state.count }}</h3> -->
    <h3>当前最新的count值为:{{ count }}</h3>
    <button @click="Addition">+1</button>
    <button @click="AdditionN">+N</button>
    <button @click="Additionasync">+1 Async</button>
    <button @click="AdditionNasync">+N Async</button>
  </div>
</template>
 
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Addition',
  data() {
    return {}
  },
  computed: {
    ...mapState(['count']),
  },
  methods: {
    Addition() {
      //只有mutation中的才能触发
      this.$store.commit('add')
    },
    AdditionN() {
      //commit的作用就是调用某个mutation
      this.$store.commit('addN', 5)
    },
    Additionasync() {
      this.$store.dispatch('addAsync')
    },
    AdditionNasync() {
      this.$store.dispatch('addNasync', 50)
    },
  },
}
</script>
 
<style scoped lang = "scss">
</style>
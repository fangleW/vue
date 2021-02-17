<template>
  <div class="Subtraction">
    <!-- <h3>当前最新的count值为:{{ $store.state.count }}</h3> -->
    <h3>当前最新的count值为:{{ count }}</h3>
    <h3>{{ showNum }}</h3>
    <button @click="Subtraction">-1</button>
    <button @click="SubtractionN">-N</button>
    <button @click="subAsync">-1 Async</button>
    <button @click="subNasync(5)">-N Async</button>
    <input type="text" ref="input" /><button @click="add">添加</button>
    <ul>
      <li v-for="(item, key) in menuList" :key="key">{{ item }}</li>
    </ul>
  </div>
</template>
 
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'Subtraction',
  data() {
    return {}
  },
  computed: {
    ...mapState(['count', 'menuList']),
    ...mapGetters(['showNum']),
  },
  methods: {
    //直接用mapMutations解构store里面的方法直接在methods使用
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subNasync']),
    Subtraction() {
      this.sub()
    },
    SubtractionN() {
      this.subN(5)
    },
    add() {
      this.$store.dispatch('addMenuAsync', this.$refs.input.value),
        (this.$refs.input.value = '')
    },
  },
}
</script>
 
<style scoped lang = "scss">
</style>
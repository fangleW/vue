<template>
  <div>
    <h1>props传值:{{ msg }}</h1>
    <button @click="add(good)">按钮</button>
  </div>
</template>

<script>
export default {
  name: "children1",
  props: {
    msg: {
      type: String,
      default: "hello word",
    },
  },
  data() {
    return {
      good: "Hello",
    }
  },
  methods: {
    add() {
      this.$emit("add",'子给父传值，自定义事件 '+this.good);
      this.$bus.$emit('foo','事件总线传值')
    },
  },
};
</script>
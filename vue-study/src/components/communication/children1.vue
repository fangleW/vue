<template>
<div>
  <h1>props传值:{{msg}}</h1>
  <button @click="add(good)"></button>
</div>
</template>

<script>
export default {
  name:'children1',
  props:{
    msg:{
      type:String,
      default:'hello word'
    }
  },
  data(){
    good:'Hello'
  },
  methods:{
    add(val){
      this.$emit('add',val)
    }
  }
}
</script>
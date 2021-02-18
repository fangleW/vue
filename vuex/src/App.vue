<template>
  <div class="APP">
    <A />
    <h1>------------------</h1>
    <B />
    <h1>--------------------------</h1>
    <todo></todo>
  </div>
</template>
 
<script>
import A from './components/Addition'
import B from './components/Subtraction'
import todo from './components/todo'
export default {
  name: 'APP',
  data() {
    return {}
  },
  components: {
    A,
    B,
    todo,
  },
}
</script>
 
<style scoped lang = "scss">
</style>
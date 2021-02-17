<template>
  <div class="APP">
    <A />
    <h1>------------------</h1>
    <B />
  </div>
</template>
 
<script>
import A from './components/Addition'
import B from './components/Subtraction'
export default {
  name: 'APP',
  data() {
    return {}
  },
  components: {
    A,
    B,
  },
}
</script>
 
<style scoped lang = "scss">
</style>
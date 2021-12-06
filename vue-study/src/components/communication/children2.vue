<template>
  <div class="children2">1 2 </div>
</template>
 
<script>
export default {
  name: "children2",
  data() {
    return {
      // a: this.$bus.$emit("foo"),
    };
  },
  computed: {
    value() {
      return this.$bus.$emit("foo");
    },
  },
  mounted(){
    this.$bus.$on("foo",foo=>{console.log(foo)})
  },
  methods: {},
};
</script>
 
<style scoped lang = "scss">
</style>
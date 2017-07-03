<template>
  <input v-model="searchInput" debounce="300" v-on:keyup.13="search">
</template>

<script>
export default {
  data() {
    return {
      searchInput: ''
    }
  },
  mounted() {
    let el = this.$el;
    el.focus();
  },
  methods() {
    return {
      search: ()=>{
        return 'hi';
      }
    }
  }
}
</script>
<style lang="scss">
  input {
    padding: 5px;
    width: 100%;
    position: relative;
    font-size: 24px;
    &:focus {
      outline: 0;
    }
  }
</style>
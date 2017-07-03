<template>
  <div>
    <input v-model="searchInput" debounce="300" v-on:keyup.13="search">
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: ''
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
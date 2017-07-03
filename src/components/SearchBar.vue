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
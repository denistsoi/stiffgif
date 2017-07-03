<template>
  <div v-if="online">
    <div v-if="!online"><h1>stiffgif is currently offline</h1></div>
    <div v-show="selection" transition="selected"><h1>Gif has been copied</h1></div>
  </div>
</template>

<script>
export default {
  props: ['online'],
  data() {
    return {
      selection: ''
    }
  }
}
</script>
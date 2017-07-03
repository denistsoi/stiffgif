<template>
  <footer>
    <div v-if="online">
      <div v-show="selection" transition="selected"><h1>Gif has been copied</h1></div>
    </div>
    <div v-if="!online"><h1>stiffgif is currently offline</h1></div>
  </footer>
</template>

<script>
export default {
  props: ['online', 'selection'],
  created() {
    console.log(this);
  }
}
</script>
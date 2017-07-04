<template>
  <footer>
    <div v-if="online">
      <transition name="fade">
        <div class="selected" v-show="selection"><h1>Gif has been copied</h1></div>
      </transition>
    </div>    
    
    
    <div v-if="!online"><h1>stiffgif is currently offline</h1></div>
  </footer>
</template>

<script>
export default {
  props: ['online', 'selection'],
  created() {
    // console.log(this.$store.state);
  }
}
</script>
<style>
.selected {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background-color: #2980b9;
  color: #ecf0f1;
}
.fade-enter-active {
  animation: fade-in 1.8s ease-in-out 1;
} 
.fade-leave-active {
  animation: fade-in 1.8s reverse;  
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

footer {
  user-select: none;
  pointer-events: none;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
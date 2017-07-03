<template>
  <div id="content" v-if="online">
    <ul class="giphy">
      <li v-for="gif in giphy" >
        <img src="../loading_spinner.gif" v-img="gif.images.fixed_height_small.url" v-on:click="copyToClipboard"/>
      </li>
      <li v-if="!giphy.length">
        No Results Returned from Giphy
      </li>
    </ul>
    <ul class="popkey">
      <li v-for="gif in popkey">
        <img src="../loading_spinner.gif" v-img="gif.images.small.gif" v-on:click="copyToClipboard"/>
      </li>
      <li v-if="!popkey.length">
        No Results Returned from Popkey
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['online']
}
</script>

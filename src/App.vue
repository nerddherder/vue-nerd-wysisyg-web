<template>
  <div id="app">
    <button class="button is-light" @click.prevent="isShow = true">Open Aside Right</button>
    <b-aside :is-show="isShow" title="Some Spice!" :show-footer="false"
      placement="right" :backdrop="true" @close="isShow = false">
      <vue-nerd-wysiwyg placeholder="tis a test"></vue-nerd-wysiwyg>
    </b-aside>
  </div>
</template>

<script>
  import VueNerdWysiwyg from './components/vue-nerd-wysiwyg.vue';

  export default {
    components: {
      VueNerdWysiwyg
    },
    data() {
      return {
        isShow: false
      };
    }
  };
</script>

<style>
</style>

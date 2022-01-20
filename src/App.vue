<template>
  <div id="utils-app">
    hahaha!
    <router-view />
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
export default {
  name: 'utils-app',
  created() {
    console.log('==', this.$urlToolkit.getUrls({ urlKey: 'ccUrl' }));
  },
};
</script>

<style lang="scss"></style>

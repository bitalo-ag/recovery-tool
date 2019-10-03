<template>
  <div id="app">
    <router-view />
    <lang-selector class="lang-selector" />
  </div>
</template>

<script>
  import LangSelector from './components/LangSelector.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'app',
    components: {
      LangSelector
    },
    methods: {
      ...mapActions({
        checkLocalStorage: 'checkLocalStorage'
      })
    },
    mounted () {
      this.checkLocalStorage(localStorage)
    }
  }
</script>

<style scoped>
  .lang-selector {
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>

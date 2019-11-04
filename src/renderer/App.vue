<template>
  <div id="app">
    <router-view />
    <lang-selector class="lang-selector" />
    <notification />
  </div>
</template>

<script>
  import LangSelector from './components/LangSelector.vue'
  import Notification from './components/Notification.vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'app',
    components: {
      LangSelector,
      Notification
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

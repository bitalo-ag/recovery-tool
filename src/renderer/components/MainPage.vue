<template>
  <div class="main-page">
    <div class="main-page__header">
      <img
        class="main-page__logo"
        src="../assets/images/logo.png"
      />
    </div>

    <div
      class="main-page__container"
    >
      <stepper />
    </div>
  </div>
</template>

<script>
  import Stepper from './Stepper.vue'

  export default {
    name: 'main-page',
    components: {
      Stepper
    }
  }
</script>

<style>
  .main-page {
    width: 60vw;
  }

  .main-page__logo {
    width: 200px;
    height: 70px !important;
  }

  .main-page__container {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-page__header {
    display: flex;
    justify-content: center;
  }
</style>

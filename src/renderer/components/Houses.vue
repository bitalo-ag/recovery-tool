<template>
  <div class="houses-list">
    <h1 v-if="homes !== 'no items'" class="md-subheading houses-list-title">Choose your House</h1>
    <md-list v-if="homes !== 'no items'">
      <md-list-item v-for="(item, index) in homes" :key="index" >
        <a :href="'http://' + item.href + '/login'">{{item.key}}</a>
      </md-list-item>
    </md-list>
    <div v-if="homes === 'no items'" class="empty-houses-container">
      <md-icon class="icon-emogi md-size-1x">sentiment_very_dissatisfied</md-icon>
      <span class="empty-houses">No houses found</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'houses',
    props: ['homes'],
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
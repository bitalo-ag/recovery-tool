<template>
  <div class="asset-selector">
    <div
      class="md-title align-center step-title"
    >
      Choose the desired currency.
    </div>

    <md-input-container
      class="input-container"
      v-if="assetsList.length"
    >
      <label>Currency</label>
      <md-select
        class="asset-select"
        v-model="asset"
      >
        <md-option
          v-for="(item, index) in assetsList"
          :value="item"
          :key="index"
        >
          {{ item | toUpper }}
        </md-option>
      </md-select>
    </md-input-container>
  </div>
</template>

<script>
  import serviceDash from '../../services/dash-service'

  export default {
    name: 'step-asset-selector',
    props: {
      backupData: {
        type: Object,
        require: true
      }
    },
    filters: {
      toUpper (value) {
        return value.toUpperCase()
      }
    },
    data () {
      return {
        asset: ''
      }
    },
    computed: {
      assetsList () {
        if (this.backupData) {
          return Object.keys(this.backupData)
        } else {
          return []
        }
      }
    },
    watch: {
      asset (val) {
        this.$emit('change', val)
      }
    }
  }
</script>

<style scoped>

</style>
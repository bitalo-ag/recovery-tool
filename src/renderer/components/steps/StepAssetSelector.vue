<template>
  <div
    v-if="assets.length"
    class=""
  >
    {{ assets }}
  </div>
</template>

<script>
  import serviceBtc from '../../services/btc-service'
  import service from '../../services/bitalo-service'

  export default {
    name: 'step-asset-selector',
    props: {
      formData: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        assets: []
      }
    },
    mounted () {
      this.assets = Object.keys(this.formData.backup)
      let a = service.decryptMasterKey(this.formData.backup.dash.key, this.formData.password, this.formData.backup.dash.salt)
      console.log(a)
      this.formData.backup.dash.master_key = a
      let b = serviceBtc.signHex(this.formData.backup.dash)
      console.log(b)
    }
  }
</script>

<style scoped></style>
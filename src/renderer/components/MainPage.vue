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
//  const serviceBtc = require('../services/btc-service')
  import serviceBtc from '../services/btc-service'
  import service from '../services/bitalo-service'
  import Stepper from './Stepper.vue'

  export default {
    name: 'main-page',
    components: {
      Stepper
    },
    data () {
      return {
        isDisplayForm: false,
        form: {
          hex: '',
          salt: '',
          masterKey: '',
          password: '',
          backupData: ''
        },
        text: '',
        currencies: null
      }
    },
    methods: {
      loadBackupData (e) {
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.readAsText(file, "UTF-8")
        reader.onload = evt => {
          this.form.backupData = JSON.parse(evt.target.result)
        }
        reader.onerror = evt => {
          console.error(evt)
        }
      },
      next () {
        this.isDisplayForm = true
      },
      submit () {
//        01121995Work
        this.currencies = Object.keys(this.form.backupData)
        console.log(this.form.backupData)
        let a = service.decryptMasterKey(this.form.backupData.dash.key, this.form.password, this.form.backupData.dash.salt)
        this.form.backupData.dash.master_key = a
        let b = serviceBtc.signHex(this.form.backupData.dash)
        console.log(b)
      }
    },
    computed: {
      disableSubmit () {
        return !this.form.backupData || !this.form.password
      }
    },
    mounted () {
//      console.log(serviceBtc.test())
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

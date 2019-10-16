<template>
  <div class="">
    {{ isValidFields }}
    <md-input-container
      class="input-container"
    >
      <label>Backup file</label>
      <md-file
        @change.native="loadBackupData"
      />
    </md-input-container>

    <md-input-container
      :class="(passwordErrorMessage.length) ? 'md-input-invalid' : 'input-container'"
    >
      <label>
        {{ $t('mainPage.form.password') }}
      </label>
      <md-input v-model="form.password" />
      <span class="md-error">{{ passwordErrorMessage }}</span>
    </md-input-container>
  </div>
</template>

<script>
  import service from '../../services/bitalo-service'
  import { mapActions } from 'vuex'
  const _ = require('lodash')

  const EVENTS = {
    submit: 'submit',
    valid: 'valid'
  }

  export default {
    name: 'step-form',
    data () {
      return {
        form: {
          password: '',
          backup: ''
        },
        timeoutCheckForm: 1000,
        passwordErrorMessage: ''
      }
    },
    methods: {
      ...mapActions({
        updateNotification: 'updateNotification'
      }),
      loadBackupData (e) {
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.readAsText(file, "UTF-8")
        reader.onload = evt => {
          this.form.backup = JSON.parse(evt.target.result)
        }
        reader.onerror = evt => {
          console.error(evt)
        }
      }
    },
    computed: {
      isValidFields () {
        return !!this.form.password && !!this.form.backup
      }
    },
    watch: {
      form: {
        deep: true,
        handler: _.debounce(function () {
          if (this.isValidFields) {
            try {
              this.assets = Object.keys(this.form.backup)
              let masterKey = service.decryptMasterKey(this.form.backup.dash.key, this.form.password, this.form.backup.dash.salt)
              if (!masterKey) {
//                this.updateNotification('Wrong password')
                this.passwordErrorMessage = 'Wrong password'
              } else {
                this.passwordErrorMessage = ''
                this.$emit(EVENTS.submit, { masterKey: masterKey })
                this.$emit(EVENTS.valid, { valid: true, form: this.form })
              }
            } catch (err) {
              console.error(err)
              this.updateNotification('Something password')
            }
          } else {
            this.$emit(EVENTS.valid, { valid: false, form: this.form })
          }
        }, this.timeoutCheckForm)
      }
    }
  }
</script>

<style scoped>

</style>
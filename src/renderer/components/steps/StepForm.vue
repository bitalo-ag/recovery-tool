<template>
  <div class="">
    <div
      class="md-title align-center step-title"
    >
      Fill in the fields with data from the email.
    </div>

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
  import serviceDash from '../../services/dash-service'
  import { mapActions } from 'vuex'
  const _ = require('lodash')

  const EVENTS = {
    change: 'change'
  }

  export default {
    name: 'step-form',
    data () {
      return {
        form: {
          backup: null,
          password: '',
        },
        timeoutCheckForm: 1000,
        passwordErrorMessage: '',
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
      },
      createMasterKey () {
        try {
          const assets = Object.keys(this.form.backup)
          assets.forEach(el => {
            let masterKey = service.decryptMasterKey(this.form.backup[el].key, this.form.password, this.form.backup[el].salt)
            this.form.backup[el].master_key = masterKey
            if (!masterKey) {
              this.passwordErrorMessage = 'Wrong password'
              throw { message: this.passwordErrorMessage, isDisplay: false }
            }
          })
          this.passwordErrorMessage = ''
          this.$emit(EVENTS.change, { valid: true, form: this.form })
        } catch (err) {
          console.error(err)
          this.$emit(EVENTS.change, { valid: false, form: this.form })
          if (!err.hasOwnProperty('isDisplay') && !err.isDisplay) {
            this.updateNotification('Something went wrong')
          }
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
            this.createMasterKey()
          } else {
            this.$emit(EVENTS.change, { valid: false, form: this.form })
          }
        }, this.timeoutCheckForm)
      }
    }
  }
</script>

<style scoped></style>
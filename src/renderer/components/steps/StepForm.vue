<template>
  <div class="">
    <div
      class="md-title align-center step-title"
    >
      {{ $t('form.title') }}
    </div>

    <md-input-container
      :class="(backupLoadError) ? 'md-input-invalid' : 'input-container'"
    >
      <label>
        {{ $t('form.backupLabel') }}
      </label>
      <md-file
        @change.native="loadBackupData"
      />
      <span class="md-error">
        {{ $t('form.backupErrorMessage') }}
      </span>
    </md-input-container>

    <md-input-container
      md-has-password
      :class="(passwordError) ? 'md-input-invalid' : 'input-container'"
    >
      <label>
        {{ $t('form.passwordLabel') }}
      </label>
      <md-input
        type="password"
        v-model="form.password"
      />
      <span class="md-error">
        {{ $t('form.passwordErrorMessage') }}
      </span>
    </md-input-container>
  </div>
</template>

<script>
  import service from '../../services/bitalo-service'
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
        timeoutCheckForm: 1500,
        passwordError: false,
        backupLoadError: false
      }
    },
    methods: {
      ...mapActions({
        updateNotification: 'updateNotification'
      }),
      loadBackupData (e) {
        try {
          let reader = new FileReader()
          let file = e.target.files[0]
          reader.readAsText(file, "UTF-8")
          reader.onload = evt => {
            if (file.type !== 'application/json') {
              this.backupLoadError = true
              return
            }
            this.backupLoadError = false
            this.form.backup = JSON.parse(evt.target.result)
          }
          reader.onerror = evt => {
            console.error(evt)
          }
        } catch (err) {
          this.updateNotification(this.$t('messages.warnSomething'))
        }
      },
      createMasterKey () {
        try {
          const assets = Object.keys(this.form.backup)
          assets.forEach(el => {
            let masterKey = service.decryptMasterKey(this.form.backup[el].key, this.form.password, this.form.backup[el].salt)
            this.form.backup[el].master_key = masterKey
            if (!masterKey) {
              this.passwordError = true
              throw { message: '', isDisplay: false }
            }
          })
          this.passwordError = false
          this.$emit(EVENTS.change, { valid: true, form: this.form })
        } catch (err) {
          console.error(err)
          this.$emit(EVENTS.change, { valid: false, form: this.form })
          if (!err.hasOwnProperty('isDisplay') && !err.isDisplay) {
            this.updateNotification(this.$t('messages.warnSomething'))
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
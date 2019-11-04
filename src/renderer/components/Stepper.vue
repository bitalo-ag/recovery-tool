<template>
  <div
    class="stepper"
  >
    <div
      class="stepper__step"
      v-if="currentStep === STEPS.welcome"
    >
      <div class="stepper__step-content">
        <step-welcome />
      </div>

      <div class="stepper__step-actions">
        <md-button
          class="md-primary md-raised stepper__btn-prev"
          :disabled="currentStep === STEPS.welcome"
          @click="prevStep"
        >
          {{ $t('stepper.btnBack') }}
        </md-button>

        <md-button
          class="md-primary md-raised stepper__btn-next"
          @click="nextStep"
        >
          {{ $t('stepper.btnNext') }}
        </md-button>
      </div>
    </div>

    <div
      class="stepper__step"
      v-if="currentStep === STEPS.form"
    >
      <div class="stepper__step-content">
        <step-form
          @change="validForm"
          :invalidMasterKey="invalidMasterKey"
        />
      </div>

      <div class="stepper__step-actions">
        <md-button
          class="md-primary md-raised stepper__btn-prev"
          @click="prevStep"
        >
          {{ $t('stepper.btnBack') }}
        </md-button>

        <md-button
          class="md-primary md-raised stepper__btn-next"
          :disabled="!disableForm"
          @click="submitForm"
        >
          {{ $t('stepper.btnNext') }}
        </md-button>
      </div>
    </div>

    <div
      class="stepper__step"
      v-if="currentStep === STEPS.assetSelector"
    >
      <div class="stepper__step-content">
        <step-asset-selector
          :backupData="formData.backup"
          @change="selectAsset"
        />
      </div>

      <div class="stepper__step-actions">
        <md-button
          class="md-primary md-raised stepper__btn-prev"
          @click="prevStep"
        >
          {{ $t('stepper.btnBack') }}
        </md-button>

        <md-button
          class="md-primary md-raised stepper__btn-next"
          @click="createSignature"
          :disabled="!selectedAsset"
        >
          {{ $t('stepper.btnNext') }}
        </md-button>
      </div>
    </div>

    <div
      class="stepper__step"
      v-if="currentStep === STEPS.exportHash"
    >
      <div class="stepper__step-content">
        <step-export
          :signature="signature"
        />
      </div>

      <div class="stepper__step-actions">
        <md-button
          class="md-primary md-raised stepper__btn-prev"
          @click="prevStep"
        >
          {{ $t('stepper.btnBack') }}
        </md-button>

        <md-button
          class="md-primary md-raised stepper__btn-next"
          @click="copySignature"
        >
          {{ $t('stepper.btnCopy') }}
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
  import StepWelcome from './steps/StepWelcome.vue'
  import StepForm from './steps/StepForm.vue'
  import StepAssetSelector from './steps/StepAssetSelector.vue'
  import StepExport from './steps/StepExport.vue'
  import service_dash from '../services/dash-service'
  import service_btc from '../services/btc-service'
  import service_bch from '../services/bch-service'
  import service from '../services/bitalo-service'
  import { mapActions } from 'vuex'

  const STEPS = {
    welcome: 'welcome',
    form: 'form',
    assetSelector: 'assetSelector',
    exportHash: 'exportHash'
  }

  export default {
    name: 'stepper',
    components: {
      StepWelcome,
      StepForm,
      StepAssetSelector,
      StepExport
    },
    data () {
      return {
        STEPS,
        currentStep: 'welcome',
        disableForm: false,
        formData: null,
        selectedAsset: '',
        signature: '',
        invalidMasterKey: false
      }
    },
    methods: {
      ...mapActions({
        updateNotification: 'updateNotification'
      }),
      createMasterKey () {
        try {
          const assets = Object.keys(this.formData.backup)
          assets.forEach(el => {
            let masterKey = service.decryptMasterKey(this.formData.backup[el].key, this.formData.password, this.formData.backup[el].salt)
            this.formData.backup[el].master_key = masterKey
            if (!masterKey) {
              this.invalidMasterKey = true
              throw { message: 'Invalid master key', isDisplay: false }
            }
          })
          this.invalidMasterKey = false
          this.nextStep()
        } catch (err) {
          console.error(err)
          this.invalidMasterKey = true
          if (!err.hasOwnProperty('isDisplay') && !err.isDisplay) {
            this.updateNotification(this.$t('messages.warnSomething'))
          }
        }
      },
      submitForm () {
        this.createMasterKey()
      },
      copySignature () {
        let testingCodeToCopy = document.querySelector('#testing-code')
        testingCodeToCopy.setAttribute('type', 'text')
        testingCodeToCopy.select()

        try {
          document.execCommand('copy')
        } catch (err) {
          console.error(err)
        }
        testingCodeToCopy.setAttribute('type', 'hidden')
        window.getSelection().removeAllRanges()
        this.updateNotification(this.$t('messages.copied'))
      },
      createSignature () {
        this.$nextTick(() => {
          try {
            switch (this.selectedAsset) {
              case 'btc':
                this.signature = service_btc.signHex(this.formData.backup[this.selectedAsset])
                break
              case 'bch':
                this.signature = service_bch.signHex(this.formData.backup[this.selectedAsset])
                break

              case 'dash':
                this.signature = service_dash.signHex(this.formData.backup[this.selectedAsset])
                break
              default:
                this.updateNotification(this.$t('messages.errorSignature'))
            }
          } catch (err) {
            this.updateNotification(this.$t('messages.warnSomething'))
            console.error(err)
          }
          this.nextStep()
        })
      },
      selectAsset (asset) {
        this.selectedAsset = asset
      },
      validForm (data) {
        this.disableForm = data.valid
        this.formData = data.form
      },
      nextStep () {
        let b = Object.keys(STEPS)
        let a = b.indexOf(this.currentStep)
        if (a === STEPS.length) {
          this.currentStep = b[a]
        } else {
          this.currentStep = b[a + 1]
        }
      },
      prevStep () {
        this.disableForm = false
        this.selectedAsset = ''
        let b = Object.keys(STEPS)
        let a = b.indexOf(this.currentStep)
        if (a === 0) {
          this.currentStep = b[0]
        } else {
          this.currentStep = b[a - 1]
        }
      }
    }
  }
</script>

<style scoped>
  .stepper, .stepper__step {
    width: 100%;
  }
  .stepper__step-actions {
    display: flex;
    justify-content: flex-end;
  }

  .stepper__step-content {
    padding: 20px 0;
  }
</style>
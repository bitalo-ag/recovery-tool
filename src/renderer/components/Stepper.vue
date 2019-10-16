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
          Back
        </md-button>

        <md-button
          class="md-primary md-raised stepper__btn-next"
          @click="nextStep"
        >
          {{ $t('mainPage.buttons.next') }}
        </md-button>
      </div>
    </div>

    <div
      class="stepper__step"
      v-if="currentStep === STEPS.form"
    >
      <div class="stepper__step-content">
        <step-form
          @valid="validForm"
        />
      </div>

      <div class="stepper__step-actions">
        <md-button
          class="md-primary md-raised stepper__btn-prev"
          :disabled="currentStep === STEPS.welcome"
          @click="prevStep"
        >
          Back
        </md-button>

        <md-button
          class="md-primary md-raised stepper__btn-next"
          :disabled="!disableForm"
          @click="nextStep"
        >
          {{ $t('mainPage.buttons.next') }}
        </md-button>
      </div>
    </div>

    <div
      class="stepper__step"
      v-if="currentStep === STEPS.assetSelector"
    >
      <div class="stepper__step-content">
        <step-asset-selector
          :formData="formData"
        />
      </div>

      <div class="stepper__step-actions">
        <md-button
          class="md-primary md-raised stepper__btn-prev"
          :disabled="currentStep === STEPS.welcome"
          @click="prevStep"
        >
          Back
        </md-button>

        <md-button
          class="md-primary md-raised stepper__btn-next"
          :disabled="!disableForm"
          @click="nextStep"
        >
          {{ $t('mainPage.buttons.next') }}
        </md-button>
      </div>
    </div>

    <div
      class="stepper__step"
      v-if="currentStep === STEPS.exportHash"
    >
      <p>export hash</p>
    </div>
  </div>
</template>

<script>
  import StepWelcome from './steps/StepWelcome.vue'
  import StepForm from './steps/StepForm.vue'
  import StepAssetSelector from './steps/StepAssetSelector.vue'

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
      StepAssetSelector
    },
    data () {
      return {
        STEPS,
        currentStep: 'welcome',
        disableForm: false,
        formData: null
      }
    },
    methods: {
      validForm (data) {
        console.log(data.valid)
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
//        this.currentStep =
      },
      prevStep () {
        this.disableForm = false
        let b = Object.keys(STEPS)
        let a = b.indexOf(this.currentStep)
        if (a === 0) {
          this.currentStep = b[0]
        } else {
          this.currentStep = b[a - 1]
        }
//        this.currentStep =
      },
      changeStep (index) {
        console.log(index)
      },
      completed () {
        console.log('completed!')
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
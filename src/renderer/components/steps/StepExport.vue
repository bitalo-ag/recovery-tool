<template>
  <div class="export">
    <div
      class="md-title align-center step-title"
    >
      {{ $t('export.title') }}
    </div>

    <md-input-container
      class="input-container"
    >
      <label>
        {{ $t('export.signatureLabel') }}
      </label>
      <md-textarea
        :value="signature"
      />
    </md-input-container>
  </div>
</template>

<script>
  export default {
    name: 'step-export',
    props: {
      signature: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped></style>
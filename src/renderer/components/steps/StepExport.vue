<template>
  <div class="export">
    <div
      class="md-title align-center step-title"
    >
      Now you can copy the generated signature. Thank you!
    </div>

    <md-input-container
      class="input-container"
    >
      <label>Signature</label>
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
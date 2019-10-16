<template>
  <md-snackbar
    :md-position="vertical + ' ' + horizontal"
    :ref="reference"
    :md-duration="duration"
  >
    <span>
      {{ notification }}
    </span>
  </md-snackbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'notification',
    data () {
      return {
        reference: 'snackbar',
        vertical: 'top',
        horizontal: 'right',
        duration: 4000
      }
    },
    methods: {
      close () {

      }
    },
    computed: {
      ...mapGetters({
        notification: 'notification'
      })
    },
    watch: {
      notification (val) {
        if (val) {
          this.$refs[this.reference].open()
        }
      }
    }
  }
</script>

<style scoped>

</style>
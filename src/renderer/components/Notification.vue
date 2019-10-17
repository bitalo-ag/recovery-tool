<template>
  <md-snackbar
    :md-position="vertical + ' ' + horizontal"
    :ref="reference"
    :md-duration="duration"
    @close="close"
  >
    <span>
      {{ notification }}
    </span>
  </md-snackbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

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
      ...mapActions({
        updateNotification: 'updateNotification'
      }),
      close () {
        this.updateNotification('')
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
        } else {
          this.$refs[this.reference].close()
        }
      }
    }
  }
</script>

<style scoped></style>
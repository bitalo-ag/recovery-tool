<template>
  <div id="page">
    <div class="toolbar">
      <img class="" src="../assets/images/logo.png"/>
      <span
        v-if="!isDisplayForm"
        class="md-title toolbar-title"
      >
        {{ $t('mainPage.title') }}
      </span>
      <span
        v-if="isDisplayForm"
        class="md-title toolbar-title"
      >
        {{ $t('mainPage.subtitle') }}
      </span>
      <md-button
        v-if="!isDisplayForm"
        class="md-primary md-raised"
        @click="next"
      >
        {{ $t('mainPage.buttons.next') }}
      </md-button>
    </div>

    <div
      class="welcome-container"
      v-if="isDisplayForm"
    >
      <md-input-container
        class="input-container"
      >
        <label>
          {{ $t('mainPage.form.hex') }}
        </label>
        <md-input v-model="form.hex" />
      </md-input-container>

      <md-input-container
        class="input-container"
      >
        <label>
          {{ $t('mainPage.form.salt') }}
        </label>
        <md-input v-model="form.salt" />
      </md-input-container>

      <md-input-container
        class="input-container"
      >
        <label>
          {{ $t('mainPage.form.masterKey') }}
        </label>
        <md-input v-model="form.masterKey" />
      </md-input-container>

      <md-input-container
        class="input-container"
      >
        <label>
          {{ $t('mainPage.form.password') }}
        </label>
        <md-input v-model="form.password" />
      </md-input-container>

      <md-button
        class="md-primary md-raised submit-btn"
        @click="submit"
        :disabled="disableSubmit"
      >
        {{ $t('mainPage.buttons.submit') }}
      </md-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'main-page',
    data () {
      return {
        isDisplayForm: false,
        form: {
          hex: '',
          salt: '',
          masterKey: '',
          password: ''
        }
      }
    },
    methods: {
      next () {
        this.isDisplayForm = true
      },
      submit () {
        //
      }
    },
    computed: {
      disableSubmit () {
        return !this.form.hex || !this.form.salt || !this.form.masterKey || !this.form.password
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .input-container>label, .input-container>input {
    color: #fff !important;
  }

  .input-container:after {
    background-color: #fff !important;
  }

  .submit-btn {
    align-self: flex-end;
  }

  .welcome-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wait-message, .empty-houses {
    color: #666;
  }

  .search-progress {
    margin-top: 2em;
  }

  .toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw;
  }

  .toolbar-title {
    padding: 15px 0;
    text-align: center;
  }

  .log-in-house {
    margin-left: 30px !important;
  }

  .houses-list-title {
    text-align: center;
  }

  .empty-houses-container {
    color: #666;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .empty-houses-container {
    margin-top: 10px;
  }

  .empty-houses {
    margin-top: 5px;
  }

  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

</style>

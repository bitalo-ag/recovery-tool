<template>
  <div class="lang-selector-wrp">
    <div
      class="lang-selector__lang"
      :class="{ 'lang-active': lang === item }"
      @click="setLang(item)"
      v-for="(item, index) in config.LANGUAGES"
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
  import { config } from '../config'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'lang-selector',
    data () {
      return {
        config
      }
    },
    methods: {
      ...mapActions({
        changeLang: 'changeLang'
      }),
      setLang (lang) {
        this.changeLang(lang)
        this.$i18n.set(lang)
      }
    },
    computed: {
      ...mapGetters({
        lang: 'lang'
      })
    }
  }
</script>

<style scoped>
  .lang-selector-wrp {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 10px 0;
  }

  .lang-active {
    font-weight: bold;
  }

  .lang-selector__lang {
    padding: 6px 15px;
    text-transform: uppercase;
    letter-spacing: .4px;
    transition: all .4s ease;

    &:hover {
      cursor: pointer;
      background-color: #fff;
      color: #000;
    }

    &:first-of-type {
      border-right: 1px solid #fff;
    }
  }
</style>
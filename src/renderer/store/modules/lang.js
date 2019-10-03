const state = {
  lang: 'de'
}

const mutations = {
  SET_LANG (state, lang) {
    state.lang = lang
  }
}

const actions = {
  changeLang ({ commit }, lang) {
    commit('SET_LANG', lang)
    localStorage.setItem('lang', lang)
  },
  checkLocalStorage ({ dispatch }, storage) {
    if (storage.hasOwnProperty('lang')) {
      dispatch('changeLang', storage.lang)
    }
  }
}

const getters = {
  lang: state => state.lang
}

export default {
  state,
  mutations,
  getters,
  actions
}

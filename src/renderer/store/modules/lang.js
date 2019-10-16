const state = {
  lang: 'de',
  notification: ''
}

const mutations = {
  SET_LANG (state, lang) {
    state.lang = lang
  },
  SET_NOTIFICATION (state, message) {
    state.notification = message
  }
}

const actions = {
  changeLang ({ commit }, lang) {
    commit('SET_LANG', lang)
    localStorage.setItem('lang', lang)
  },
  updateNotification ({ commit }, message) {
    commit('SET_NOTIFICATION', message)
    setTimeout(() => {
      commit('SET_NOTIFICATION', '')
    }, 4000)
  },
  checkLocalStorage ({ dispatch }, storage) {
    if (storage.hasOwnProperty('lang')) {
      dispatch('changeLang', storage.lang)
    }
  },
}

const getters = {
  lang: state => state.lang,
  notification: state => state.notification
}

export default {
  state,
  mutations,
  getters,
  actions
}

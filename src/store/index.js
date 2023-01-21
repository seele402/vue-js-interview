import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries: [
      'russia',
      'usa',
    ],
    scoreRanges: [
      '> 20',
      '< 10',
    ],
    variant: 'default',
    users: [{
      avatar: "",
      title: "",
      subtitle: "",
      country: "",
      score: 0,
      residentialAddress: ""
    }],
    filteredUsers: [],
    filterActive: false,
    api: '',
    countryFilter: '',
    scoreRangeFilter: '',
    lastItemIndex: 0
  },

  getters: {
    LastItemIndex(state) {
      return state.lastItemIndex
    },
  },

  mutations: {
    SET_LIST: (state, apiList) => {
      state.users = apiList
      state.filteredUsers = [...state.users]
    },
    SET_DEFAULT_LIST: (state, jsonList) => {
      state.users = jsonList
      state.filteredUsers = [...state.users]
    },
    SET_LAST_ITEM_INDEX: (state, index) => {
      state.lastItemIndex = index - 1
    },
    SET_API: (state, apiUrl) => {
      state.api = apiUrl
    },
    SET_COUNTRY_FILTER: (state, country) => {
      state.countryFilter = country
    },
    SET_SCORE_FILTER: (state, scoreRange) => {
      state.scoreRangeFilter = scoreRange
    },
    SET_FILTER_STATUS: (state) => {
      if (state.countryFilter || state.scoreRangeFilter) {
        state.filterActive = true
      }
      else state.filterActive = false
    },
    SET_FILTERED_USERS: (state) => {
      state.filteredUsers = [...state.users]
      if (state.countryFilter) state.filteredUsers = state.filteredUsers.filter(user => user.country === state.countryFilter)
      if (state.scoreRangeFilter === '> 20') {
        state.filteredUsers = state.filteredUsers.filter(user => user.score > 20)
      }
      else if (state.scoreRangeFilter === '< 10') state.filteredUsers = state.filteredUsers.filter(user => user.score < 10)
    }
  },

  actions: {
    async FETCH_LIST({ state, commit }) {
      const response = await fetch(state.api, {
        method: 'GET'
      })
      const apiList = await response.json()
      commit('SET_LAST_ITEM_INDEX', apiList.length)
      commit('SET_LIST', apiList)
    }
  },
})
<template>
  <v-container>
    <v-row align="center" justify="center" class="ma-4">
      <LogoContainer />
      <FormContainer @api-url-changed="fetchList" @reset-btn-pressed="resetList"
        @country-filter-changed="changeCountryFilter" @score-filter-changed="changeScoreFilter" />
      <ListContainer />
    </v-row>
  </v-container>
</template>

<script>
import FormContainer from './FormContainer.vue'
import ListContainer from './ListContainer.vue'
import LogoContainer from './LogoComponent.vue'
import jsonList from '../assets/defaultList.json'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'ContentBlock',
  components: {
    LogoContainer,
    FormContainer,
    ListContainer,
  },

  methods: {
    ...mapActions([
      'FETCH_LIST'
    ]),
    ...mapMutations([
      'SET_API',
      'SET_DEFAULT_LIST',
      'SET_COUNTRY_FILTER',
      'SET_SCORE_FILTER',
      'SET_FILTERED_USERS',
      'SET_FILTER_STATUS'
    ]),
    fetchList(apiUrl) {
      this.SET_API(apiUrl)
      this.FETCH_LIST()
    },
    resetList() {
      this.SET_DEFAULT_LIST(jsonList)
    },
    changeCountryFilter(country) {
      this.SET_COUNTRY_FILTER(country)
      this.SET_FILTER_STATUS()
      this.SET_FILTERED_USERS()
    },
    changeScoreFilter(score) {
      this.SET_SCORE_FILTER(score)
      this.SET_FILTER_STATUS()
      this.SET_FILTERED_USERS()
    }
  },

  data: () => ({}),
}
</script>
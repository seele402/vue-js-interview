<template>
  <v-container>
    <v-row align="center" justify="center" class="ma-4">
      <VuetifyLogo />
      <FormContainer @api-url-changed="fetchList" @reset-btn-pressed="resetList"
        @country-filter-changed="changeCountryFilter" @score-filter-changed="changeScoreFilter" />
      <PostsList />
    </v-row>
  </v-container>
</template>

<script>
import FormContainer from './FormContainer.vue'
import PostsList from './PostsList.vue'
import VuetifyLogo from './VuetifyLogo.vue'
import jsonList from '../assets/defaultList.json'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ContentBlock',

  components: {
    VuetifyLogo,
    FormContainer,
    PostsList,
  },

  computed: {
    ...mapGetters([
      'filteredUsers'
    ])
  },

  methods: {
    ...mapActions([
      'FETCH_LIST'
    ]),
    ...mapMutations([
      'SET_API',
      'SET_COUNTRY_FILTER',
      'SET_SCORE_FILTER',
      'SET_FILTER_STATUS',
      'SET_LIST'
    ]),
    fetchList(apiUrl) {
      this.SET_API(apiUrl)
      this.SET_COUNTRY_FILTER()
      this.SET_SCORE_FILTER()
      this.FETCH_LIST()
    },
    resetList() {
      this.SET_LIST(jsonList)
      this.SET_COUNTRY_FILTER()
      this.SET_SCORE_FILTER()
    },
    changeCountryFilter() {
      this.SET_FILTER_STATUS()
    },
    changeScoreFilter() {
      this.SET_FILTER_STATUS()
    }
  }
}
</script>
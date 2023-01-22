<template>
  <v-col cols="12" md="4">
    <v-select v-model="country" :items="countries" clearable label="Filter by country"
      @change="$emit('country-filter-changed', country)" @click:clear="$emit('country-filter-changed')"></v-select>
    <v-select v-model="scoreRange" :items="scoreRanges" clearable label="Filter by score"
      @change="$emit('score-filter-changed', scoreRange)" @click:clear="$emit('score-filter-changed')"></v-select>
    <v-text-field label="API URL" v-model="apiUrl"></v-text-field>
    <v-btn @click="$emit('api-url-changed', apiUrl)">Fetch from API</v-btn>
    <v-btn class="ml-4" @click="$emit('reset-btn-pressed')">Reset to default</v-btn>
  </v-col>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'FormContainer',

  computed: {
    ...mapState([
      'countries',
      'scoreRanges',
      'api',
      'countryFilter',
      'scoreRangeFilter'
    ]),
    country: {
      get() {
        return this.countryFilter
      },
      set(value) {
        return this.SET_COUNTRY_FILTER(value)
      }
    },
    scoreRange: {
      get() {
        return this.scoreRangeFilter
      },
      set(value) {
        return this.SET_SCORE_FILTER(value)
      }
    },
  },

  methods: {
    ...mapMutations([
      'SET_COUNTRY_FILTER',
      'SET_SCORE_FILTER'
    ])
  },

  data: () => ({
    apiUrl: '',
  }),
}
</script>
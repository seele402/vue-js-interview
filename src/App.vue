<template>
  <v-app>
    <v-main>
      <ContentBlock />
    </v-main>
    <v-footer app v-bind="localAttrs">
      <VuetifyFooter />
    </v-footer>
  </v-app>
</template>

<script>
import ContentBlock from './components/ContentBlock';
import VuetifyFooter from './components/VuetifyFooter';
import jsonList from './assets/defaultList.json'
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',

  components: {
    ContentBlock,
    VuetifyFooter,
  },

  computed: {
    localAttrs() {
      const attrs = {}

      attrs.absolute = true
      attrs.fixed = false

      return attrs
    },
    ...mapState([
      'users'
    ]),
  },

  methods: {
    ...mapMutations([
      'SET_LIST',
      'SET_LAST_ITEM_INDEX'
    ])
  },

  created() {
    this.SET_LIST(jsonList)
    this.SET_LAST_ITEM_INDEX(jsonList.length)
  },
};
</script>

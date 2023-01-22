<template>
  <v-col cols="12" md="4">
    <v-card max-width="450" class="mx-auto">
      <v-list three-line v-if="filterActive & isLoaded">
        <v-subheader>List</v-subheader>
        <v-list-item-content v-if="lastItemIndex === -1">
          <v-list-item-title class="ml-5">Nothing found, try changing the filters</v-list-item-title>
        </v-list-item-content>
        <transition-group name="list-transition">
          <ListItem v-for="(item, index) in filteredUsers" :key="item.title" :item="item" :index="index"
            @avatar-pressed="showPopup" />
        </transition-group>
      </v-list>
      <v-list three-line v-else-if="isLoaded">
        <v-subheader>List</v-subheader>
        <transition-group name="list-transition">
          <ListItem v-for="(item, index) in users" :key="item.title" :item="item" :index="index"
            @avatar-pressed="showPopup" />
        </transition-group>
      </v-list>
      <v-progress-linear v-else-if="isLoaded == false" indeterminate color="primary"></v-progress-linear>
    </v-card>
  </v-col>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import ListItem from './ListItem.vue'

export default {
  name: 'ListContainer',
  components: {
    ListItem,
  },
  computed: {
    ...mapState([
      'users',
      'filterActive',
      'lastItemIndex'
    ]),
    ...mapGetters([
      'filteredUsers'
    ]),
    filteredUsersLength() {
      return this.filteredUsers.length
    },
    usersLength() {
      return this.users.length
    }
  },
  methods: {
    ...mapMutations([
      'SET_LAST_ITEM_INDEX',
      'SET_POPUP_STATUS'
    ])
  },
  watch: {
    filteredUsersLength() {
      this.SET_LAST_ITEM_INDEX(this.filteredUsersLength)
    }
  },
  data: () => ({
    isLoaded: false
  }),
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState === "complete") {
        this.isLoaded = true
      }
    }
  }
}
</script>

<style>
.list-transition-enter-active,
.list-transition-leave-active {
  transition: all .3s;
}

.list-transition-enter,
.list-transition-leave-to {
  transform: translateX(40px);
  opacity: 20%;
  max-height: fit-content;
}
</style>
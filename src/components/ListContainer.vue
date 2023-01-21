<template>
  <v-col cols="12" md="4">
    <v-card max-width="450" class="mx-auto">
      <v-list three-line v-if="filterActive">
        <v-subheader>List</v-subheader>
        <ListItem v-for="(item, index) in filteredUsers" :key="item.title" :item="item" :index="index" @avatar-pressed="showPopup"/>
      </v-list>
      <v-list three-line v-else>
        <v-subheader>List</v-subheader>
        <ListItem v-for="(item, index) in users" :key="item.title" :item="item" :index="index" @avatar-pressed="showPopup"/>
      </v-list>
    </v-card>
  </v-col>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import ListItem from './ListItem.vue'

export default {
  name: 'ListContainer',
  components: {
    ListItem,
  },
  computed: {
    ...mapState([
      'users',
      'filteredUsers',
      'filterActive'
    ]),
    filteredUsersLength(){
      return this.filteredUsers.length
    },
    usersLength(){
      return this.users.length
    }
  },
  methods: {
    ...mapMutations([
      'SET_LAST_ITEM_INDEX',
      'SET_POPUP_STATUS'
    ]),
    showPopup(index){
      this.SET_POPUP_STATUS(true, index)
    }
  },
  watch: {
    filteredUsersLength(){
      this.SET_LAST_ITEM_INDEX(this.filteredUsersLength)
    }
  },
  data: () => ({}),
}
</script>
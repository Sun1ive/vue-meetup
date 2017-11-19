<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-tile v-for="(item, i) in menuItems" :key="i" @click="">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>{{ item.title }}</v-list-tile-content>
      </v-list-tile>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="(item, i) in menuItems" :key="i">
          <v-icon left>{{ item.icon }}</v-icon>{{ item.title }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        { icon: 'supervisor_account', title: 'View Meetups' },
        { icon: 'room', title: 'Organize Meetup' },
        { icon: 'person', title: 'Profile' },
        { icon: 'face', title: 'Sign up' },
        { icon: 'lock_open', title: 'Sign in' },
      ],
    };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
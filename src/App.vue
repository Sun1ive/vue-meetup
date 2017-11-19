<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed temporary>

    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          <v-icon left>supervisor_account</v-icon>View Meetups</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>

    </main>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style scoped>

</style>
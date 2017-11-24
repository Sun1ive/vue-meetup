<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex class="text-xs-center">
        <v-progress-circular
        indeterminate
        color="primary--text"
        :width="7"
        :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit :meetup="meetup"></app-edit>
            </template>
          </v-card-title>
          <v-card-media :src="meetup.img" height="400"></v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date }} {{ meetup.time }} - {{ meetup.location }}</div>
            <div>
              <app-edit-date :meetup="meetup"></app-edit-date>
            </div>
            <div>{{ meetup.desc }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      reguired: true,
    }
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuth() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },
    userIsCreator() {
      if (!this.userIsAuth) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped>

</style>
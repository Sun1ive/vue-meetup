<template>
  <v-container>
    <v-layout wrap row>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-btn large router to="/meetups" class="info">Expore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-btn large router to="/createmeetup" class="info">Create Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="text-xs-center">
        <v-progress-circular
        indeterminate
        color="primary--text"
        :width="7"
        :size="70"
        v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-carousel v-if="!loading">
          <v-carousel-item v-for="(meetup,i) in meetups" :key="i" :src="meetup.img" @click="onLoadMeetup(meetup.id)">
            <div class="Title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex class="text-xs-center mt-3">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push(`/meetups/${id}`);
    },
  },
};
</script>

<style scoped lang="stylus">
.Title {
  position: absolute;
  bottom: 50px;
  color: #fff;
  font-size: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  width: 100%;
  text-align: center;
}
</style>
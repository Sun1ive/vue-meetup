<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-card-title>
            <h3 class="primary--text">{{ meetup.title }}</h3>
          </v-card-title>
          <v-card-media :src="meetup.img" height="400"></v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date }}</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam consequuntur a assumenda rerum, perferendis voluptatem enim nostrum. Nobis aliquid saepe sint distinctio! Fugit dolorum illum sit excepturi alias consectetur earum?</div>
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
    id: String,
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
  },
};
</script>

<style scoped>

</style>
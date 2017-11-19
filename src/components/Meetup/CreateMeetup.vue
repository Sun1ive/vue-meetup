<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="primary--text">Create a new meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="title" name="Title" label="Title" id="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="location" name="Location" label="Location" id="Location" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="img" name="img" label="img URL" id="img" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="img" alt="meetupImg">
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="desc" name="desc" label="desc" id="desc" multi-line required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" :disabled="!formIsValid" class="primary ml-0">Create Meetup</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      img:
        'https://i.pinimg.com/originals/ec/2a/90/ec2a909c5c1d2e670650ffba076c6e5c.jpg',
      desc: '',
    };
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        img: this.img,
        desc: this.desc,
        date: new Date(),
      };
      this.$store.dispatch('createMeetup', meetupData);
      setTimeout(() => {
        this.$router.push('/meetups');
      }, 300);
    },
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.img !== '' &&
        this.desc !== ''
      );
    },
  },
};
</script>

<style scoped>

</style>
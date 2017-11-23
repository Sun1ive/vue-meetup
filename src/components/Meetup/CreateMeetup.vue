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
              <v-alert color="error" icon="warning" value="true" v-if="error">
                {{ this.$store.getters.error }}
              </v-alert>
              <v-btn raised class="ml-0 primary" @click="onPickFile">Upload Image</v-btn>
              <input @change="onFilePicked" ref="fileInput" accept="image/*" type="file" hidden="true">
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="img">
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="desc" name="desc" label="desc" id="desc" multi-line required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <h3>Choose a date and time</h3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker format="24hr" v-model="time"></v-time-picker>
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
      img: '',
      desc: '',
      date: '',
      time: '',
      image: null,
      error: false,
    };
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        desc: this.desc,
        date: this.date,
        time: this.time,
      };
      this.$store.dispatch('createMeetup', meetupData);
      setTimeout(() => {
        this.$router.push('/meetups');
      }, 300);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;

      if (fileName.lastIndexOf('.') <= 0) {
        const err = 'Please upload valid file'
        this.$store.commit('setError', err);
        this.error = true;
        return
      } else {
        this.error = false;
        this.$store.commit('clearError');
      }

      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        this.img = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.img !== '' &&
        this.desc !== '' &&
        this.date !== '' &&
        this.time !== ''
      );
    },
  },
};
</script>

<style scoped>

</style>
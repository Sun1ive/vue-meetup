<template>
  <v-dialog max-width="350" persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
      {{ buttonText }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex>
            <v-card-title v-if="userIsRegistered">Unregister from Meetup ?</v-card-title>
            <v-card-title v-else>Register from Meetup ?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout>
          <v-flex>
            <v-card-text>You can always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-card-actions>
              <v-btn flat class="green--text darken-1" @click="onAgree">Confirm</v-btn>
              <v-btn flat class="red--text darken-1" @click="registerDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    meetupId: {
      type: String,
    },
  },
  data() {
    return {
      registerDialog: false,
    };
  },
  methods: {
    onAgree() {}
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    },
    buttonText() {
      return this.userIsRegistered ? 'Unregister' : 'Register';
    },
  },
};
</script>

<style scoped>

</style>
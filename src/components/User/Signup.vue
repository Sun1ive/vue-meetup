<template>
  <v-container>
    <v-layout v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                    name="email"
                    label="Mail"
                    id="email"
                    v-model="email"
                    type="email"
                    required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                    name="password"
                    label="password"
                    id="password"
                    v-model="password"
                    type="password"
                    required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                    name="confirmPassword"
                    label="confirmPassword"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    required
                    :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex>
                    <v-btn type="submit">Sign up</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    onSignup() {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      console.log('dismissed alert!');
      this.$store.dispatch('clearError');
    },
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? 'Password do not match'
        : true;
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>

</style>
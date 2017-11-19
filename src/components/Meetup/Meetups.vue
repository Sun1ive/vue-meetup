<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout>
              <v-flex xs5 sm4 md3>
                <v-card-media src="https://images.pexels.com/photos/358382/pexels-photo-358382.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb" height="150"></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title>
                  <div>
                    <h3 class="white--text mb-0">My Meetup</h3 class="white--text">
                    <div>17th july 2018</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat to="/meetups/1"><v-icon left>arrow_forward</v-icon>View Meetup</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>

</style>
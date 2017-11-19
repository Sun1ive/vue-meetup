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
      <v-flex>
        <v-carousel>
          <v-carousel-item v-for="(meetup,i) in meetups" :key="i" :src="meetup.img">
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
  data() {
    return {
      meetups: [
        {
          img: 'https://images.pexels.com/photos/358382/pexels-photo-358382.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
          id: 'jiofsd',
          title: 'Meetup in NY',
        },
        {
          img: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?w=1260&h=750&auto=compress&cs=tinysrgb',
          id: 'gfvzxc',
          title: 'Meetup in Paris',
        },
        {
          img: 'https://images.pexels.com/photos/208699/pexels-photo-208699.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
          id: 'lkfrlkz',
          title: 'Meetup in Berlin',
        },
      ],
    };
  },
};
</script>

<style scoped lang="stylus">
.Title
  position absolute
  bottom 50px
  color #fff
  font-size 2rem
  background-color rgba(0,0,0,.5)
  padding 15px
  width 100%
  text-align center
</style>
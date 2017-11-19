import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        img:
          'https://images.pexels.com/photos/358382/pexels-photo-358382.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        id: 'jiofsd',
        title: 'Meetup in NY',
        date: '2018-07-19',
        time: '17:00',
        location: 'NY',
        desc: 'Somewhere there',
      },
      {
        img:
          'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?w=1260&h=750&auto=compress&cs=tinysrgb',
        id: 'gfvzxc',
        title: 'Meetup in Paris',
        date: '2018-07-18',
        time: '17:00',
        location: 'Paris',
        desc: 'Somewhere there',
      },
      {
        img:
          'https://images.pexels.com/photos/208699/pexels-photo-208699.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        id: 'lkfrlkz',
        title: 'Meetup in Berlin',
        date: '2018-07-17',
        time: '17:00',
        location: 'Berlin',
        desc: 'Somewhere there',
      },
    ],
    user: {
      id: '123dfsda32',
      registeredMeetups: ['lkfrlkz'],
    },
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
  },
  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        img: payload.img,
        desc: payload.desc,
        date: payload.date,
        time: payload.time,
        id: 'xcvjdsfj23',
      };
      // firebase there
      commit('createMeetup', meetup);
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort(
        (meetupA, meetupB) => meetupA.date > meetupB.date,
      );
    },
    loadedMeetup(state) {
      return meetupId =>
        state.loadedMeetups.find(meetup => meetup.id === meetupId);
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
  },
});

export default store;

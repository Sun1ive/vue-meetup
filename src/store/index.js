import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        img: 'https://images.pexels.com/photos/358382/pexels-photo-358382.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        id: 'jiofsd',
        title: 'Meetup in NY',
        date: new Date(),
        time: '17:00',
        location: 'NY',
        desc: 'Somewhere there',
      },
      {
        img:
          'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?w=1260&h=750&auto=compress&cs=tinysrgb',
        id: 'gfvzxc',
        title: 'Meetup in Paris',
        date: new Date(),
        time: '17:00',
        location: 'Paris',
        desc: 'Somewhere there',
      },
      {
        img:
          'https://images.pexels.com/photos/208699/pexels-photo-208699.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        id: 'lkfrlkz',
        title: 'Meetup in Berlin',
        date: new Date(),
        time: '17:00',
        location: 'Berlin',
        desc: 'Somewhere there',
      },
    ],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              desc: obj[key].desc,
              img: obj[key].img,
              date: obj[key].date,
              time: obj[key].title,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
            });
          }
          commit('setLoadedMeetups', meetups);
          commit('setLoading', false);
        })
        .catch((e) => {
          console.log(e);
          commit('setLoading', true);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        desc: payload.desc,
        date: payload.date,
        time: payload.time,
        creatorId: getters.user.id,
      };
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
        })
        .catch((e) => {
          commit('setLoading', false);
          commit('setError', e);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
        })
        .catch((e) => {
          commit('setLoading', false);
          commit('setError', e);
        });
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [] });
    },
    logOut({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    clearError({ commit }) {
      commit('clearError');
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
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
});

export default store;

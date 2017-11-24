import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        img:
          'https://images.pexels.com/photos/358382/pexels-photo-358382.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
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
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(m => m.id === payload.id);

      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.desc) {
        meetup.desc = payload.desc;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
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

      async function loadMeetups() {
        try {
        const data = await firebase.database().ref('meetups').once('value');
        const meetups = [];
        const obj = await data.val();

        for (const key in obj) {
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
        };
        commit('setLoadedMeetups', meetups);
        commit('setLoading', false);
        } catch (error) {
          console.log(error);
          commit('setLoading', true);
        }
      }
      loadMeetups();
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
      async function upload() {
        try {
          const response = await firebase
            .database()
            .ref('meetups')
            .push(meetup);
          const key = await response.key;
          const filename = await payload.image.name;
          const ext = await filename.slice(filename.lastIndexOf('.'));
          const storage = await firebase
            .storage()
            .ref(`meetups/${key}.${ext}`)
            .put(payload.image);
          const img = await storage.metadata.downloadURLs[0];
          firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ img });
          commit('createMeetup', {
            ...meetup,
            img,
            id: key,
          });
        } catch (error) {
          console.log(error);
        }
      }
      upload();
    },
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true);
      const updatedObj = {};
      if (payload.title) {
        updatedObj.title = payload.title;
      }
      if (payload.desc) {
        updatedObj.desc = payload.desc;
      }
      if (payload.date) {
        updatedObj.date = payload.date;
      }
      async function update() {
        try {
          await firebase
            .database()
            .ref('meetups')
            .child(payload.id)
            .update(updatedObj);
          commit('setLoading', false);
          commit('updateMeetup', payload);
        } catch (error) {
          console.log(error);
        }
      }
      update();
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      async function loginUp() {
        try {
          const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password);

          const newUser = {
            id: response.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
          commit('setLoading', false);
        } catch (e) {
          commit('setLoading', false);
          commit('setError', e);
        }
      }
      loginUp();

      /*       firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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
        }); */
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      async function loginIn() {
        try {
          const response = await firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password);

          const newUser = {
            id: response.uid,
            registeredMeetups: [],
          };
          commit('setUser', newUser);
        } catch (e) {
          commit('setLoading', false);
          commit('setError', e);
        }
      }
      loginIn();

      /*
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
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
        }); */
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
      return state.loadedMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date);
    },
    loadedMeetup(state) {
      return meetupId => state.loadedMeetups.find(meetup => meetup.id === meetupId);
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

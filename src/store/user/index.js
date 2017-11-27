import * as firebase from 'firebase';

export default ({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unregisterUserForMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1);
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      async function registerUser() {
        try {
          const response = await firebase
            .database()
            .ref(`/users/${getters.user.id}`)
            .child('/registrations/')
            .push(payload);
          commit('setLoading', false);
          commit('registerUserForMeetup', { id: payload, fbKey: response.key });
        } catch (error) {
          console.log(error);
        }
      }
      registerUser();
    },
    unregisterUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      const fbKey = user.fbKeys[payload];
      if (user.fbKey) {
        return;
      }
      async function unregister() {
        try {
          await firebase
            .database()
            .ref(`users/${user.id}/registrations/`)
            .child(fbKey)
            .remove();
          commit('unregisterUserForMeetup', payload);
          commit('setLoading', false);
        } catch (error) {
          console.log(error);
          commit('setLoading', false);
        }
      }
      unregister();
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
            fbKeys: {},
          };
          commit('setUser', newUser);
          commit('setLoading', false);
        } catch (e) {
          commit('setLoading', false);
          commit('setError', e);
        }
      }
      loginUp();
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
            fbKeys: {},
          };
          commit('setUser', newUser);
        } catch (e) {
          commit('setLoading', false);
          commit('setError', e);
        }
      }
      loginIn();
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} });
    },
    fetchUserData({ commit, getters }) {
      commit('setLoading', true);
      async function fetchData() {
        try {
          const data = await firebase
            .database()
            .ref(`users/${getters.user.id}/registrations/`)
            .once('value');
          const dataPairs = data.val();
          const registeredMeetups = [];
          const swappedPairs = {};

          for (const key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }

          const updatedUser = {
            id: getters.user.id,
            registeredMeetups,
            fbKeys: swappedPairs,
          };
          commit('setLoading', false);
          commit('setUser', updatedUser);
        } catch (error) {
          commit('setLoading', false);
          console.log(error);
        }
      }
      fetchData();
    },
    logOut({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
});

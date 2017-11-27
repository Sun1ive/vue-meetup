import * as firebase from 'firebase';

export default ({
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
  },
  mutations: {
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
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
  },
  actions: {
    loadMeetups({ commit }) {
      commit('setLoading', true);

      async function loadMeetups() {
        try {
          const data = await firebase
            .database()
            .ref('meetups')
            .once('value');
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
          }
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
  },
});

import Vue from 'vue';
import * as firebase from 'firebase';

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VCard,
  VForm,
  VTextField,
  VDatePicker,
  VTimePicker,
  VAlert,
  VProgressCircular,
  VDialog,
  VDivider,
  transitions,
} from 'vuetify';
import '@/stylus/main.styl';
import '../node_modules/vuetify/src/stylus/app.styl';

import App from './App';
import store from './store';
import router from './router';
import DateFilter from './filters/date';
import Alert from './components/Shared/Alert';
import Edit from './components/Meetup/Edit/EditMeetupDetails';
import Register from './components/Meetup/Registration/RegisterDialog';

Vue.component('app-alert', Alert);
Vue.component('app-edit', Edit);
Vue.component('app-register', Register);

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VForm,
    VTextField,
    VDatePicker,
    VTimePicker,
    VAlert,
    VProgressCircular,
    VDialog,
    VDivider,
    transitions,
  },
  theme: {
    primary: '#C62828',
  },
});

Vue.filter('date', DateFilter);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBQolay2ViGvqAt_kqgxGjG4L_PG7S762s',
      authDomain: 'devmeetup-75da4.firebaseapp.com',
      databaseURL: 'https://devmeetup-75da4.firebaseio.com',
      projectId: 'devmeetup-75da4',
      storageBucket: 'gs://devmeetup-75da4.appspot.com',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
});

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
  transitions,
} from 'vuetify';
import '@/stylus/main.styl';
import '../node_modules/vuetify/src/stylus/app.styl';

import App from './App';
import store from './store';
import router from './router';
import DateFilter from './filters/date';

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
      storageBucket: 'devmeetup-75da4.appspot.com',
    });
  },
});

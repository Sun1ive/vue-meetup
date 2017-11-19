import Vue from 'vue';

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
});

import Vue from 'vue';
import App from './App.vue';
import router from './router';

import axois from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import animated from 'animate.css';
import WOW from 'wow.js';

// Axios
Vue.use(VueAxios, axois);

// Global Loading component
Vue.component('Loading', Loading);

// animated.css & wow.js
Vue.use(animated);
new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 65,
  mobile: true,
  live: true,
  resetAnimation: true
}).init();

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');

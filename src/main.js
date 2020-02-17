import Vue from 'vue/dist/vue.common.js';
import App from './App.vue';
import './registerServiceWorker';

import AsyncComputed from 'vue-async-computed';

import Icon from 'vue-awesome/components/Icon';

// only import the icons you use to reduce bundle size
// import 'vue-awesome/icons/flag'

import 'vue-awesome/icons';

import contenteditable from 'vue-contenteditable';

// import './annyang.min.js';

Vue.use(AsyncComputed);

Vue.component('fai', Icon);

var VueTouch = require('vue-touch');
Vue.use(VueTouch, { name: 'v-touch' }); ;
Vue.use(contenteditable);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

window.addEventListener('beforeinstallprompt', function (event) {
  event.prompt();
})
;

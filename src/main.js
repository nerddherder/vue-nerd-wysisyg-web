import Vue from 'vue'
import App from './App.vue'
import VueBlu from 'vue-blu';

import 'vue-blu/dist/css/vue-blu.min.css';

Vue.use(VueBlu);

new Vue({
  el: '#app',
  render: h => h(App)
})

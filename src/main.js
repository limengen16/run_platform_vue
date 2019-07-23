import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

import Vuetify from 'vuetify';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import 'vant/lib/index.css';
import {
  Button,
  Toast,
  Notify,
  Swipe,
  SwipeItem
} from 'vant';

Vue.use(Button).use(Toast).use(Notify).use(Swipe).use(SwipeItem);
Vue.use(Vuetify);
Vue.use(VueCookies);

Vue.prototype.$axios = axios; // 在vue中使用axios，全局
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

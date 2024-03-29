import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import './registerServiceWorker';
import '@/assets/styles/reset.css';
import EvaIcons from 'vue-eva-icons';

Vue.config.productionTip = false;

Vue.use(EvaIcons);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

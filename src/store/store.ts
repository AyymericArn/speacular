import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import State from '@/models/IStore';
import recorder from '@/store/modules/recorder.ts';
import analytics from '@/store/modules/analytics.ts';
// import type {MediaRecorder} from 'dom-mediacapture-record';

Vue.use(Vuex);

// const createMediaRecorder = async (): Promise<any> => {
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   return new MediaRecorder(stream);
// };

function getDataFromLocalStorage(key: string): object[] {
  const history: string | null = localStorage.getItem(key);
  return history ? JSON.parse(history) : [];
}

function getUserFromLocalStorage(): object | null {
  const user: string | null = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export default new Vuex.Store({
  modules: {
    recorder,
    analytics,
  },
  state: {
    moods: getDataFromLocalStorage('mood-history'),
    user: getUserFromLocalStorage(),
    readQuotes: getDataFromLocalStorage('quotes-history'),
    wavesMounted: false,
  },
  mutations: {
    registerUser(state, payload) {
      state.user = {name: payload};
    },
    wavesMounted(state) {
      state.wavesMounted = true;
    },
    saveQuote(state, payload) {
      state.readQuotes.push({text: payload, date: new Date()});
      localStorage.setItem(
        'quotes-history',
        JSON.stringify(state.readQuotes),
      );
    },
  },
  actions: {
    registerMood(context, payload) {
      context.state.moods.push({mood: payload.mood, date: new Date()});
      localStorage.setItem(
        'mood-history',
        JSON.stringify(context.state.moods),
      );
    },
    registerUser(context, payload) {
      context.commit('registerUser', payload);
      localStorage.setItem(
        'user',
        JSON.stringify(context.state.user),
      );
    },
    wavesMounted(context) {
      context.commit('wavesMounted');
    },
  },
});

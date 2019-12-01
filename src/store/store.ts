import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import State from '@/models/IStore';
import recorder from '@/store/modules/recorder.ts';
import analytics from '@/store/modules/analytics.ts';
import User from '@/models/IUser';
import Mood from '@/models/IMood';
import Quote from '@/models/IQuote';
// import type {MediaRecorder} from 'dom-mediacapture-record';

Vue.use(Vuex);

// const createMediaRecorder = async (): Promise<any> => {
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   return new MediaRecorder(stream);
// };

function getDataFromLocalStorage(key: string): Mood[] | Quote[] {
  const history: string | null = localStorage.getItem(key);
  return history ? JSON.parse(history) : [];
}

function getUserFromLocalStorage(): User | null {
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
  },
  getters: {
    orderedReadQuotes: (state, getters): Quote[] => {
      return (state.readQuotes as Quote[]).reverse();
    },
  },
  mutations: {
    registerUser(state, payload) {
      state.user = {name: payload};
    },
    saveQuote(state, payload) {
      (state.readQuotes as Quote[]).push({text: payload, date: new Date()});
      localStorage.setItem(
        'quotes-history',
        JSON.stringify(state.readQuotes),
      );
    },
  },
  actions: {
    registerMood(context, payload) {
      (context.state.moods as Mood[]).push({mood: payload.mood, date: new Date()});
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
  },
});

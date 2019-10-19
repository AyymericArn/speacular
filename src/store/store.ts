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

function getFromLocalStorage(): object[] {
  const history: string | null = localStorage.getItem('mood-history');

  return history ? JSON.parse(history) : [];
}

export default new Vuex.Store({
  modules: {
    recorder,
    analytics,
  },
  state: {
    moods: getFromLocalStorage(),
  },
  actions: {
    registerMood(context, payload) {
      context.state.moods.push({mood: payload.mood, date: new Date()});
      localStorage.setItem(
        'mood-history',
        JSON.stringify(context.state.moods),
      );
    },
  }
});

import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import State from '@/models/IStore';
import recorder from '@/store/modules/recorder.ts';
// import type {MediaRecorder} from 'dom-mediacapture-record';

Vue.use(Vuex);

// const createMediaRecorder = async (): Promise<any> => {
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   return new MediaRecorder(stream);
// };

export default new Vuex.Store({
  modules: {
    recorder,
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import State from '@/models/IStore';
// import type {MediaRecorder} from 'dom-mediacapture-record';

declare var MediaRecorder: any;

Vue.use(Vuex);

// const createMediaRecorder = async (): Promise<any> => {
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   return new MediaRecorder(stream);
// };

export default new Vuex.Store({
  state: {
    // // mocking the MediaRecorder to please TS
    mediaRecorder: null as any,
    audioChunks: [] as any[],
    user: {
      name: 'Aymeric',
    },
    isRecording: false,
  },
  mutations: {
    setMediaRecorder(state, payload) {
      state.mediaRecorder = payload.mediaRecorder;
    },
    // start the recording of the voice
    startRecord(state) {
      if (state.mediaRecorder !== null) {
        state.mediaRecorder.start();

        state.mediaRecorder.addEventListener('dataavailable', (event: any) => {
          state.audioChunks.push(event.data);
        });

        state.isRecording = true;
      }
    },
    stopRecord(state) {
      state.mediaRecorder.stop();
      state.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(state.audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        console.log(audio);
      });
      state.isRecording = false;
    },
  },
  actions: {
    loadMediaRecorder(context) {
      console.log('suce');
      return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          context.commit('setMediaRecorder', {mediaRecorder});
          resolve();
        }).catch((err) => console.log(err));
      });
    },
    startRecording(context) {
      context.commit('startRecord');
    },
    stopRecording(context) {
      context.commit('stopRecord');
    },
  },
});

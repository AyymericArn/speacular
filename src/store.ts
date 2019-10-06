import Vue from 'vue';
import Vuex from 'vuex';
import State from '@/models/IStore';
// import type {MediaRecorder} from 'dom-mediacapture-record';

declare var MediaRecorder: any;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // mocking the MediaRecorder to please TS
    mediaRecorder: new MediaRecorder(),
    audioChunks: [] as any[],
    user: {
      name: 'Aymeric',
    },
  },
  mutations: {
    // TODO : replace context type
    setMediaRecorder(state) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        state.mediaRecorder = new MediaRecorder(stream);
      });
    },
    // start the recording of the voice
    startRecord(state) {
      if (state.mediaRecorder !== null) {
        state.mediaRecorder.start();

        state.mediaRecorder.addEventListener('dataavailable', (event: any) => {
          state.audioChunks.push(event.data);
        });
      }
    },
    stopRecord(state) {
      state.mediaRecorder.stop();
      state.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(state.audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        alert(typeof(audio));
      });
    },
  },
  actions: {
    // TODO : replace context type
    loadMediaRecorder(context) {
        context.commit('setMediaRecorder');
    },
    startRecoding(context) {
      context.commit('record');
    },
  },
});

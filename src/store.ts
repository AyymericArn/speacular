import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import State from '@/models/IStore';
// import type {MediaRecorder} from 'dom-mediacapture-record';
import axios from 'axios';
import Recorder from 'recorder-js';

// declare var Recorder: any;
declare var MediaRecorder: any;
Vue.use(Vuex);

// const createMediaRecorder = async (): Promise<any> => {
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   return new MediaRecorder(stream);
// };

export default new Vuex.Store({
  state: {
    // // mocking the MediaRecorder to please TS
    stream: null,
    mediaRecorder: null as any,
    audioContext: new (window.AudioContext)(),
    audioChunks: [] as any[],
    audioBlob: null as Blob,
    audioWav: null,
    user: {
      name: 'Aymeric',
    },
    isRecording: false,
    wav: null,
  },
  mutations: {
    setMediaRecorder(state, payload) {
      state.stream = payload.stream;
      state.mediaRecorder = payload.mediaRecorder;
    },
    // start the recording of the voice
    startRecord(state) {
      if (state.mediaRecorder !== null) {
        state.mediaRecorder.start().then(() => state.isRecording = true);
      }
    },
    stopRecord(state) {
      state.mediaRecorder.stop().then(({blob, buffer}) => {
        state.audioBlob = blob;
      });
    },
  },
  actions: {
    loadMediaRecorder(context) {
      return new Promise((resolve, reject) => {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {

            const recorder = new Recorder(context.state.audioContext, {
              onAnalyze: (data) => console.log(data)
            });
            recorder.init(stream);

            context.commit('setMediaRecorder', { mediaRecorder: recorder, stream });
            resolve();
          })
          .catch((err) => {
            alert('No mic detected');
          });
      });
    },
    startRecording(context) {
      context.commit('startRecord');
    },
    stopRecording(context) {
      context.commit('stopRecord');
      setTimeout(() => {
        context.dispatch('sendAudioToAPI');
      }, 300);
    },
    async sendAudioToAPI(context) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/audio',
        data: context.state.audioBlob,
        headers: {
          'Content-Type':'audio/wav',
        },
      }).then((response) => {
        //handle success
        console.log(response);
      }).catch((response) => {
        //handle error
        console.log(response);
      });
    },
  },
});
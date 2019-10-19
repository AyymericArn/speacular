import { Module } from 'vuex';
import axios from 'axios';
import Recorder from 'recorder-js';

const recorderModule: Module<any, any> = {
    namespaced: true,
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
            state.isRecording = false;
            console.log('stopped recording');
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
                onAnalyze: (data) => console.log(data),
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
            console.log(context.state.audioBlob);
            context.dispatch('sendAudioToAPI');
        }, 300);
    },
    async sendAudioToAPI(context) {
        axios({
        method: 'post',
        url: 'http://localhost:3000/audio',
        data: context.state.audioBlob,
        headers: {
            'Content-Type': 'audio/wav',
        },
        }).then((response) => {
            context.dispatch('registerMood', { mood: response.data }, {root: true} );
            // handle success
            console.log(response);
        }).catch((response) => {
            // handle error
            console.log(response);
        });
    },
  },
};

export default recorderModule;

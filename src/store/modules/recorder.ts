import { Module } from 'vuex';
import axios from 'axios';
import Recorder from 'recorder-js';

import resultMapping from '@/store/modules/recorderResults.json';

function getResultFromLocalStorage(): object | string {
    const result: string | null = localStorage.getItem('result');

    if (result) {
        const parsedResult = JSON.parse(result);
        if (parsedResult.date === new Date().toDateString()) {
            return parsedResult.content;
        }
    }

    return '';
}

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
        isRecording: false,
        wav: null,
        // here goes the daily recommandation
        result: getResultFromLocalStorage(),
    },
    mutations: {
        setMediaRecorder(state, payload) {
            state.stream = payload.stream;
            state.mediaRecorder = payload.mediaRecorder;
        },
        // start the recording of the voice
        startRecord(state) {
            if (state.mediaRecorder !== null) {
                console.log('started !');
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
        computeResult(state, payload) {
            let dominant = 'anger';
            for (const mood in payload.mood) {
                if (payload.mood.hasOwnProperty(mood)) {
                    payload.mood[mood] > payload.mood[dominant] ? dominant = mood : dominant = dominant;
                }
            }
            state.result = resultMapping[dominant];
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
        stopRecording(context, payload) {
            context.commit('stopRecord');
            context.commit('saveQuote', payload, {root: true});
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
                context.commit('computeResult', { mood: response.data });
                localStorage.setItem(
                    'result',
                    JSON.stringify({ content: context.state.result, date: new Date().toDateString() })
                );
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
import { Module } from 'vuex';
import axios from 'axios';
import Recorder from 'recorder-js';

import State from '@/models/IRecorderStore';
import RootState from '@/models/IStore';
import Mood from '@/models/IMood';

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

const recorderModule: Module<State, RootState> = {
    namespaced: true,
    state: {
        // // mocking the MediaRecorder to please TS
        stream: null,
        mediaRecorder: null as any,
        audioContext: new (window.AudioContext)(),
        audioChunks: [] as any[],
        audioBlob: null as Blob,
        isRecording: false,
        isLoading: false,
        // here goes the daily recommandation
        result: getResultFromLocalStorage(),
    },
    mutations: {
        setMediaRecorder(state, payload: {stream: MediaStream, mediaRecorder: Recorder}) {
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
            });
        },
        computeResult(state, payload: {mood: Mood[]}) {
            let dominant = 'anger';
            for (const mood in payload.mood) {
                if (payload.mood.hasOwnProperty(mood)) {
                    payload.mood[mood] > payload.mood[dominant] ? dominant = mood : dominant = dominant;
                }
            }
            state.result = resultMapping[dominant];
        },
        toggleLoad(state) {
            state.isLoading = !state.isLoading;
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
        stopRecording(context, payload: string) {
            context.commit('stopRecord');
            context.commit('saveQuote', payload, {root: true});
            setTimeout(() => {
                context.dispatch('sendAudioToAPI');
            }, 300);
        },
        async sendAudioToAPI(context) {
            context.commit('toggleLoad');
            axios({
            method: 'post',
            url: 'https://dev.aymericarn.fr/speacular_api/audio',
            data: context.state.audioBlob,
            headers: {
                'Content-Type': 'audio/wav',
            },
            }).then((response) => {
                // saves the moods of the day in mood history
                context.dispatch('registerMood', { mood: response.data }, {root: true} );
                // returns the mood to determine which phrase should be displayed
                context.commit('computeResult', { mood: response.data });
                localStorage.setItem(
                    'result',
                    JSON.stringify({ content: context.state.result, date: new Date().toDateString() }),
                );
                context.commit('toggleLoad');
                // handle success
            }).catch((response) => {
                // handle error
                context.commit('toggleLoad');
            });
        },
        toggleLoad(context) {
            context.commit('toggleLoad');
        },
    },
};

export default recorderModule;

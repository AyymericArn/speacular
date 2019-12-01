import { MutationTree } from 'vuex';
import './mocks/index';
import recorder from '../recorder';
import RecorderState from '@/models/IRecorderStore'

const mutations = recorder.mutations as MutationTree<RecorderState>;
let state: RecorderState;

describe('recorder store module', () => {
    it('should return mood result', () => {
        state = {
            // // mocking the MediaRecorder to please TS
            stream: null,
            mediaRecorder: null as any,
            audioContext: new (window.AudioContext)(),
            audioChunks: [] as any[],
            audioBlob: null as Blob,
            isRecording: false,
            isLoading: false,
            // here goes the daily recommandation
            result: '',
        };
        mutations.computeResult(state, {
            anger: 2,
            calm: 28,
            energy: 8,
            joy: 12,
            sorrow: 6,
        });
        expect(state.result).toBe('Don\'t be too nervous today. You may face some irritating people and unpleasantnesses. Relax and get a cup of tisane ;)');
    });
});

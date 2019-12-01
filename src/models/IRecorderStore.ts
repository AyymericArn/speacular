import User from './IUser';
import Quote from './IQuote';
import Mood from './IMood';

import Recorder from 'recorder-js';

export default interface State {
    stream: null | MediaStream;
    mediaRecorder: Recorder;
    audioContext: AudioContext;
    audioChunks: any[];
    audioBlob: Blob;
    isRecording: boolean;
    isLoading: boolean;
    result: object | string;
}

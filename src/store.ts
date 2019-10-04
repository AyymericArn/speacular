import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mediaRecorder: null,
    user: {
      name: 'Aymeric',
    },
  },
  mutations: {
    // TODO : replace context type
    setMediaRecorder (state: any) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        
        state.mediaRecorder = new MediaRecorder(stream);
      })
    }
  },
  actions: {
    // TODO : replace context type
    loadMediaRecorder (context: any) { 
        context.commit('setMediaRecorder')
    }
  },
});

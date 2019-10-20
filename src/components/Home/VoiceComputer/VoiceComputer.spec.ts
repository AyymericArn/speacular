import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import VoiceComputer from './VoiceComputer.vue';
import EvaIcons from 'vue-eva-icons';

import axios from 'axios';
import waveGenerator from '@/components/Home/VoiceComputer/waves';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(EvaIcons);

const $store = new Vuex.Store({
    state: {
        user: {
            name: 'Josh',
        },
        waveMounted: false,
    },
    actions: {
        wavesMounted() {
            return null;
        },
    },
    modules: {
        recorder: {
        namespaced: true,
            state: {
                result: '',
                wavesMounted: false,
            },
            actions: {
                loadMediaRecorder() {
                    return new Promise((resolve, reject) => resolve());
                },
            },
        },
    },
});
const wrapper = shallowMount(VoiceComputer, { mocks: { $store }, stubs: ['eva-icon', 'router-link'] });

jest.mock('axios');
jest.mock('@/components/Home/VoiceComputer/waves');

const axiosResp = {data: {
    contents: {
        quotes: [
            {
                quote: 'The real winners in life are the people who look at every situation with an expectation that they can make it work or make it better',
            },
        ],
    },
}};

describe('VoiceComputer', () => {
    it('should contain home section', () => {
        expect(wrapper.contains('.waves')).toBe(true);
    });

    it('should start the recording and get the daily quote', () => {
        // mocks axios return
        (axios as any).get.mockResolvedValue(axiosResp);
        // set the spy on dispatcher
        const spy = spyOn($store, 'dispatch');
        wrapper.find('.mic').trigger('click');
        expect(spy).toHaveBeenCalledWith('recorder/startRecording');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.test').text()).not.toBeFalsy();
        });
    });
});

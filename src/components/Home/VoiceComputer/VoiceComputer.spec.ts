import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import VoiceComputer from './VoiceComputer.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
    state: {
        user: null,
    },
    modules: {
        recorder: {
        namespaced: true,
            state: {
                result: '',
                wavesMounted: false,
            },
        },
    },
});
const wrapper = shallowMount(VoiceComputer, { mocks: { $store } });

jest.mock('axios');

describe('VoiceComputer', () => {
    it('should contain home section', () => {
        expect(wrapper.contains('.waves')).toBe(true);
    });

    it('should start the recording', () => {
        const spy = spyOn($store, 'dispatch');
        wrapper.find('.mic').trigger('click');
        expect(spy).toHaveBeenCalledWith('recorder/startRecording');
    });

    it('should get the daily quote', () => {
        wrapper.find('.mic').trigger('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.test').text()).not.toBeFalsy();
        });
    });
});

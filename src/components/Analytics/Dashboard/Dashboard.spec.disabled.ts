import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Dashboard from './Dashboard.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
    state: {
    },
});

const wrapper = shallowMount(Dashboard, { mocks: { $store }, stubs: ['eva-icon', 'router-link'] });


describe('Dashboard', () => {
    it('should be ok', () => {
        expect(1).toBe(1);
    });
});

import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Quotes from './Quotes.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
    state: {
        readQuotes: [
            {
                date: '2019-10-20T13:58:48.498Z',
                text: 'I lik pizzas',
            },
        ],
    },
});

const wrapper = shallowMount(Quotes, { mocks: { $store }, stubs: ['eva-icon', 'router-link'] });

describe('Quotes', () => {
    it('should render quotes', () => {
        expect(wrapper.contains('.quote')).toBe(true);
        expect(wrapper.find('.date')).toBeTruthy();
    });
});

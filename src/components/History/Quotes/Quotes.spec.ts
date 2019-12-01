import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Quotes from './Quotes.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
    state: {
        readQuotes: [
            {
                date: new Date(),
                text: 'I lik pizzas',
            },
        ],
        user: {
            name: 'John',
        },
        moods: [
            {
                date: new Date(),
                mood: {anger: 0},
            },
        ]
    },
});

const wrapper = shallowMount(Quotes, { mocks: { $store }, stubs: ['eva-icon', 'router-link'] });

describe('Quotes', () => {
    it('should render quotes', () => {
        expect(wrapper.find('.date')).toBeTruthy();
        expect(wrapper.contains('.quotes')).toBe(true);
    });
});

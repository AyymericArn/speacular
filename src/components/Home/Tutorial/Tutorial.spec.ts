import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Tutorial from './Tutorial.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const $store = new Vuex.Store({
    state: {
        user: null,
    },
    actions: {
        registerUser() {
            return null;
        },
    },
});

const wrapper = shallowMount(Tutorial, { mocks: { $store }, stubs: ['eva-icon', 'router-link'] });

describe('Tutorial', () => {
    it('should contain the prompt for name', () => {
        expect(wrapper.contains('.name-prompt')).toBe(true);
    });

    it('should set user name', () => {
        wrapper.find('[type="text"]').setValue('John');
        wrapper.find('form').trigger('submit');
        // wrapper.find('[type="submit"]').trigger('click');

        expect(wrapper.vm.$data.name).toBe('John');
    });

    it('should send user to stor', () => {
        const spy = spyOn($store, 'dispatch');
        wrapper.find('button').trigger('click');
        expect(spy).toHaveBeenCalledWith('registerUser', 'John');
    })
});

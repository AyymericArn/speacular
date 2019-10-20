import { MutationTree } from 'vuex';
import recorder from './recorder';

// TODO : set good state type
const mutations = recorder.mutations as MutationTree<any>;
let state: any;

describe('todos', () => {
    it('should be ok', () => {
        expect(1).toBe(1);
    });
});

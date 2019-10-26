import { MutationTree } from 'vuex';
import recorder from './recorder';

// TODO : set good state type
const mutations = recorder.mutations as MutationTree<any>;
let state: any;

describe('recorder store module', () => {
    it('should return mood result', () => {
        state = {};
        mutations.computeResult(state, {
            anger: 2,
            calm: 28,
            energy: 8,
            joy: 12,
            sorrow: 6,
        });
        expect(state.result).toBe(1);
    });
});

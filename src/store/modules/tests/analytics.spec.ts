import { MutationTree } from 'vuex';
import analytics from '../analytics';

const getters = analytics.getters;
let state: { moods: object[], user?: object | null, readQuotes?: object[] };

describe('analytics store module', () => {
    it('should compute moods', () => {
        state = {
            moods: [
                {
                    date: new Date(),
                    mood: {
                        calm: 50,
                        anger: 15,
                        joy: 17,
                        sorrow: 14,
                        energy: 18,
                    },
                },
            ],
        };
        const result = getters.computeMoods(null, null, state, null);
        expect(result).toEqual({
            calm: 50,
            anger: 15,
            joy: 17,
            sorrow: 14,
            energy: 18,
        });
    });
});

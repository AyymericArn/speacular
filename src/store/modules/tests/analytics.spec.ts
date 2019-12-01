import { MutationTree } from 'vuex';
import analytics from '../analytics';
import RootState from '@/models/IStore';

const getters = analytics.getters;
let state: RootState;

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
            user: {
                name: 'John',
            },
            readQuotes: [
                {
                    date: new Date(),
                    text: 'test',
                }
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

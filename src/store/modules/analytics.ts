import { Module } from 'vuex';
import RootState from '@/models/IStore';
import Mood from '@/models/IMood';

// TODO: replace object with good types
const analyticsModule: Module<{}, RootState> = {
    namespaced: true,
    getters: {
        computeMoods(state: {} | null, getters: null, rootState ) {
            if (rootState.moods.length > 0) {
                const synthese: Mood = rootState.moods.reduce((accumulator, value) => {
                    // spread to get the correct value without Vue stuff
                    for (const mood in {...value.mood}) {
                        if (value.mood.hasOwnProperty(mood)) {
                            accumulator.mood[mood] += value.mood[mood];
                        }
                    }
                    return accumulator;
                });
                const result: Mood["mood"] = {...synthese.mood};
                delete result.error;
                return result;
            } else {
                return { calm: 0, anger: 0, joy: 0, sorrow: 0, energy: 0 };
            }
        },
    },
};

export default analyticsModule;

import { Module } from 'vuex';

const analyticsModule: Module<any, any> = {
    namespaced: true,
    getters: {
        computeMoods(state, getters, rootState) {
            // console.log(rootState.moods)
            const synthese = rootState.moods.reduce((accumulator, value) => {
                // spread to get the correct value without Vue stuff
                for (const mood in {...value.mood}) {
                    if (value.mood.hasOwnProperty(mood)) {
                        accumulator.mood[mood] += value.mood[mood];
                    }
                }
                return accumulator;
            });
            const result = {...synthese.mood};
            delete result.error;
            return result;
        },
    },
};

export default analyticsModule;

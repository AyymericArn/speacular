import { Module } from 'vuex';

const analyticsModule: Module<any, any> = {
    namespaced: true,
    getters: {
        computeMoods(state, getters, rootState, rootGetters) {
            // return rootState.moods.reduce((accumulator, value) => {
            //     for (const mood in value.moods) {
            //         if (value.hasOwnProperty(mood)) {
            //             accumulator[mood] += value[mood];
            //             console.log(mood);
            //         }
            //         console.log('2', mood)
            //     }
            //     return accumulator;
            // });
            return {
                anger: 6,
                calm: 21,
                energy: 26,
                joy: 0,
                sorrow: 1,
            };
        },
    },
};

export default analyticsModule;

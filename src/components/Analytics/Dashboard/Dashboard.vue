<template>
    <canvas width="400" height="400" ref="infos"></canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import Chart from 'chart.js';

export default Vue.extend({
    data() {
        return {
            ctx: null as CanvasRenderingContext2D,
        };
    },
    computed: {
        moodDatas() {
            return this.$store.getters['analytics/computeMoods'];
        },
    },
    mounted() {
        const ctx = this.$refs.infos.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['calm', 'anger', 'joy', 'sorrow', 'energy'],
                datasets: [{
                    data: Object.values(this.moodDatas),
                    backgroundColor: 'transparent',
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                    lineTension: 0,
                }],
            },
            options: {
                legend: {
                    display: false,
                },
                // maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        },
                    }],
                },
            },
        });

        // this.$refs.infos.width = 400;
        // this.$refs.infos.height = 400;
        chart.render();
    },
});
</script>

<style lang="stylus">

canvas
    max-height 800px

</style>
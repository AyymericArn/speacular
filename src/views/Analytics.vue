<template>
    <div class="analytics">
        <router-link class="prev-section" :to="{name:'home'}"><eva-icon name="arrowhead-up" animation="flip" fill="dimgrey"></eva-icon></router-link>
        <h1>Analytics</h1>
        <h3>Overall stats</h3>
        <dashboard></dashboard>
        <router-link class="next-section" :to="{name:'history'}"><eva-icon name="arrowhead-down" animation="flip" fill="dimgrey"></eva-icon></router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dashboard from '@/components/Analytics/Dashboard/Dashboard.vue';

export default Vue.extend({
    components: {
        Dashboard
    },
    mounted() {
        console.log(this.$store.getters['analytics/computeMoods']);
    },
});
</script>

<style lang="stylus">

.analytics
    height 100vh
    display flex
    flex-direction column
    justify-content space-around

    h1, h3
        font-family 'Volkhov'
        text-align center

    h1
        font-size 2.4rem

    h3
        font-size 1rem

</style>
<template>
    <div class="history">
        <router-link class="prev-section" :to="{name:'analytics'}"><eva-icon name="arrowhead-up" animation="flip" fill="dimgrey"></eva-icon></router-link>
        <h1>Quotes History</h1>
        <quotes></quotes>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Quotes from '@/components/History/Quotes/Quotes.vue';

export default Vue.extend({
    components: {
        Quotes,
    },
});
</script>

<style scoped lang="stylus">

.history
    height 100vh
    display flex
    flex-direction column
    justify-content space-around

    h1
        font-family 'Volkhov'
        text-align center
        font-size 2.4rem

</style>
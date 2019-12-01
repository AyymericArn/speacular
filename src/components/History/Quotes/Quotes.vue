<template>
    <div class="quotes">
        <p class="quote" v-for="(quote, index) in quotes" :key="index">
            <span class="date">{{ new Date(quote.date).toLocaleDateString() }}</span>
            <span class="content">{{ quote.text }}</span>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Quote from '../../../models/IQuote';
export default Vue.extend({
    data(): {quotes: Quote[] } {
        return {
            quotes: this.$store.getters.orderedReadQuotes,
        };
    },
});
</script>

<style lang="stylus">

@import url('https://fonts.googleapis.com/css?family=Vollkorn&display=swap');

.quotes
    height 70vh
    margin 0 20px
    overflow-y scroll

    .quote
        margin 20px 0
        padding 15px
        border 2px solid lightgrey;
        border-radius 3px
        position relative

        .date
            position absolute
            background white
            top -10px
            padding 0 10px
            color #555

        .content
            font-style italic
            font-family 'Vollkorn'
            &::after
                content '"'
            &::before
                content '"'

</style>
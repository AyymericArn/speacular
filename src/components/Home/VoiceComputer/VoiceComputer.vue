<template>
    <div class="voice-computer">
        <div>
            <h1>Hello {{ $store.state.user.name }},</h1>
            <h2>how are you today ?</h2>
        </div>
        <transition name="fade" mode="out-in">
            <div class="loader" v-if="this.$store.state.recorder.isLoading">
                <eva-icon name="sync" animation="pulse" fill="#619df1"></eva-icon>
            </div>
        </transition>
        <div v-if="!isTesting && !this.$store.state.recorder.result" class="waves">
            <button @click="startRecord()" class="mic">
                <eva-icon name="mic" animation="pulse" fill="#619df1"></eva-icon>
            </button>
            <canvas ref="waves" class="js-canvas-wave"></canvas>
        </div>
        <div v-else-if="!this.$store.state.recorder.result" class="test">
            <p>{{ testContent }}</p>
            <button @click="evaluate()">Evaluate</button>
        </div>
        <div v-else class="result">
            {{ this.$store.state.recorder.result }}
            <canvas ref="waves" class="js-canvas-wave"></canvas>
        </div>
        <router-link class="next-section" :to="{name:'analytics'}"><eva-icon name="arrowhead-down" animation="flip" fill="dimgrey"></eva-icon></router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import waveGenerator from './waves';
import axios from 'axios';

export default Vue.extend({
    data() {
        return {
            animation: null,
            isTesting: false,
            testContent: '',
        };
    },
    methods: {
        startRecord() {
            this.$store.dispatch('recorder/startRecording');
            this.loadQuote();
        },
        loadQuote() {
            this.$store.dispatch('recorder/toggleLoad');
            axios.get('http://quotes.rest/qod?category=inspire', {
                headers: {
                    Accept: 'application/json',
                },
            }).then((res) => {
                this.$store.dispatch('recorder/toggleLoad');
                this.testContent = res.data.contents.quotes[0].quote;
                this.isTesting = true;
            });
        },
        evaluate() {
            this.$store.dispatch('recorder/stopRecording', this.testContent);
        },
    },
    mounted() {
        this.$store.dispatch('recorder/loadMediaRecorder').then(() => null);

        waveGenerator(
            this.$refs.waves,
            this.$refs.waves.getContext('2d'),
        );
    },
    beforeDestroy() {
        window.cancelAnimationFrame((window as any).animation);
    },
});
</script>

<style scoped lang="stylus">

.fade-enter-active, .fade-leave-active
    transition all .2s ease

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity 0

.voice-computer
    height 100vh
    display flex
    flex-direction column
    justify-content space-around

    @keyframes spin {
        from {transform: rotate(0deg);}
        from {transform: rotate(360deg);}
    }

    .loader
        animation spin 3s linear infinite reverse
        position absolute
        top 50vh
        left calc(50vw - 25px)

        svg
            width 50px
            height 50px

    h1, h2, .result
        font-family 'Volkhov'
        // margin auto
        text-align center

    h1
        font-size 2.4rem

    h2
        font-size 1.8rem

    .waves
        text-align center

        button
            border-radius 150px
            padding 16px 18px
            border #619df1 2px solid
            background #fcf9e6

    canvas
        position: absolute;
        left: 0;
        width: 100vw;
        top: 49vh;
        z-index -1
        clip-path: polygon(0 0, 100% 0, 100% 90%, 0 90%);

    .result
        padding: 0 100px;
        text-align: left;
        line-height: 1.35;
        font-size: 1rem;
        canvas
            opacity 0.4

</style>
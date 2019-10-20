<template>
    <div class="voice-computer">
        <div>
            <h1>Hello {{ $store.state.user.name }},</h1>
            <h2>how are you today ?</h2>
        </div>
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
            testContent: ''
        }
    },
    methods: {
        startRecord() {
            this.$store.dispatch('recorder/startRecording');
            this.loadQuote();
        },
        loadQuote() {
            axios.get('http://quotes.rest/qod?category=inspire', {
                headers: {
                    'Accept':'application/json',
                },
            }).then(res => {
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
        this.animation = waveGenerator(
            this.$refs.waves, 
            this.$refs.waves.getContext('2d'),
            this.$store.state.wavesMounted
        );
        console.log(this.$store.state.wavesMounted);    
        this.$store.dispatch('wavesMounted');
    },
    // TODO : fix bug
    // beforeDestroy() {
    //     window.cancelAnimationFrame(this.animation)
    // }
});
</script>

<style scoped lang="stylus">
.voice-computer
    height 100vh
    display flex
    flex-direction column
    justify-content space-around

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
            padding 15px 16px
            border #619df1 2px solid
            background white

    canvas
        position: absolute;
        left: 0;
        width: 100vw;
        top: 49vh;
        z-index -1
        clip-path: polygon(0 0, 100% 0, 100% 90%, 0 90%);

    .result
        padding: 0 30px;
        text-align: left;
        line-height: 1.35;
        font-size: 1rem;
        canvas
            opacity 0.4

</style>
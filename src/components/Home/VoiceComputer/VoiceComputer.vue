<template>
    <div class="voice-computer">
        <div>
            <h1>Hello {{ $store.state.recorder.user.name }},</h1>
            <h2>how are you today ?</h2>
        </div>
        <div class="waves">
            <button @click="record()" class="mic">
                microphone
            </button>
        </div>
        <router-link class="next-section" :to="{name:'analytics'}"><eva-icon name="arrowhead-down" animation="flip" fill="dimgrey"></eva-icon></router-link>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    methods: {
        record() {
            !this.$store.state.recorder.isRecording ? this.$store.dispatch('recorder/startRecording') : this.$store.dispatch('recorder/stopRecording');
            alert('record');
        },
    },
    mounted() {
        this.$store.dispatch('recorder/loadMediaRecorder').then(() => console.log(this.$store.state.recorder.mediaRecorder));
    },
});
</script>

<style scoped lang="stylus">
.voice-computer
    height 100vh
    display flex
    flex-direction column
    justify-content space-around

    h1, h2
        font-family 'Volkhov'
        margin auto
        text-align center

    h1
        font-size 2.4rem

    h2
        font-size 1.8rem

    .waves
        text-align center

</style>
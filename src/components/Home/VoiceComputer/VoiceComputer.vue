<template>
    <div>
        <h1>Hello {{ $store.state.recorder.user.name }}, how are you today ?</h1>
        <div class="waves">
            <button @click="record()" class="mic">
                microphone
            </button>
        </div>
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

<style lang="stylus">

</style>
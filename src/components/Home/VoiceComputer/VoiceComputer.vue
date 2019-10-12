<template>
    <div>
        <h1>Hello {{ $store.state.user.name }}, how are you today ?</h1>
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
            !this.$store.state.isRecording ? this.$store.dispatch('startRecording') : this.$store.dispatch('stopRecording');
            console.log(this.$store.state.isRecording);
            alert('record');
        },
    },
    mounted() {
        this.$store.dispatch('loadMediaRecorder').then(() => console.log(this.$store.state.mediaRecorder));
    },
});
</script>

<style lang="stylus">

</style>
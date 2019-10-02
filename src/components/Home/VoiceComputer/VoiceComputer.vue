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
            alert('record');
        },
    },
});
</script>

<style lang="stylus">

</style>
<template>
    <div class="tutorial">
        <div class="name-prompt" v-if="step === 0">
            <transition name="fade" mode="out-in">
                <div>
                    <h1>Hello,</h1>
                    <h2>What's your name ?</h2>
                    <form @submit.prevent="registerName" action="">
                        <input v-model="name" type="text" name="" id="">
                        <input type="submit" value="ok">
                    </form>
                </div>
            </transition>
        </div>
        <div v-else>
            <transition name="fade" mode="out-in">
                <div>
                    <ol>
                        <li>Get an inspiring quote</li>
                        <li>Test your reading</li>
                        <li>Let Speacular assert how your day will be going and give you some advice base on it !</li>
                        <li>Track the evolution of your everyday mood</li>
                        <li>Keep the quotes you liked the most</li>
                    </ol>
                    <button @click="go">Let's go</button>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    data() {
        return {
            name: '',
            step: 0,
        };
    },
    methods: {
        registerName() {
            // TODO : fix animation
            this.step++;
        },
        go() {
            this.$store.dispatch('registerUser', this.name);
        },
    },
});
</script>

<style scoped lang="stylus">

.tutorial
    font-family: Volkhov;
    line-height: 2.8rem;
    padding: 40px;
    font-size: 1.4rem;

    ol
        font-size: 1.2rem;
        list-style decimal

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0

</style>
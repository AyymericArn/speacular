<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <tutorial v-if="!$store.state.user"/>
      <voice-computer v-else />
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tutorial from '@/components/Home/Tutorial/Tutorial.vue'; // @ is an alias to /src
import VoiceComputer from '@/components/Home/VoiceComputer/VoiceComputer.vue'; // @ is an alias to /src
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'home',
  components: {
    Tutorial,
    VoiceComputer,
  },
  computed: {
    ...mapState('recorder', ['user']),
  },
});
</script>

<style lang="stylus" scoped>

.home
  height 100vh
  display flex
  flex-direction column
  justify-content space-around

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0

</style>
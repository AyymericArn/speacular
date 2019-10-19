<template>
  <div class="home">
    <tutorial v-if="!$store.state.recorder.user"/>
    <voice-computer v-else />
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

</style>
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <transition name="swipe" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="stylus">
.swipe-enter-active, .swipe-leave-active
  transition all .2s ease

.swipe-enter, .swipe-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
</style>

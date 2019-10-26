<template>
  <div class="about-wrapper">
    <div class="nav">
      <router-link to="/">
        <eva-icon name="arrow-ios-back"></eva-icon>
      </router-link>
    </div>
    <div class="about">
      <h1>About</h1>
      <p>Pedagogical work</p>
      <p>Services used :
        <ul>
          <li><a href="https://webempath.com/">Webempath</a>, service of voice emotions recognition</li>
          <li><a href="http://quotes.rest/">Quotes.REST</a>, free provider of daily quotes</li>
        </ul>
      </p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

.about
    margin-top: 65px;
    font-family: Volkhov;
    line-height: 2.8rem;
    padding: 40px;

.nav
  position fixed
  top 15px
  left 15px

h1
  font-size 1.8rem

ul
  list-style initial 

  li
    margin-left: 16px;

</style>
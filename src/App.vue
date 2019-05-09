<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--播放器全局组件-->
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import Player from 'components/player/player'
export default {
  components: {
    Player
  }
}
</script>

<style scoped lang="stylus">
</style>

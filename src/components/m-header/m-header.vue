<template>
<div class="header-box">
  <div class="m-header" :class="isBack == 2 ? 'bb' : 'aa'">
    <router-link to="/index" slot="left" v-show="isBack == 2">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
    </router-link>
    <h1 class="text">{{title}}</h1>
  </div>
  <div class="head-space"></div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['title', 'isBack'],
  methods: {
    back() {
      this.$emit('back')
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .header-box
    background: $color-background
    .aa
      background: $color-background
    .bb
      background: $color-background-d
    .head-space
      width: 100%
      height:44px
    .m-header
      width:100%
      position: fixed
      height: 44px
      text-align: center
      color: $color-text
      font-size: 0
      top:0
      left:0
      z-index:8
      .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-back
          display: block
          padding: 11px 10px
          font-size: $font-size-large-x
          color: $color-text
      .text
        display: inline-block
        vertical-align: top
        line-height: 44px
        font-size: $font-size-large
      .mine
        position: absolute
        top: 0
        right: 0
        .icon-mine
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme
</style>

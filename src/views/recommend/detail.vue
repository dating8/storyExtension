<template>
<div class="page">
  <m-header title="试听故事" isBack="2" @back="back"></m-header>
  <div class="container">
    <div class="episodes_bg_box">
      <div class="episodes_bg"></div>
    </div>
    <div class="episodes_detail_top c__flex c__middle">
      <img :src="story.storyImg" class="episodes_detail_top__pic" alt="">
      <div class="episodes_detail_top__info">
        <div class="episodes_detail_top__info__title">{{story.storyName}}</div>
        <div class="episodes_detail_top__info__author c__flex c__middle">
          <i class="icon"></i>
          <div class="authorArr">
            <span class="tx">{{story.anchor}}</span>
          </div>
        </div>
        <div class="episodes_detail_top__info__listeners c__flex c__middle">
          <i class="icon"></i>
          <span class="num">{{story.showPlayNum | numW}}</span>
        </div>
        <div class="episodes_detail_top__info__tag c__flex c__middle">
          <i class="icon"></i>
          <span class="num">{{story.labels | split}}</span>
        </div>
      </div>
    </div>
    <div class="summary_box">
      <div class="block-title-search">
        <span class="grad-text">故事介绍</span>
      </div>
      <div class="summary">{{story.shortInfo}}</div>
    </div>
  </div>
  <!--<div class="listen_panel">-->
    <!--<div class="panel_title">试听故事</div>-->
    <!--<div class="palyBox"></div>-->
    <!--<div class="bottom_btn">关注公众号收听全部章节</div>-->
  <!--</div>-->
</div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  components: {
    MHeader
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'story'
    ])
  },
  created() {
    this.selectPlay({
      list: this.story,
      index: 0
    })
  },
  mounted() {
    // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
    window.history.pushState(null, null, document.URL)
    // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
    window.addEventListener('popstate', this.onBrowserBack, false)
  },
  destroyed() {
    // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
    window.removeEventListener('popstate', this.onBrowserBack, false)
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    onBrowserBack() {
      this.setFullScreen(false)
      this.$router.push({
        path: `/index`
      })
    },
    ...mapActions([
      'selectPlay'
    ]),
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.container
  position: relative
  padding-bottom:220px
  .episodes_bg_box
    position:absolute
    left:0
    width:100%
    top:0
    min-height:206px
    overflow:hidden
    background-color:$color-background-d
    .episodes_bg
      position:absolute
      left:50%
      bottom:-45px
      width:800px
      height:236px
      border:65px solid
      border-color:transparent transparent #020215 transparent
      pointer-events:none
      z-index:1
      border-radius:100%
      transform:translate(-50%,0)
  .episodes_detail_top
    padding-top:18px
    position:relative
    z-index:1
    .episodes_detail_top__pic
      position:relative
      z-index:1
      width:105px
      height:125px
      display:block
      margin-left:17px
      border-radius:5px
    .episodes_detail_top__info
      position:relative
      z-index:1
      margin-left:17px
      padding-right:22px
      color:$color-text
      .episodes_detail_top__info__title
        font-size:18px
        margin-bottom:7px
        line-height:1.6
      .episodes_detail_top__info__author
        font-size:$font-size-small
        margin-bottom:10px
        .icon
          width:13px
          height:13px
          margin-right:10px
          bg-image('author')
          background-size: 100%
          background-repeat: no-repeat
      .episodes_detail_top__info__listeners
        font-size:$font-size-small
        margin-bottom:12px
        .icon
          width:13px
          height:13px
          margin-right:10px
          bg-image('view')
          background-size: 100%
          background-repeat: no-repeat
      .episodes_detail_top__info__tag
        font-size:$font-size-small
        font-weight:normal
        font-stretch:normal
        line-height:18px
        .icon
          width:13px
          height:13px
          margin-right:10px
          bg-image('tag')
          background-size: 100%
          background-repeat: no-repeat
  .summary_box
    position:relative
    z-index:5
    padding-top:25px
    .block-title-search
      margin:30px 15px 0px
      padding-bottom 15px
      font-size:$font-size-medium-x
      .grad-text
        grad-red()
    .summary
      margin-top:10px
      padding:0 15px 25px
      font-size:$font-size-small
      line-height:22px
      letter-spacing:0px
      color:$color-text-ll
      text-align:justify
.listen_panel
  position:fixed
  z-index:1
  bottom:0
  left:0
  right:0
  background-color:#23203a
  color:#fff
  box-sizing:border-box
  padding:15px
  .panel_title
    font-size:$font-size-small
    margin-bottom:12px
  .bottom_btn
    margin-top:15px
    height:50px
    border-radius:25px
    background-image:linear-gradient(-26deg, #d2161a 0%, #ff9166 100%)
    color:$color-text
    text-align:center
    line-height:50px
    font-size:$font-size-medium-x
</style>

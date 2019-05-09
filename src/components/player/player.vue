<template>
  <div class="player" v-if="playList.storyName">
    <div class="normal-player" v-show="fullScreen">
      <div class="listen_panel">
        <div class="panel_title">试听故事</div>
        <div class="palBox">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <!--播放进度条-->
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{duration == 0 ? '_:_' : format(duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" :class="disableCla">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCla">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCla">
              <i @click="next" class="icon-next"></i>
            </div>
          </div>
        </div>
        <div class="bottom_btn" @click="tapFollow">关注公众号收听全部章节</div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img :src="playList.storyImg" width="40" height="40" :class="cdCls">
      </div>
      <div class="text">
        <h2 class="name">{{playList.storyName}}</h2>
      </div>
      <div class="control">
        <!--阻止冒泡-->
        <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
      </div>
    </div>
    <audio ref="audio" :src="currentSong" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="ended"></audio>
    <div class="mask-box" v-if="isShow">
      <div class="mask-box-bg" @click="tapFollow"></div>
      <div class="mask_box_gzh">
        <div class="tit first">收听故事</div>
        <div class="tit">请先移步至公众号</div>
        <img src="https://zsstory.oss-cn-shenzhen.aliyuncs.com/xiaoChengXun/gzh_qrcode.jpg" alt="" class="code-icon">
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import ProgressBar from 'base/progressBar/progressBar'
export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      duration: 0,
      isShow: false
    }
  },
  computed: {
    cdCls() {
      return this.playing ? 'play' : 'pause'
    },
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon() {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    disableCla() {
      return this.songReady ? '' : 'disable'
    },
    percent() {
      return this.currentTime / this.duration
    },
    ...mapGetters([
      'fullScreen',
      'playList',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
      this.$router.push({
        path: `/detail/${this.playList.storyId}`
      })
    },
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing)
    },
    next() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.episodeUrl.length) {
        if (this.playList) {
          this.$refs.audio.currentTime = 0
        }
        this.currentTime = 0
        this.togglePlaying()
        return
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    prev() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        return false
      }
      this.setCurrentIndex(index)
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false
    },
    ready() {
      this.duration = this.$refs.audio.duration
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime
    },
    ended() {
      this.next()
    },
    format(interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    onProgressBarChange(percent) {
      this.$refs.audio.currentTime = this.duration * percent
      if (!this.playing) {
        this.togglePlaying()
      }
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    tapFollow() {
      this.isShow = !this.isShow
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (audio) {
          newPlaying ? audio.play() : audio.pause()
        }
      })
    }
  },
  components: {
    ProgressBar
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .player
    .normal-player
      position:fixed
      z-index:150
      bottom:0
      left:0
      right:0
      background-color:#23203a
      color:#fff
      box-sizing:border-box
      padding:15px
      .listen_panel
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
        .palBox
          .progress-wrapper
            display: flex
            align-items: center
            width: 100%
            margin: 0px auto
            padding: 10px 0
            .time
              color: $color-text
              font-size: $font-size-small
              flex: 0 0 30px
              line-height: 30px
              width: 30px
              &.time-l
                text-align: left
                margin-right: 15px
              &.time-r
                text-align: right
                margin-left: 15px
            .progress-bar-wrapper
              flex: 1
          .operators
            display: flex
            align-items: center
            .icon
              flex: 1
              color: $color-text
              &.disable
                color: $color-theme-d
              i
                font-size: 30px
            .i-left
              text-align: right
            .i-center
              padding: 0 20px
              text-align: center
              i
                font-size: 40px
            .i-right
              text-align: left
            .icon-favorite
              color: $color-sub-theme
        &.normal-enter-active, &.normal-leave-active
          transition: all 0.4s
          .top, .bottom
            transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        &.normal-enter, &.normal-leave-to
          opacity: 0
          .top
            transform: translate3d(0, -100px, 0)
          .bottom
            transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          grad-red()
          font-weight:normal
        .icon-mini
          font-size: 32px
    .mask-box-bg
      position:fixed
      width:100%
      display: block
      top:0
      bottom:0
      right:0
      left:0
      z-index:999
      background-color:rgba(0,0,0,.5)
     .mask_box_gzh
       width:280px
       height:300px
       position:fixed
       border-radius:10px
       background-color:#fff
       top:50%
       left:50%
       transform:translate(-50%,-50%)
       z-index: 1000
       .tit
         color:#121629
         font-size:$font-size-medium-x
         text-align:center
         line-height:25px
       .tit:nth-child(1)
         margin-top:20px
       .code-icon
         width:190px
         height:190px
         margin:0 auto
         display:block
         margin-top:10px
    @keyframes rotate
      0%
        transform: rotate(0)
      100%
        transform: rotate(360deg)
</style>

<template>
<div class="recommend-box">
  <m-header title="小声有声书推荐" isBack="1"></m-header>
  <div class="b2-head c__vertical c__flex c__center c__middle">
    <div class="b2-head-title">小声 · 有声书推荐</div>
    <div class="b2-head-count">已推荐24681人</div>
    <div class="b2-head-tel">商务合作：020-84536124</div>
  </div>
  <div class="wrapper">
    <div class="b2-title c__flex c__middle">
      <span class="grad-span">最新推荐</span>
      <i class="ico-new"></i>
    </div>
    <div class="b2-date">{{date}}</div>
    <div class="idx-books">
      <div class="item c__flex" v-for="item in list" :key="item.key" @click="selectItem(item)">
        <img v-lazy="item.storyImg" alt="" class="outer">
        <div class="content">
          <div class="title">{{item.storyName}}</div>
          <div class="two-ell">{{item.shortInfo}}</div>
          <div class="data">
            <i class="ico-earphone"></i>
            <span class="data-text">{{item.showPlayNum | numW}}</span>
            <i class="ico-earphone"></i>
            <span class="data-text">{{item.episodeNum||'0'}}集</span>
          </div>
        </div>
      </div>
    </div>
    <div class="b2-title c__flex c__middle">
      <span class="grad-span">往期推荐</span>
      <i class="ico-new"></i>
    </div>
    <div class="b2-date">{{date2}}</div>
    <div class="idx-books">
      <div class="item c__flex" v-for="item2 in list2" :key="item2.key" @click="selectItem(item2)">
        <img v-lazy="item2.storyImg" alt="" class="outer">
        <div class="content">
          <div class="title">{{item2.storyName}}</div>
          <div class="two-ell">{{item2.shortInfo}}</div>
          <div class="data">
            <i class="ico-earphone"></i>
            <span class="data-text">{{item2.showPlayNum | numW}}</span>
            <i class="ico-earphone"></i>
            <span class="data-text">{{item2.episodeNum||'0'}}集</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import {formatDate} from 'src/utils/utils.js'
import B2 from 'src/common/js/b2json.js'
import {mapMutations, mapActions} from 'vuex'
export default {
  components: {
    MHeader
  },
  data() {
    return {
      date: '',
      date2: '',
      list: [],
      list2: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      let newDate = new Date()
      let time = newDate.getTime()
      let date = newDate.getDate()
      let center = parseInt(B2.length / 2)
      if (!date % 2) {
        this.list = B2.slice(0, 3)
        this.list2 = B2.slice(3, center + 1)
      } else {
        this.list = B2.slice(center + 1, center + 1 + 3)
        this.list2 = B2.slice(center + 1 + 3)
      }
      this.date = formatDate(newDate, 'yyyy/MM/dd')
      this.date2 = formatDate((new Date(time - 8.64e7)), 'yyyy/MM/dd')
    },
    selectItem(item) {
      this.$router.push({
        path: `/detail/${item.storyId}`
      })
      this.setStory(item)
      this.selectPlay({
        list: item,
        index: 0
      })
    },
    ...mapActions([
      'selectPlay'
    ]),
    ...mapMutations({
      setStory: 'SET_STORY'
    })
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.recommend-box
  -webkit-overflow-scrolling: touch
  .b2-head
    position: relative
    width:345px
    height: 200px
    margin:15px auto;
    text-align: center
    color: $color-text
    font-size: 0
    bg-image('ab1')
    background-size: 100%
    background-repeat: no-repeat;
    background-position: center;
    .b2-head-title
      font-size:$font-size-large-x
    .b2-head-count
      font-size:$font-size-small
      opacity:0.8
      margin-top:12px
    .b2-head-tel
      position:absolute
      color:$color-text-d
      opacity:0.8
      font-size:$font-size-small
      white-space:normal
      right:15px
      bottom:15px
  .wrapper
    margin:0 15px
    padding-bottom: 45px
    .b2-title
      font-size:20px;
      margin-bottom:12px;
      .grad-span
        grad-red()
      .ico-new
        width:18px
        height:20px
        margin-left:5px
        bg-image('ico-new')
        background-size: 100%
        background-repeat: no-repeat
        background-position: center
    .b2-date
      font-size:$font-size-medium
      color:$color-text-l
      margin-bottom:17px
    .idx-books
      margin-top:0
      padding-bottom:15px
      .item
        padding:15px 10px
        box-sizing:border-box
        background-color:$color-highlight-background
        margin-bottom:10px
        border-radius:5px
        .outer
          width:110px
          height:110px
          display:block
          border-radius:5px
          margin-right:10px
        .content
          width:206px
          font-size:$font-size-small
          line-height:17px
          color:$color-text-ll
          position:relative
          .title
            no-wrap()
            color:$color-text
            font-size:$font-size-medium
            line-height:1.2
            padding-top:3px
            padding-bottom:10px
          .two-ell
            two-wrap()
          .data
            color:#838383
            font-size:$font-size-small
            position:absolute
            left:0
            bottom:0
            .ico-earphone
              width:11px
              height:11px
              margin-left:5px
              display:inline-block
              bg-image('ico-earphone-w')
              background-size: 100%
              background-repeat: no-repeat
              background-position: center
              vertical-align:middle
            .data-text
              display:inline-block
              margin-right:15px
              vertical-align:middle
              line-height:1.2
</style>

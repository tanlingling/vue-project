<template>
  <div class="header-detail" v-show="visible">
    <div class="name">{{seller.name}}</div>
    <div class="star-wp">
      <star :size=48 :score="seller.score"></star>
    </div>
    <div class="box discount-box">
      <div class="title">
        <span class="line"></span>
        <span class="text">优惠信息</span>
        <span class="line"></span>
      </div>
      <div class="info" v-if="seller.supports">
        <div class="detail" v-for="(item, index) in seller.supports" :key="index">
          <support-ico :size=2 :type="item.type"></support-ico>
          <span class="text">{{item.description}}</span>
        </div>
      </div>
    </div>
    <div class="box bulletin-box">
      <div class="title">
        <span class="line"></span>
        <span class="text">商家公告</span>
        <span class="line"></span>
      </div>
      <div class="info">{{seller.bulletin}}</div>
    </div>
    <span class="icon-close" @click="hide"></span>
  </div>
</template>

<script>
  import Star from 'components/star/star'
  import SupportIco from 'components/support-ico/support-ico'
  import PopupMixin from 'common/mixins/popup'

  export default {
    mixins: [PopupMixin],
    name:'header-detail',
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      },
      showDetail: {
        type: Boolean,
        default () {
          return true
        }
      }
    },
    components: {
      Star,
      SupportIco
    }
  }
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .header-detail
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    padding: 64px 36px 32px
    color: $color-white
    background-color: $color-background-s
    opacity: 1
    z-index: 200
    background-filter: blur(10px)
    .name
      font-size: $fontsize-large
      font-weight: 700
      margin-bottom: 16px
      text-align: center
    .star-wp
      margin-bottom: 28px
    .box
      .title
        position: relative
        display: flex
        align-items: center
        justify-content: center
        flex-wrap: nowrap
        margin-bottom: 24px
        .line
          flex: 0 0 112px
          width: 112px
          height: 1px
          background-color: $color-white-line
        .text
          font-size: $fontsize-small
          padding: 0 12px
      .info
        font-size: $fontsize-small
        padding: 0 12px
        .detail
          display: flex
          align-items: center
          margin-bottom: 12px
          .text
            margin-left: 6px
      &.bulletin-box
        .info
          line-height: 24px
    .icon-close
      position: absolute 
      bottom: 32px
      left: 50%
      font-size: $fontsize-large-xxxxx
      transform: translateX(-50%)
</style>
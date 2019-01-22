<template>
  <div class="header" @click="showDetail">
    <div class="content-wp">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
        <div class="support-count" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <div class="bulletin-wp">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar" width="100%" height="100%" alt="bg-avatar">
    </div>
  </div>
</template>

<script>
  import SupportIco from '../support-ico/support-ico'
  export default {
    name:'v-header',
    props:{
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      showDetail () {
        this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
          $props: {
            seller: 'seller'
          }
        })
        this.headerDetailComp.show()
      }
    },
    components: {
      SupportIco
    }
  }
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/mixin'
  @import '~common/stylus/variable'

  .header
    position: relative
    overflow: hidden
    color: $color-white
    background: $color-background-ss
    .content-wp
      position: relative
      display: flex
      align-items: center
      padding: 24px 12px 18px 24px
      .avatar
        flex: 0 0 64px
        border-radius: 2px
        margin-right: 16px
        overflow: hidden
      .content
        flex: 1
        .title
          display: flex
          align-items: center
          margin-bottom: 8px
          .brand
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            font-size: $fontsize-large
            font-weight: bold
            margin-left: 6px
        .description
          font-size: $fontsize-small
          margin-bottom: 10px
        .support
          display: flex
          align-items: center
          .text
            margin-left: 4px
            font-size: $fontsize-small-s
        .support-count
          position: absolute
          right: 12px
          bottom: 14px
          height: 24px
          display: flex
          align-items: center
          padding: 0 8px
          background-color: $color-background-sss
          border-radius: 100px
          .count
            font-size: $fontsize-small-s
            margin-right: 2px
    .bulletin-wp
      height:28px
      display: flex
      align-items: center
      flex-wrap: nowrap
      background-color: $color-background-sss
      .bulletin-title
        flex: 0 0 22px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        margin: 0 4px 0 12px
      .bulletin-text
        font-size: $fontsize-small-s
        margin-right: 4px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
      .icon-keyboard_arrow_right
        margin-right: 12px
    .bg
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: auto
      filter: blur(10px)
      z-index: -1
</style>
<template>
  <cube-scroll ref="scroll" :options="scrollOptions">
    <div class="seller-wp">
      <div class="seller-info">
        <div class="seller-ratings border-bottom-1px">
          <div class="ratings">
            <div class="name title">{{seller.name}}</div>
            <div class="star-wp">
              <star :size="36" :score="seller.score"></star>
              <span class="rating-count">({{seller.ratingCount}})</span>
              <span class="sell-count">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="collect" @click="collect">
            <span class="icon icon-favorite" :class="{on: favorite}"></span>
            <div class="text">{{collectText}}</div>
          </div>
        </div>
        <dl class="delivery-info">
          <div class="flex-item border-right-1px">
            <dt class="dt">起送价</dt>
            <dd class="dd">
              <span class="num">{{seller.minPrice}}</span>
              <span class="unit">元</span>
            </dd>
          </div>
          <div class="flex-item border-right-1px">
            <dt class="dt">商家配送</dt>
            <dd class="dd">
              <span class="num">{{seller.deliveryPrice}}</span>
              <span class="unit">元</span>
            </dd>
          </div>
          <div class="flex-item">
            <dt class="dt">平均配送时间</dt>
            <dd class="dd">
              <span class="num">{{seller.deliveryTime}}</span>
              <span class="unit">元</span>
            </dd>
          </div>
        </dl>
      </div>
      <split></split>

      <div class="bulletin-act">
        <div class="title">公告与活动</div>
        <div class="bulletin border-bottom-1px">{{seller.bulletin}}</div>
        <ul>
          <li class="border-bottom-1px" v-for="(support, index) in seller.supports" :key="index">
            <support-ico :size="3" :type="support.type"></support-ico>
            <div class="text">{{support.description}}</div>
          </li>
        </ul>
      </div>
      <split></split>

      <div class="seller-scene">
        <div class="title">商家实景</div>
        <cube-scroll class="img-wp" ref="picScroll" :options="picScrollOptions">
          <ul class="img-list">
            <li class="img-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <split></split>

      <div class="seller-about">
        <div class="title border-bottom-1px">商家信息</div>
        <ul class="info">
          <li class="item border-bottom-1px" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
  import Split from 'components/split/split'
  import Star from 'components/star/star'
  import SupportIco from 'components/support-ico/support-ico'
  import {saveToLocal, loadFromLocal} from 'common/js/storage'

  const KEY = 'favorite'

  export default {
    name:'',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        favorite: false,
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        },
        picScrollOptions: {
          scrollX: true,
          stopPropagation: true,
          directionLockThreshold: 0
        }
      }
    },
    created () {
      this.favorite = loadFromLocal(this.seller.id, KEY, false)
    },
    methods: {
      collect () {
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, KEY, this.favorite)
      }
    },
    computed: {
      seller () {
        return this.data.seller || {}
      },
      collectText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    components: {
      Split,
      Star,
      SupportIco
    },
    beforeMount() {},
    mounted() {},
    watch: {}
  }
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .seller-wp
    color: $color-background
    .title
      font-size: $fontsize-medium
      margin-bottom: 8px
    .seller-info
      padding: 18px
      .seller-ratings
        display: flex
        align-items: center
        justify-content: space-between
        padding-bottom: 18px
        .ratings
          text-align: left
          .star-wp
            display: flex
            align-items: center
            justify-content: flex-start
            <<< .star
              justify-content: flex-start
            .rating-count, .sell-count
              font-size: $fontsize-small-s
              color: $color-font-grey
            .rating-count
              padding: 0 12px 0 8px
        .collect
          text-align: center
          .icon
            display: inline-block
            font-size: $fontsize-large-xxx
            color: $color-font-light
            margin-bottom: 4px
            &.on
              color: $color-red
          .text
            font-size: $fontsize-small-s
            color: $color-font-grey
            min-width: 40px
      .delivery-info
        display: flex
        align-items: center
        padding-top: 18px
        .flex-item
          width: 33.33%
          text-align: center
          font-size: $fontsize-small-s
          box-size: border-box
          .dt
            margin-bottom: 4px
            color: $color-font-light
          .dd
            display: flex
            align-items: center
            justify-content: center
            vertical-align: baseline
            .num
              font-size: $fontsize-large-xxx
              color: $color-background
            .unit
              color: $color-font-grey
              padding-top: 6px
    .bulletin-act
      padding: 18px 18px 0 18px
      .bulletin
        padding: 0 12px 18px
        font-size: $fontsize-small
        color: $color-red
        line-height: 24px
        font-weight: 200
        white-space: normal
        text-align: justify
      ul
        li
          display: flex
          align-items: center
          padding: 18px 12px
          .text
            margin-left: 6px
            font-size: $fontsize-small
            line-height: 18px
            font-weight: 200
            color: $color-background
    .seller-scene
      padding: 18px
      .img-wp
        display: flex
        align-items: center
        .img-item
          margin-right: 6px
          display: inline-block
          &:last-child
            margin-right: 0
    .seller-about
      padding: 18px 18px 0 18px
      .item
        line-height: 18px
        padding: 18px 12px
        font-size: $fontsize-small
        color: $color-background
        font-weight: 200
</style>
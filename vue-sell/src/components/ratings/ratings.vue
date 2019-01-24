<template>
  <cube-scroll :options="scrollOptions" :data="computedRatings" ref="scroll">
    <div class="ratings">
      <div class="all-ratings-wp">
        <div class="rating-left">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="rating-right">
          <div class="star-wp">
            <span class="text">食品质量</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="star-wp">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="star-wp">
            <span class="text">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="ratings-list-wp">
        <rating-select
          @select="onSelect"
          @toggle="onToggle"
          :selectType="selectType"
          :onlyContent="onlyContent"
          :ratings="computedRatings"
          v-if="ratings.length"
        >
        </rating-select>
        <div class="rating-wrapper">
          <ul>
            <li
              v-for="(rating,index) in computedRatings"
              :key="index"
              class="rating-item border-bottom-1px"
            >
              <div class="avatar">
                <img width="28" height="28" :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="star-wrapper">
                  <star :size="24" :score="rating.score"></star>
                  <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span
                    class="item"
                    v-for="(item,index) in rating.recommend"
                    :key="index"
                  >
                    {{item}}
                  </span>
                </div>
                <div class="time">
                  {{format(rating.rateTime)}}
                </div>
              </div>
            </li>
          </ul>
        </div>     
      </div>
    </div>
  </cube-scroll>
</template>

<script>
  import { getRatings } from 'api'
  import Split from 'components/split/split'
  import RatingSelect from 'components/rating-select/rating-select'
  import Star from 'components/star/star'
  import ratingsMixin from 'common/mixins/ratings'

  export default {
    name:'ratings',
    mixins: [ratingsMixin],
    props:{
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        ratings: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        },
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      fetch () {
        if (!this.fetched) {
          this.fetched = true
          getRatings({
            id: this.seller.id
          }).then(ratings => {
            this.ratings = ratings
          })
        }
      }
    },
    computed: {
      seller () {
        return this.data.seller || {}
      }
    },
    components: {
      Split,
      RatingSelect,
      Star
    },
    beforeMount() {},
    mounted() {},
    watch: {}
  }
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .ratings
    .all-ratings-wp
      display: flex
      align-items: center
      padding: 18px 0
      .rating-left
        flex: 2
        text-align: center
        border-right: 1px solid $color-col-line
        .score
          font-size: $fontsize-large-xxx
          color: $color-orange
        .text
          font-size: $fontsize-small
          color: $color-background
          line-height: 18px
          padding: 6px 0 8px
        .rank-rate
          font-size: $fontsize-small-s
          color: $color-font-light
          line-height: 10px
          margin-bottom: 6px
      .rating-right
        flex: 3
        padding-left: 24px
        .star-wp
          display: flex
          align-items: center
          justify-content: flex-start
          margin-bottom: 8px
          font-size: $fontsize-small
          line-height: 18px
          .text
            color: $color-background
            margin-right: 12px
          .score
            color: $color-orange
            margin-left: 12px
          .delivery-time
            color: $color-font-light
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        &:last-child
          border-none()
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            height: auto
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: $fontsize-small-s
            color: $color-dark-grey
          .star-wrapper
            margin-bottom: 6px
            display: flex
            align-items: center
            .star
              margin-right: 6px
            .delivery
              font-size: $fontsize-small-s
              color: $color-light-grey
          .text
            margin-bottom: 8px
            line-height: 18px
            color: $color-dark-grey
            font-size: $fontsize-small
            white-space: normal
            text-align: justify
          .recommend
            display: flex
            align-items: center
            flex-wrap: wrap
            line-height: 16px
            .icon-thumb_up, .item
              margin: 0 8px 4px 0
              font-size: $fontsize-small-s
            .icon-thumb_up
              color: $color-blue
            .item
              padding: 0 6px
              border: 1px solid $color-row-line
              border-radius: 1px
              color: $color-light-grey
              background: $color-white
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: $fontsize-small
            color: $color-light-grey
</style>

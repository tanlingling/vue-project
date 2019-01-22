<template>
  <transition name="fade">
    <cube-popup
      v-show="visible"
      type="shop-cart-list"
      :mask-closable="true"
      :z-index="90"
      position="bottom"
      @mask-click="maskClick"
      ref="myPopup3"
    >
      <transition name="move">
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="emptyFoods">清空</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.name">
                <span class="name">{{food.name}}</span>
                <div class="right">
                  <span class="price">¥{{food.price * food.count}}</span>
                  <div class="cart-control-wp">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
  import CartControl from 'components/cart-control/cart-control'
  const EVENT_HIDE = 'hide'

  export default {
    name: 'shop-cart-list',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      show () {
        this.visible = true
      },
      hide () {
        this.visible = false
        this.$emit(EVENT_HIDE)
      },
      maskClick () {
        this.hide()
      },
      emptyFoods () {
        this.selectFoods = []
        this.hide()
      }
    },
    computed: {},
    components: {
      CartControl
    },
    beforeMount() {},
    mounted() {},
    watch: {}
  }
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable'
  .cube-shop-cart-list
    bottom: 48px
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all .3s ease-in-out
    .move-enter, .move-leave-active
      transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
      transition: all .3s ease-in-out
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background-color: $color-background-ssss
      .title
        float: left 
        font-size: $fontsize-medium
        color: $color-dark-grey
      .empty
        float: right
        color: $color-blue
        font-size: $fontsize-small
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: scroll
      background-color: $color-white
      .food
        display: flex
        align-items: center
        justify-content: space-between
        padding: 12px 0
        border-bottom: 1px solid $color-row-line
        .name
          font-size: $fontsize-medium
          color: $color-background
        .right
          display: flex
          align-items: center
          justify-content: flex-end
          .price
            padding: 0 12px 0 18px
            color: $color-red
            font-size: $fontsize-medium
            font-weight: bold

</style>
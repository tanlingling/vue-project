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
      <transition name="move"
        @after-leave="onLeave"
      >
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.name">
                <span class="name">{{food.name}}</span>
                <div class="right">
                  <span class="price">¥{{food.price * food.count}}</span>
                  <div class="cart-control-wp">
                    <cart-control @add="onAdd" :food="food"></cart-control>
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
  import PopupMixin from 'common/mixins/popup'
  const EVENT_LEAVE = 'leave'
  const EVENT_ADD = 'add'
  const EVENT_SHOW = 'show'

  export default {
    mixins: [PopupMixin],
    name: 'shop-cart-list',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      this.$on(EVENT_SHOW, () => {
        this.$nextTick(() => {
          this.$refs.listContent.refresh()
        })
      })
    },
    methods: {
      maskClick () {
        this.hide()
      },
      empty () {
        this.$createDialog({
          type: 'confirm',
          content: '清空购物车吗？',
          $events: {
            confirm: () => {
              this.selectFoods.forEach((food) => {
                food.count = 0
              })
              this.hide()
            }
          }
        }).show()
      },
      onLeave () {
        this.$emit(EVENT_LEAVE)
      },
      onAdd (target) {
        this.$emit(EVENT_ADD, target)
      }
    },
    components: {
      CartControl
    }
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
      // overflow: scroll
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
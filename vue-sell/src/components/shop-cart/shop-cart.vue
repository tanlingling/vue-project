<template>
  <div class="shop-cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="icon-wp">
          <div class="shop-icon">
            <span class="icon-shopping_cart"></span>
          </div>
        </div>
        <div class="total-price">¥{{totalPrice}}</div>
        <div class="desp">另需配送费¥{{deliveryPrice}}</div>
      </div>
      <div class="content-right" :class="payClass">
        {{payDesc}}
      </div>
    </div>
    <div class="ball-wp">
      <div v-for="(ball, index) in balls" :key="index">
        <transition
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Bubble from 'components/bubble/bubble'
  const BALL_LEN = 10
  const innerClsHook = 'inner-hook'

  function createBalls () {
    let ret = []
    for (let i=0; i < BALL_LEN; i++) {
      ret.push({
        show: false
      })
    }
    return ret
  }

  export default {
    name: 'shop-cart',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: createBalls()
      }
    },
    created () {
      this.dropBalls = []
      this.listFold = true
    },
    methods: {
      drop (el) {
        for (let i=0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        const ball = this.dropBalls[this.dropBalls.length - 1]
        const rect = ball.el.getBoundingClientRect()
        const x = rect.left - 32
        const y = -(window.innerHeight - rect.top - 22)
        el.style.display = ''
        el.style.transform = el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
      },
      dropping (el, done) {
        this._reflow = document.body.offsetHeight
        el.style.transform = el.style.webkitTransform = `translate3d(0, 0, 0)`
        const inner = el.getElementsByClassName(innerClsHook)[0]
        inner.style.transform = inner.style.webkitTransform = `translate3d(0, 0, 0)`
        el.addEventListener('transitionend', done)
      },
      afterDrop (el) {
        const ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }

      },
      toggleList () {
        if (this.listFold) {
          if (!this.totalCount) {
            return
          } else {
            this.listFold = false
            this._showShopCartList()
            this._showShopCartSticky()
          }
        } else {
          this.listFold = true
          this._hideShopCartList()
        }
      },
      _showShopCartList () {
        this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          $events: {
            hide: () => {
              this.listFold = true
            }
          }
        })
        this.shopCartListComp.show()
      },
      _showShopCartSticky () {
        this.showShopCartStickyComp = this.showShopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            minPrice: 'minPrice',
            deliveryPrice: 'deliveryPrice',
            // fold: 'listFold',
            list: this.shopCartListComp,
            sticky: 'sticky'
          }
        })
        this.showShopCartStickyComp.show()
      },
      _hideShopCartList () {
        const comp = this.sticky ? this.$parent.list : this.shopCartListComp
        comp.hide && comp.hide()
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (!this.totalPrice || this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    components: {
      Bubble
    }
  }
</script>

<style lang='stylus' scoped>
  .shop-cart
    height: 100%
    background-color: #141d27
    color: rgba(255, 255, 255, 0.4)
    .content
      height: 100%
      .content-left
        height: 100%
        position: relative
        display: flex
        align-items: center
        padding-left: 80px
        .icon-wp
          position: absolute 
          bottom: 0
          left: 12px
          padding: 6px
          border-radius: 100%
          background-color: #141d27
          overflow: hidden
          z-index: 11
          .shop-icon
            display: flex
            align-items: center
            justify-content: center
            width: 44px
            height: 44px
            color: $color-white
            border-radius: 100%
            font-size: $fontsize-large-xxx
            background-color: rgba(255, 255, 255, 0.2)
        .total-price
          line-height: 30px
          color: $color-white
          font-size: $fontsize-large
          padding-right: 12px
          margin-right: 12px
          border-right: 1px solid $color-white-line
        .desp
          font-size: $fontsize-large
      .content-right
        position: absolute 
        right: 0
        top: 0
        width: 105px
        height: 100%
        line-height: 48px
        text-align: center
        &.not-enough
          background-color: rgba(255, 255, 255, 0.2)
        &.enough
          background-color: $color-blue
    .ball-wp
      .ball
        position: fixed
        left: 32px 
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41) 
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: $color-blue
          transition: all 0.4s linear
</style>
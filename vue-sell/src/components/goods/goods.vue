<template>
  <div class="goods">
    <div class="scroll-nav-wp">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="slideOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico v-if="props.txt.type >= 1" :size="3" :type="props.txt.type"></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul class="foods-list">
            <li class="foods-item" v-for="(food, index) in good.foods" :key="index">
              <img class="food-img" :src="food.image">
              <div class="food-info">
                <h3 class="name">{{food.name}}</h3>
                <div class="description" v-if="food.description">{{food.description}}</div>
                <div class="sell-count">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new-price">¥{{food.price}}</span>
                  <del class="old-price" v-if="food.oldPrice">¥{{food.oldPrice}}</del>
                </div>
              </div>
              <div class="cart-control-wp">
                <cart-control @add="onAdd" :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>      
    </div>
    <div class="shop-cart-wp">
      <shop-cart ref="shopCart" 
        :select-foods="selectFoods" 
        :delivery-price="seller.deliveryPrice" 
        :min-price="seller.minPrice">
      </shop-cart>
    </div>
  </div>
</template>

<script>
  import { getGoods } from 'api'
  import ShopCart from 'components/shop-cart/shop-cart'
  import CartControl from 'components/cart-control/cart-control'
  import SupportIco from 'components/support-ico/support-ico'
  import Bubble from 'components/bubble/bubble'

  export default {
    name: 'goods',
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
        goods: [],
        slideOptions: {
          click: false,
          directionLockThreshold: 0
        }      
      }
    },
    methods: {
      fetch () {
        getGoods().then(goods => {
          this.goods = goods
        })
      },
      onAdd (el) {
        this.$refs.shopCart.drop(el)
      }
    },
    computed: {
      seller () {
        return this.data.seller
      },
      selectFoods () {
        let ret = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              ret.push(food)
            }
          })
        })
        return ret
      },
      barTxts () {
        let ret = []
        this.goods.forEach((good) => {
          const {type, name, foods} = good
          let count = 0
          foods.forEach((food) => {
            count += food.count || 0
          })
          ret.push({
            type,
            name,
            count
          })
        })
        return ret
      }
    },
    components: {
      ShopCart,
      CartControl,
      SupportIco,
      Bubble
    }
  }
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .goods
    position: relative
    height: 100%
    text-align: left
    .scroll-nav-wp
      position: absolute
      top: 0
      left: 0
      bottom: 48px
      width: 100%
      >>> .cube-scroll-nav-bar
        width: 80px
        overflow: hidden
        .cube-scroll-nav-bar-item
          position: relative
          padding: 0 12px
          height: 54px
          text-align: left 
          display: flex
          align-items: center
          white-space: normal
          line-height: 14px
          font-size: $fontsize-small
          background-color: $color-background-ssss
          &:after
            display: block
            content: ''
            width: 56px
            height: 1px
            position: absolute 
            bottom: 0
            left: 12px
            background-color: $color-row-line
        .cube-scroll-nav-bar-item_active
          background-color: $color-white
          color: $color-dark-grey
          height: 55px
          margin-top: -1px
          &:after
            display: none
        .text
          position: relative
          width: 56px
          vertical-align: middle
          .num
            position: absolute 
            right: -6px
            top: -8px
      >>> .cube-scroll-nav-panel-title
        height: 26px
        line-height: 26px
        background-color: $color-background-ssss
        padding-left: 14px
        border-left: 3px solid $color-col-line
        font-size: $fontsize-small
        color: $color-font-light
      >>> .cube-scroll-nav-panel
        .foods-item
          position: relative
          display: flex
          padding: 18px 0
          margin: 0 18px
          border-bottom: 1px solid $color-row-line
          overflow: hidden
          &:last-child
            border-bottom: 0
          .food-img
            flex: 0 0 60px
            width: 60px
            height: 60px
            margin-right: 10px
          .food-info
            .name
              padding: 2px 0 8px
              font-size: $fontsize-large
            .description
            .sell-count
              font-size: $fontsize-small-s
              color: $color-font-light
              margin-bottom: 8px
              span
                margin-right: 12px
            .price
              font-weight: bold
              .new-price
                color: $color-red
                font-size: $fontsize-large
                margin-right: 8px
              .old-price
                font-size: $fontsize-small-s
                color: $color-font-light
          .cart-control-wp
            position: absolute 
            bottom: 12px
            right: 0
    .shop-cart-wp
      position: absolute 
      bottom: 0
      left: 0
      width: 100%
      height: 48px
      z-index: 100
</style>

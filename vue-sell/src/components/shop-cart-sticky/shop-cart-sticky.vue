<template>
  <div class="shop-cart-sticky" v-show="visible">
    <shop-cart 
      ref="shopCart" 
      :select-foods="selectFoods" 
      :delivery-price="deliveryPrice" 
      :min-price="minPrice"
      :fold="fold"
      :sticky="true">
    </shop-cart>
  </div>
</template>

<script>
  import ShopCart from 'components/shop-cart/shop-cart'

  export default {
    name: 'shop-cart-sticky',
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
      },
      fold: {
        type: Boolean,
        default: true
      },
      list: {
        type: Object,
        default () {
          return {}
        }
      },
      sticky: {
        type: Boolean,
        default: true
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
      }
    },
    components: {
      ShopCart
    }
  }
</script>

<style lang='stylus' scoped>
  .shop-cart-sticky
    position: absolute 
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 999
</style>
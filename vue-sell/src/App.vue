<template>
  <div id="app">
    <v-header :seller="seller" ></v-header>
    <div class="tab-wp">
      <tab :tabs="tabs" :initialIndex=0></tab>
    </div>
  </div>
</template>

<script>
  import VHeader from './components/v-header/v-header'
  import Seller from './components/seller/seller'
  import Goods from './components/goods/goods'
  import Ratings from './components/ratings/ratings'
  import Tab from './components/tab/tab'
  import { getSeller } from 'api'

  export default {
    name: 'app',
    data () {
      return {
        seller: {},
        goods: {},
        ratings: {},
        showDetail: true
      }
    },
    created () {
      this._getSeller()
    },
    methods: {
      _getSeller () {
        getSeller().then((seller) => {
          this.seller = seller
        })
      }
    },
    computed: {
      tabs () {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller
            }
          },
          {
            label: '评价',
            component: Ratings,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          }
        ]
      }
    },
    components: {
      VHeader,
      Tab,
      Seller,
      Goods,
      Ratings
    }
  }
</script>

<style lang="stylus" scoped>
  #app
    .tab-wp
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>

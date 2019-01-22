const path = require('path')
// const express = require('express')
// const app = express()
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings
function resolve (dir) {
  return path.join(__dirname, dir)
}
// var apiRoutes = express.Router()
// apiRoutes.get('/seller', function (req, res) {
//   res.json({
//     errno: 0,
//     data: seller
//   })
// })
// apiRoutes.get('/goods', function (req, res) {
//   res.json({
//     errno: 0,
//     data: goods
//   })
// })
// apiRoutes.get('/rating', function (req, res) {
//   res.json({
//     errno: 0,
//     data: ratings
//   })
// })
// app.use('/api', apiRoutes)


module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  }
}

# sell

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

 
### 将打包后的文件部署到本地服务器上查看效果
1. python -m SimpleHTTPServer 8088 (dist目录下执行命令)
启动一个python服务器打开打包后的页面

2. 打包后的页面接口报404问题
新建prod.server.js文件，通过express对接口做处理

再执行node prod.server.js
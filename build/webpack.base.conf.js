'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


//webpack 基本配置
module.exports = {
  context: path.resolve(__dirname, '../'),
  //入口配置
  entry: {
    app:['babel-polyfill','./src/main.js']
  },
  // 输出配置
  output: {
    path: config.build.assetsRoot, // 输出目录 根目录下会有一个dist目录存放输出的文件
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'  // 静态资源绝对路径
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 代码中通过require或者ES6中import引入的模块的配置
  resolve: {
    extensions: ['.js', '.vue', '.less', '.css', '.scss', '.json'], //自动补全文件后缀
    //别名，引用资源时可缩短字符串长度
    alias: { 
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'static': path.resolve(__dirname, '../static'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 30000, //当图片的文件大小小于30kb的时候，会生成一个base64串打包到js文件里；超过10kb的话，就会单独生成一个文件
          name(file){
            return utils.keepAssetsPath({
                // 打包后文件名
                name: '[name].[hash:7].[ext]',
                // 图片文件夹所在父级的绝对路径
                assetsPath: resolve('src/assets'),
                // 图片文件绝对路径，不需要修改
                file: file
            })
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
      // {
      //   test:/\.css$/,
      //   loader:['style-loader','css-loader']
      // },
      // {
      //   test:/\.less$/,
      //   loader:['style-loader','css-loader','less-loader']
      // },
      // {
      //   test:/\.scss$/,
      //   loader:['style-loader','css-loader','sass-loader']
      // }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

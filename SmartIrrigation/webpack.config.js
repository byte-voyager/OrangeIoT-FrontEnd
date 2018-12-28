const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const config = {
  entry: {// 打包入口文件
    index: './src/entry/index.js', // 首页
    login: './src/entry/login.js', // 登陆页面
    vendors: ['moment', 'axios', 'vue', 'vue-route', 'vuex']
  },
  output: {// 打包到哪里
    filename: 'js/[name]-[chunkhash].js', // 配置输出的文件名 chunkhash是文件的hash
    publicPath: '/', // 不设置 在打包图片的时候路径会变为css/asserts/sss.png
    // path: './dist' // 必须是绝对路径
    path: path.join(__dirname, './dist') // 输出到哪个文件夹
  },
  module: {
    rules: [
      {
        test: /\.css$/, use: ExtractTextPlugin.extract({ // 使用css分离插件
          fallback: "style-loader",
          use: "css-loader"
        })
      }, // css文件
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']}, // sass
      {
        test: /\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
        loader: 'url-loader',
        options: {limit: 96, name: 'assets/[name].[ext]'}
      }, // css图片url 单位 byte
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}, // js高级语法
      {test: /\.vue$/, use: 'vue-loader'}, // vue 组件文件
    ]
  },
  resolve: {
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js' // 配置import Vue 导入的文件
    }
  },
  plugins: [
    new ExtractTextPlugin("css/style-[chunkhash].css"), // css 提取

    new VueLoaderPlugin(), // make sure to include the plugin for the magic
    new HtmlWebpackPlugin({ // 不用手动修改打包好的html 配置index.html
      filename: 'index.html', template: 'src/index.html', chunks: ['index', 'manifest','vendors']
    }),
    new HtmlWebpackPlugin({  // 不用手动修改打包好的html 配置login.html
      title: '登陆路由测试',
      filename: 'login.html',
      template: 'src/login.html',
      chunks: ['login', 'manifest','vendors']
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   //manifest 清单，用来记录使用者和第三方包的依赖关系
    //   names:['vendors','manifest']
    // }),

  ],
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
}
module.exports = config  // 导出对象 ES6
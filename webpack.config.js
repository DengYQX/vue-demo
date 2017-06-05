var path = require('path')
var webpack = require('webpack')

//独立样式文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 动态生成模板
var HtmlWebpackPlugin = require("html-webpack-plugin");
// 在命令行 输入  “PRODUCTION=1 webpack --progress” 就会打包压缩，并且注入md5戳 到 d.html里面
var production = process.env.PRODUCTION;

var plugins = [

];

var outPath = path.resolve(__dirname+'/../', './WebContent');
var srcPath = './';
var fileArr = ['main'];
var cssArr = ['main'];

for (var i = 0 ;i < fileArr.length; i++) {
    var fileName = fileArr[i];
    plugins.push( new HtmlWebpackPlugin({
      language : '<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>',
      session : '<%session.invalidate();session = request.getSession(true); %>',
      include : '<%@ include file="/Resources/jspf/top.jspf"%>',
      filename:outPath + '/' + fileName + '.jsp',
      template:srcPath + fileName +'.html',
      hash:true,
      inject:true
    }));
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname+'/../', './WebContent/Resources/h5/dist/'),
    publicPath: "Resources/h5/dist/",
    filename: production ? "js/[name].js" : "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins : plugins,
  devtool: '#source-map'
}
const path = require('path');//引入node中的path模块
const webpack = require("webpack");//引入webpack
const HtmlWebpackPlugin = require("html-webpack-plugin");//引入html-webpack-plugin插件,作用是添加模板到编译完成后的dist的文件里面
const CleanWebpackPlugin = require("clean-webpack-plugin");//引入clean-webpack-plugin插件，作用是清除dist文件及下的内容，因为每次编译完成后都会有一个dist文件夹存放静态文件，所以需要清除上次的dist文件
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");//引入extract-text-webpack-plugin插件，作用是把css文件单独存为一个文件，如果不用插件，css会以style标签的方式插入html中
 
 
const config= {
  entry: {                        //入口文件（这是多页面配置）
 
      a:'./src/page1/a.js',   //index页面入口
      b:'./src/page2/b.js'   //page1页面入口
 
 
  },
  output: {                               //出口文件配置
      filename: './[name]/[name].js',     //出口文件存放位置，[name]代表块级文件流的名字，如入口文件中的a,b，最终会[name]的值就会变成a,b。目的是为了让每个页面在其单独的文件夹内
      path: path.resolve(__dirname, 'dist'), // 新建dist文件夹存放的位置，__dirname表示当前环境下的绝对路径
  },
 
 
 
  plugins:[                                   //webpack插件部分
 
      //分割css插件
      new ExtractTextWebpackPlugin({
 
          filename:"[name]/[name].css",//制定编译后的目录
          allChunks:true,//把分割的块分别打包
 
      }),
 
      //配置html模板，因为是多页面，所以需配置多个模板
      new HtmlWebpackPlugin({
 
          title:'测试',//html标题
          filename:'./a/a.html',//文件目录名
          template:'./src/page1/a.html',//文件模板目录
          hash:true,//是否添加hash值
          chunks:['a'],//模板需要引用的js块，vendors是定义的公共块，index是引用的自己编写的块
 
      }),
 
      new HtmlWebpackPlugin({
 
          title:'页面一',
          filename:'./b/b.html',
          template:'./src/page2/b.html',
          hash:true,
          chunks:['b'],
 
      }),
 
 
      // 每次清空dist目录
      new CleanWebpackPlugin(['dist']),
 
  ],
 
  module:{
 
      rules:[
 
          {test:/\.css/,use:ExtractTextWebpackPlugin.extract({use:['css-loader']},)},//带css的css编译
          {test:/\.scss/,use:ExtractTextWebpackPlugin.extract({fallback:"style-loader",use:['css-loader','sass-loader']},)},//带scss的css编译
          {test:/\.(svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,use:[{loader:'file-loader',options: {outputPath: 'assets/'}}]},//图片和字体加载
          {test: /\.png$/, use: {loader:"url-loader",options:{mimetype:"image/png",limit:"4096"}}},//如果有png格式的图片，超过4M直接转化为base64格式
          {test: /\.html$/, use: {loader:'html-loader',  options: {           //打包html文件
                      minimize: true, //是否打包为最小值
                      removeComments: true,//是否移除注释
                      collapseWhitespace: true,//是否合并空格
                  }}},
 
 
      ],
 
 
  },
 
 
};
 
 
module.exports = config
————————————————
版权声明：本文为CSDN博主「长风携水」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/talen123/java/article/details/80775674
/*为了方便开发和生产环境的切换,我们再新建一个用于生产环境的配置文件*/
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaseConfig = require('./webpack.config.js');

//清空配置插件列表  webpack.config.js
webpackBaseConfig.plugins = [];
module.exports = merge(webpackBaseConfig,{
    output:{
        publicPath:"/dist/",
        //将入口文件重命名为带有20位hash值的唯一文件
        filename:"[name].[hash].js"
    },
    plugins:[
        //提取css并命名
        new ExtractTextPlugin({
            filename:"[name].[hash].css",
            allChunks:true
        }),
        //定义当前node环境为生产环境
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:"'production'"
            }
        }),
        //压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        //提取模板，并保存入口html文件
        new HtmlWebpackPlugin({
            filename:"../index_prod.html",
            template:"./index.ejs",
            inject:false
        })
    ]
})
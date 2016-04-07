/**
 * @file
 * Created by wangzhicheng on 16/3/15.
 */



var webpack = require('webpack');
var getEntry = require('./getEntry.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entry = getEntry();
module.exports = {
    //devtool: 'source-map',
    devtool: false,
    entry: entry,
    output: {
        path: __dirname + '/build/',
        filename: "[name]/[name]-[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],

    plugins: [
        new webpack.BannerPlugin("Copyright Mrluobo"),


        new ExtractTextPlugin("style.css"),
        //new ExtractTextPlugin("[name]-[hash].css"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: 2 // 当文件 出现超过两次时 打包进入common模块
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + "/index.html",
            chunks: ['index', 'common'],
            inject: true,    //允许插件修改哪些内容，包括head与body
            hash: true,
        })
        //new webpack.ProvidePlugin({
        //    $: "jquery" // 当 key值被当作变量引用时   自动加载模块.
        //})
    ]
};

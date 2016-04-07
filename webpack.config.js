/**
 * @file
 * Created by wangzhicheng on 16/3/15.
 */



var webpack = require('webpack');
var getEntry = require('./getEntry.js');

var HtmlWebpackPlugin = require('html-webpack-plugin');



var entry = getEntry();

module.exports = {
    devtool: 'source-map',
    entry: entry,
    output: {
        path: __dirname + '/build',
        filename: "[name]-[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css?modules!postcss"
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
                //,
                //query: {
                //    presets: ['es2015', 'react']
                //}
            }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    devServer: {
        contentBase: ".",
        colors: true,
        historyApiFallback: true,
        inline: true,
        host: 'dev.map.baidu.com',
        port: '8080',
        hot: true

    },
    plugins: [
        new webpack.BannerPlugin("Copyright Mrluobo"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + "/index.html",
            chunks: ['index', 'common'],
            inject: true,    //允许插件修改哪些内容，包括head与body
            hash: true,
        })
    ]
};

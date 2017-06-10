const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});
const ExtractTextPluginConfig = new ExtractTextPlugin("index_bundle.css");

module.exports = {
    entry: [
        './src/app.js',
        './src/styles/app.css'
    ],
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    devtool: "source-map",
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
        }]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        ExtractTextPluginConfig
    ]
};
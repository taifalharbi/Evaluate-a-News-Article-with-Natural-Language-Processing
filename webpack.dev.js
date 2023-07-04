const path = require('path')
//to use webpack
const webpack = require('webpack')
//to handle html from webpack 
const HtmlWebPackPlugin = require("html-webpack-plugin")
//to delete unused files 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
        //when use npm run build-dev ..this config file that will execute 
    mode: 'development',
    
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {   //loader deal with js files to make browser understand any version of js"es6 ,es5 .."
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {    //css loader  that deal with scss &css ..convert scss to css in browser side &minimize style files size 
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
        ]
    },
    plugins: [
        //html plugin
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]

}
/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'hfm.js',
        library: 'Hfm',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel' }
        ]
    },
    babel: {
        loose: 'all'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ],
    devtool: 'source-map'
}

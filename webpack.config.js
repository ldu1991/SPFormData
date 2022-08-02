const path = require('path');
const webpack = require('webpack');
const config = require('config');

/*-------------------------------------------------*/

module.exports = {
    // webpack optimization mode
    mode: 'production', // development

    // entry file(s)
    entry: './src/sp-form-data.js',

    // output file(s) and chunks
    output: {
        library: 'SPFormData',
        libraryTarget: 'umd',
        globalObject: '(typeof self !== "undefined" ? self : this)',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: 'sp-form-data.js',
        publicPath: config.get('publicPath')
    },

    // module/loaders configuration
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },

    plugins: [

    ],

    // development server configuration
    /*devServer: {

        // must be `true` for SPAs
        historyApiFallback: true,

        // open browser on server start
        open: config.get('open')
    },*/

    // generate source map
    //devtool: ( 'production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map' ),
};

const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const now = moment().format('MMMM DD, YYYY');

const TerserPlugin = require('terser-webpack-plugin');

const PACKAGE = require('./package.json'),
    version = PACKAGE.version,
    description = PACKAGE.description,
    author = PACKAGE.author,
    homepage = PACKAGE.homepage;

const BannerPlugin = new webpack.BannerPlugin({
    banner: `/*!
 * SPFormData ${version}
 * ${description}
 * ${homepage}
 *
 * Copyright 2022 ${author}
 *
 * Released under the BSD License
 *
 * Released on: ${now}
 */`,
    raw: true
});

module.exports = {
    entry: {
        spFormData: './src/spFormData.js', 'spFormData.min': './src/spFormData.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'SPFormData',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
                extractComments: false,
                terserOptions: {
                    ecma: 5
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [BannerPlugin]
};

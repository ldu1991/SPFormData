const path                  = require('path');
const webpack               = require('webpack');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const moment                = require('moment');
const now                   = moment().format('MMMM DD, YYYY');

const TerserPlugin          = require('terser-webpack-plugin');

const PACKAGE               = require('./package.json'),
    version                 = PACKAGE.version,
    description             = PACKAGE.description,
    author                  = PACKAGE.author,
    homepage                = PACKAGE.homepage;

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
    mode: "production",
    entry: {
        spFormData: './src/spFormData.js', 'spFormData.min': './src/spFormData.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: {
            name: 'SPFormData',
            type: 'umd',
            umdNamedDefine: true,
            export: 'default'
        }
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
    plugins: [
        new CleanWebpackPlugin(),
        BannerPlugin
    ]
};

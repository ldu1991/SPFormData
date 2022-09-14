const path                  = require('path');
const webpack               = require('webpack');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const moment                = require('moment');
const now                   = moment().format('MMMM DD, YYYY');
const HtmlWebPackPlugin     = require('html-webpack-plugin');

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

module.exports = (env) => {
    let arr = {
        mode: env.production ? "production" : "development",
        entry: env.production ?
            {spFormData: './src/spFormData.js', 'spFormData.min': './src/spFormData.js'} :
            {spFormData: './src/spFormData.js', app: './demo/app.js'},
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
        plugins: env.production ?
            [new CleanWebpackPlugin(), BannerPlugin] :
            [new HtmlWebPackPlugin({
                template: path.resolve(__dirname, './demo/index.html'),
                filename: 'index.html'
            })]
    }
    if (env.production) {
        arr.optimization = {
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
        }
    }
    if (!env.production) {
        arr.devServer = {
            open: true,
            port: 3000,
            hot: false
        }
    }

    return arr
};

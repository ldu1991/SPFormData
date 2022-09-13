const path                  = require('path');
const HtmlWebPackPlugin     = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        spFormData: './src/spFormData.js',
        app: './demo/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        library: 'SPFormData',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        libraryExport: 'default'
    },
    devServer: {
        open: true,
        port: 3000,
        hot: true
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
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, './demo/index.html'),
            filename: 'index.html'
        })
    ]
};

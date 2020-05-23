const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: {
                    loader: "babel-loader"
                }, // весь JS обрабатывается пакетом babel-loader
                exclude: /node_modules/, // исключает папку node_modules
            },

            {
                test: /\.css$/, // применять это правило только к CSS-файлам
                use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: './images/',
                        esModule: false,
                    },
                }, ],
            },
            {
                test: /\.(ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: './fonts/',
                        esModule: false,
                    },
                }, ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: "image-webpack-loader",
                    options: {
                        name: "[path][chunkhash].[ext]",
                        bypassOnDebug: true,
                        disable: false,
                    },
                }, ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "./index.[chunkhash].css",
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ["default"],
            },
            canPrint: true,
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: "./src/index.html",
            filename: "index.html",
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }),
    ],
}
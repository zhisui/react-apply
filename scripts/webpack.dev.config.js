const path = require('path')
const isDevMod = process.env.NODE_ENV === 'development'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        port: 8888,
    },
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js',
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
        // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
        extensions: ['.js', '.json', '.ts', '.tsx','.scss'],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                parallel: true, //开启多进程并行压缩
                terserOptions: {
                    output: {
                        comments: false, //去除注释
                    },
                },
                extractComments: false, // 不提取注释到单独的文件
            }),
        ],
    },

    plugins: [
        new CleanWebpackPlugin(), //打包之前清除之前的打包文件
        new HtmlWebpackPlugin({
            //将打包后的资源注入到index.html文件内
            template: path.resolve(__dirname, '../public/index.html'), // 使用自定义模板
        }),
        new MiniCssExtractPlugin({
            //将css输出到单独的文件
            filename: isDevMod ? 'css/style.css' : 'css/style.[contenthash].css',
            chunkFilename: isDevMod ? 'css/style.[id].css' : 'css/style.[contenthash].[id].css',
        }),
        new CssMinimizerPlugin({
            //压缩减少css文件内容
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        discardComments: { removeAll: true },
                    },
                ],
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /.(jsx?)|(tsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                                    useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                                    corejs: 3, // 使用 core-js@3 版本
                                },
                            ],
                            ['@babel/preset-typescript'],
                            ['@babel/preset-react'],
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader', // 将 CSS 文件解析成js后，使用 import 加载，并且返回 CSS 代码
                        options: {
                            sourceMap: false,
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[name]_[local]_[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'sass-loader', // 将 Sass 编译为 CSS
                        options: {
                            sourceMap: false,
                        },
                    },
                ],
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg|webp)$/i,
            //     type: 'asset',
            //     parser: {
            //         dataUrlCondition: {
            //             maxSize: 25 * 1024, // 25kb
            //         },
            //     },
            //     generator: {
            //         filename: 'assets/image/[name].[hash:8][ext]',
            //     },
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname,'../src/assets/image')],
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: '[name].[hash:4].[ext]',
                  outputPath: '/image'
                }
              },
        ],
    },
}

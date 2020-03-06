const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = [{
    name: 'css',
    entry: './build/less/Clarity.min.less',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'Clarity.min.less.js'
    },
    module: {
      rules: [
        {
            test: /\.less/,
            use: [MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            }, {
              loader: 'less-loader',
            }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]',
                }
            }],
        },
      ],
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'Clarity.min.css',
        chunkFilename: '[id].css',
    })],
  },
  {
    name: 'lessout',
    entry: './build/less/Clarity.min.less',
    output: {
        path: path.join(__dirname,'out'),
        filename: 'Clarity.min.less.js'
    },
    module: {
      rules: [
        {
            test: /\.less/,
            use: [MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            }, {
              loader: 'less-loader',
            }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]',
                }
            }],
        },
      ],
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'Clarity.min.css',
        chunkFilename: '[id].css',
    })],
  },  
  {
    name: 'js',
    entry: './build/ts/Clarity.min.ts',
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'Clarity.min.js'
    },
    module: {
      rules: [
        {
            test: /\.ts/,
            use: [{
              loader: 'ts-loader',
            }]
        },
        {
            test: /\.vue/,
            use: [{
              loader: 'vue-loader',
            }]
        },
      ],
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
    new VueLoaderPlugin()],
  },
  {
    name: 'tsout',
    entry: './build/ts/Clarity.min.ts',
    output: {
        path: path.join(__dirname,'out'),
        filename: 'Clarity.min.js'
    },
    module: {
      rules: [
        {
            test: /\.ts/,
            use: [{
              loader: 'ts-loader',
            }]
        },
        {
            test: /\.vue/,
            use: [{
              loader: 'vue-loader',
            }]
        },
      ],
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
    new VueLoaderPlugin()],
  },
  {
    name: 'jsout',
    entry: './build/entry.js',
    output: {
        path: path.join(__dirname,'out'),
        filename: 'entry.js'
    },
  },
  {
    name: 'html',
    entry: './build/index.html',
    output: {
        path: path.join(__dirname,'out'),
        filename: 'html.js'
    },
    module: {
      rules: [
        {
            test: /\.html/,
            use: ['file-loader?name=[name].[ext]', 
            'extract-loader',
            {
                loader:'html-loader',
                options: {
                    minimize: true,
                }
            }],
        },
        {
            test: /\.(png|svg|jpg|gif|ico)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: './images/[name].[ext]',
                }
            }],
        },
        {
          test: /\.ts/,
          use: [{
            loader: 'ts-loader',
          }]
          },
          {
              test: /\.vue/,
              use: [{
                loader: 'vue-loader',
              }]
          },
      ],
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
  }),
  new VueLoaderPlugin()],
  }
];
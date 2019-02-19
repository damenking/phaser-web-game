const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'project.bundle.js',
        // comments: false
    },
    module: {
        rules: [
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
          }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),
        
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          // sourceMap: false,
          // compress: {
          //   sequences: true,
          //   dead_code: true,
          //   conditionals: true,
          //   booleans: true,
          //   unused: true,
          //   if_return: true,
          //   join_vars: true,
          //   drop_console: true
          // },
          // mangle: {
          //   except: ['$super', '$', 'exports', 'require']
          // },
          extractComments: true,
        })
      ],
    },
};

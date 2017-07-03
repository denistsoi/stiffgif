const path = require('path');

module.exports = {

  watch: true,

  target: 'electron',

  entry: `${__dirname}/src/script.js`,

  output: {
    path: __dirname + '/public',
    publicPath: '/build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
    extensions: ['*', '.js', '.vue', 'json']
  }

}
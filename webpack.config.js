module.exports = {
  watch: true,
  target: 'electron',
  entry: `${__dirname}/src/script.js`,
  output: {
    path: __dirname + '/public',
    publicPath: '/',
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
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loaders: [
          'file-loader',
          'image-webpack-loader'
        ]
      },

    ],
  },


  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
    extensions: ['*', '.js', '.vue', 'json']
  }

}
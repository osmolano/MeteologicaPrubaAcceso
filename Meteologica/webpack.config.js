const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    bundle: './FrontEnd/src/js/main.js',
    weatherForecasts: './FrontEnd/src/js/weatherForecasts.js',
    home: './FrontEnd/src/js/home.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'FrontEnd/dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'],
      },
      {
        type: "asset",
        test: /\.(jpg|png|jpeg|gif|svg)$/i
      }
    ],
  },
  resolve: {
    alias: {
      'bootstrap-js': path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.min.js'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.css',  // Ruta para los archivos CSS
    }),
  ]
};
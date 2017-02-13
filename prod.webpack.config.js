var path = require('path');
module.exports = {
  entry: {
  	bundle: './js/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    // publicPath: 'docs/',
    filename: 'dist/[name].js'
  },
  // devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: {importLoaders: 1}},
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  }
};

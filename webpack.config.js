var path = require('path');
console.log(path.resolve(__dirname, 'dist'));
module.exports = {
  entry: {
  	bundle: './js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js'
  },
  devtool: "inline-source-map",
  module: {
	  rules: [{
	    test: /\.js$/,
	    exclude: /(node_modules|bower_components)/,
	    use: {
		    loader: 'babel-loader',
		    options: {
		      presets: ['es2015']
			  }
	    }
	  }]
  }
};

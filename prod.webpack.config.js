var path = require('path');
module.exports = {
  entry: {
  	bundle: './js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    // publicPath: 'docs/',
    filename: 'dist/[name].js'
  },
  // devtool: "inline-source-map",
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

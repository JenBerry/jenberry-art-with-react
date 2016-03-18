var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: "./src/index.jsx",
	output: {
		path: __dirname + '/build',
		filename: "app.js",
		publicPath: "/"
	},
	module: {
		loaders: [
			{
				test: /src\/.*.jsx?$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.(woff2?|svg)$/,
				loader: 'url?limit=10000'
			},
			{
				test: /\.(ttf|eot)$/,
				loader: 'file'
			},
			{
				test: /src\/.*.less$/,
				loaders: ["style", "css", "less"]
			},
			{
				test: /.*.html$/,
				loader: ExtractTextPlugin.extract("html-loader")
			},
			{
				test: /.*.json$/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("index.html")
	]
};
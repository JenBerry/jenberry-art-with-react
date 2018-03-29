var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: "./src/index.jsx",
	output: {
		path: __dirname + '/docs',
		filename: "app.js",
		publicPath: "/"
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: '/node_modules/',
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
				test: /\.(ttf|eot|jpg|png)$/,
				loader: 'file'
			},
			{
				test: /\.less$/,
				exclude: '/node_modules/',
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

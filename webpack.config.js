module.exports = {
	entry: "./src/index.jsx",
	output: {
		path: __dirname + '/build',
		filename: "app.js",
		publicPath: "/build/"
	},
	module: {
		loaders: [
			{
				test: /src\/.*.jsx?$/,
				loader: 'babel-loader',
				query: {
					presets: ['react']
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
				test: /src\/.*.less/,
				loaders: ["style", "css", "less"]
			}
		]
	}
};
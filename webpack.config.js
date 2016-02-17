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
			}
		]
	}
};
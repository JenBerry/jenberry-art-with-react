module.exports = {
	entry: "./src/index.jsx",
	output: {
		path: './build/',
		filename: "app.js"
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
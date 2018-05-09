var express = require('express');
var path = require('path');
var app = express();

var isDevelopment = (process.env.NODE_ENV !== 'production');
var static_path = path.join(__dirname, 'docs');

app.use(express.static(static_path));
app.get('/', function (req, res) {
	res.sendFile('index.html', {
		root: static_path
	});
});
app.listen(process.env.PORT || 8081, function (err) {
	if (err) { console.log(err) };
	console.log('Listening at localhost:8081');
});

if (isDevelopment) {
	var webpack = require('webpack');
	var config = require('./webpack.config');
	var WebpackDevServer = require('webpack-dev-server');

	new WebpackDevServer(webpack(config), {
		publicPath: config.output.publicPath,
		hot: false,
		contentBase: 'docs/'
	}).listen(3000, 'localhost', function (err, result) {
		if (err) { console.log(err) }
		console.log('Listening at localhost:3000');
	});
}

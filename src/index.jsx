var ReactDOM = require('react-dom');
var React = require('react');
var html = require('./index.html')
// Uncomment to use Bootstrap javascript elements
	// global.jQuery = require('jquery');
	// var bootstrap = require('bootstrap-webpack');
var styles = require('./styles.less');

var HelloWorld = React.createClass({
	render: function(){
		return(
		<div className="container">
			<div className="row">
				<div className="col-xs-12 col-sm-6 col-lg-4">
					<h1>  hello world </h1>
				</div>
			</div>
		</div>
		);
	}
});

ReactDOM.render(<HelloWorld />, document.getElementById('app'));
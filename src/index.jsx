global.jQuery = require('jquery');
var ReactDOM = require('react-dom');
var React = require('react');
var Bootstrap = require('bootstrap-loader');
var styles = require('./style.scss');

var HelloWorld = React.createClass({
	render: function(){
		return(
		<div className="container-fluid">
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
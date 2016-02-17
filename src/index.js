var ReactDOM = require('react-dom');
var React = require('react');

var HelloWorld = React.createClass({
	render: function(){
		return(<h1>  hello world </h1>);
	}
});

ReactDOM.render(<HelloWorld />, document.body);
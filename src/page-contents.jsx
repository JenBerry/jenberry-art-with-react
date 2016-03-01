var React = require('react');

var PageContents = React.createClass({
	render: function(){
		return(
			<div>
				{ this.props.children }
			</div>
		);
	}
});

module.exports = PageContents;
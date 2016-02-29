var React = require('react');

var PageContents = React.createClass({
	render: function(){
		return(
			<div>
				Page Contents {this.props.page}
			</div>
		);
	}
});

module.exports = PageContents;
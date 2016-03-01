var React = require('react');
var Lorem = require('react-lorem-component');

var HomePageContents = React.createClass({
	render: function(){
		
		return(
			<div>
				<h2>Home</h2>
				<Lorem />
			</div>
		);
	}
});

module.exports = HomePageContents;
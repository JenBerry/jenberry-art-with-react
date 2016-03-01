var React = require('react');
var Lorem = require('react-lorem-component');

var HomePageContents = React.createClass({
	render: function(){
		
		return(
			<div className="row">
				<div className="col-xs-12 col-sm-6 col-sm-offset-6">
					<h2>Home</h2>
					<Lorem />
				</div>
			</div>
		);
	}
});

module.exports = HomePageContents;
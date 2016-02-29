var React = require('react');
var ArtPageContents = require('./page-contents/art.jsx');

var PageContents = React.createClass({
	render: function(){
		return(
			<div>
				<ArtPageContents />
			</div>
		);
	}
});

module.exports = PageContents;
const React = require('react');
const Lorem = require('react-lorem-component');

const HomePageContents = React.createClass({
	render(){
		
		return(
			<div>
				<h2>Home</h2>
				<Lorem />
			</div>
		);
	}
});

module.exports = HomePageContents;
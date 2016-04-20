const React = require('react');
const {mediaRoot} = require('../globals.js');

const HomePageContents = React.createClass({

	render(){
		return(
			<div>
				<h2>Contact Details</h2>
				<p>Email: JenBerryMail 'at' gmail com</p>
				<p>Don't be shy</p>
			</div>
		);
	}
});

module.exports = HomePageContents;
const React = require('react');
const Header = require('./header.jsx');
const Footer = require('./footer.jsx');

const Page = React.createClass({
	onClick(){
		console.log(this.props.state);
		this.props.onClick();
	},
	render(){
		return(
		<div className="container">
			<Header />
			<button onClick={this.onClick}>click</button>
			{ this.props.children }
			<Footer />
		</div>
		);
	}
});

module.exports = Page
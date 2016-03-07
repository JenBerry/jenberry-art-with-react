const React = require('react');
const Header = require('./header.jsx');
const Footer = require('./footer.jsx');

const Page = React.createClass({
	onClick(){
		this.props.onClick();
	},
	componentDidUpdate(){
		console.log("state updated");
		console.log(this.props.state);
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
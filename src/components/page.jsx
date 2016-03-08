const React = require('react');
const Header = require('./header.jsx');
const Footer = require('./footer.jsx');

const Page = React.createClass({
	componentDidUpdate(){
		console.log("state updated");
		console.log(this.props.state);
	},
	componentWillMount(){
		this.props.addDummyArt();
	},
	render(){
		return(
		<div className="container">
			<Header />
			{ this.props.children }
			<Footer />
		</div>
		);
	}
});

module.exports = Page
const React = require('react');
const Header = require('./header.jsx');
const Footer = require('./footer.jsx');
const {hashHistory} = require('react-router');

const {connect} = require('react-redux');
const HeaderContainer = connect(( state ) => {
	return{
		currentArtwork: state.selectedArtObject,
		currentGallery: state.selectedGalleryObject,
		path: state.path
	}
},{})(Header);


const Page = React.createClass({
	componentDidUpdate(){
		console.log("state updated");
		console.log(this.props.state);
	},
	componentWillMount(){
		this.props.initialiseGalleries();
		this.props.initialiseArt();
		//listen for URL changes and update path variable when changed
		hashHistory.listen(ev => {
			this.props.setPath(ev.pathname);
		});
	},
	render(){
		return(
		<div className="container">
			<HeaderContainer />
			{ this.props.children }
			<Footer />
		</div>
		);
	}
});

module.exports = Page
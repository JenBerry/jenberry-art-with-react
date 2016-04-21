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
	// componentDidUpdate(){
	// 	console.log("state updated");
	// 	console.log(this.props.state);
	// },
	componentWillMount(){
		this.props.initialiseGalleries();
		this.props.initialiseArt();
		//listen for URL changes and update path variable when changed
		hashHistory.listen(ev => {
			this.props.setPath(ev.pathname);
		});
	},
	componentDidMount(){
		console.log("*************************************************");
		console.log("|                                               |");
		console.log("|  ..:::::::::,,,,,  __.,     ,,,,,::::::::..   |");
		console.log("| ``````````:::::::   :.```   :::::::`````````` |");
		console.log("|           ,::::::::  :.    ::::::::,          |");
		console.log("|          /``   `:::::::::::::`     \\          |");
		console.log("|         /        |'':::::''|        \\         |");
		console.log("|                  |   ::::  |                  |"); 
		console.log("|         |             :::                     |");
		console.log("|        '*'            ::                      |");
		console.log("|         \\|           ::                       |");
		console.log("|           \\        .:                         |");
		console.log("|            `'';;;;''                          |");
		console.log("|                                               |");
		console.log("****************************************Jen Berry");
		console.log("You can find the full code for this app at https://github.com/JenBerry/jenberry-art-with-react");
	},
	render(){


		let path = this.props.state.path;
		let currentNav = 'none';

		if (typeof path !== 'undefined'){
			if(path === '/home'){
				currentNav = 'home';
			}
			if(path.match(/^\/\w*$/) && path !== '/home'){
				currentNav = path.substring(1);
			}
		}

		return(
		<div>
			<div className={"container-fluid main " + currentNav}>
				<div className="inner-container">
				<div className="clearfix"></div>
					<HeaderContainer />
					{ this.props.children }
				</div>
			</div>
			<div className="container-fluid"><Footer /></div>
		</div>
		);
	}
});

module.exports = Page
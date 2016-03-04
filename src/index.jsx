const ReactDOM = require('react-dom');
const React = require('react');

const Redux = require('redux');
const ReactRedux = require('react-redux');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const hashHistory = ReactRouter.hashHistory;
const IndexRoute = ReactRouter.IndexRoute;
const IndexRedirect = ReactRouter.IndexRedirect;

const html = require('./index.html');
// Uncomment to use Bootstrap javascript elements
	// global.jQuery = require('jquery');
	// const bootstrap = require('bootstrap-webpack');
const styles = require('./styles.less');


const artReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_TEST_ART':
			return [
				...state,
				{
					name: "Test Art",
					url: "http://lorempixel.com/518/750/abstract/1",
					thumbUrl: "http://lorempixel.com/160/160/abstract/1",
					gallery: "Artwork"
				}
			]
		default:
			return state;
	}
}
const store = Redux.createStore(artReducer);
store.subscribe(() => {
	console.log(store.getState())
})


const Page = React.createClass({
	onClick: () => {
		store.dispatch({ type: 'ADD_TEST_ART' });
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

const Header = require('./header.jsx');
const Footer = require('./footer.jsx');
const PageContents = require('./page-contents.jsx');
const PageGallery = require('./page-gallery.jsx');
const PageArtwork = require('./page-artwork.jsx');

const HomePageContents = require('./page-contents/home.jsx');
const ArtPageContents = require('./page-contents/art.jsx');
let PricesPageContents
let AboutPageContents
let ContactPageContents

const NotFound = React.createClass({
	render(){
		return(
			<h1>Page Not found <Link to="/">Go home</Link></h1>
		)
	}
});



ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Page}>
			<IndexRedirect to="/home" />
			<Route path="/home" component={PageContents}>
				<IndexRoute component={HomePageContents} />
				<Route path="/art" component={ArtPageContents} />
				<Route path="/design" component={ArtPageContents} />
				<Route path="/prices" component={PricesPageContents} />
				<Route path="/about" component={AboutPageContents} />
				<Route path="/contact" component={ContactPageContents} />
			</Route>
			<Route path="/gallery" component={PageGallery} />
			<Route path="/artwork" component={PageArtwork} />
			<Route path="*" component={NotFound} />
		</Route>
	</Router>
),
document.getElementById('app'));
const ReactDOM = require('react-dom');
const React = require('react');
const ReactRouter = require('react-router');
const Redux = require('redux');
const ReactRedux = require('react-redux');
const html = require('./index.html');
// Uncomment to use Bootstrap javascript elements
	// global.jQuery = require('jquery');
	// const bootstrap = require('bootstrap-webpack');
const styles = require('./styles.less');



const counter = (state=0, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}
const store = Redux.createStore(counter);
store.subscribe(() => {
	console.log(store.getState())
})



const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const hashHistory = ReactRouter.hashHistory;
const IndexRoute = ReactRouter.IndexRoute;
const IndexRedirect = ReactRouter.IndexRedirect;

const Page = React.createClass({
	onClick: () => {
		store.dispatch({ type: 'INCREMENT' });
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
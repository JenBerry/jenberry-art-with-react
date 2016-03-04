var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var html = require('./index.html');
// Uncomment to use Bootstrap javascript elements
	// global.jQuery = require('jquery');
	// var bootstrap = require('bootstrap-webpack');
var styles = require('./styles.less');



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
var store = Redux.createStore(counter);
store.subscribe(function(){
	console.log(store.getState())
})



var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var IndexRedirect = ReactRouter.IndexRedirect;

var Page = React.createClass({
	onClick: () => {
		store.dispatch({ type: 'INCREMENT' });
	},
	render: function(){
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

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var PageContents = require('./page-contents.jsx');
var PageGallery = require('./page-gallery.jsx');
var PageArtwork = require('./page-artwork.jsx');

var HomePageContents = require('./page-contents/home.jsx');
var ArtPageContents = require('./page-contents/art.jsx');
var PricesPageContents
var AboutPageContents
var ContactPageContents

var NotFound = React.createClass({
	render: function(){
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
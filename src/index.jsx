const ReactDOM = require('react-dom');
const React = require('react');

const Redux = require('redux');
const ReactRedux = require('react-redux');
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

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

const Page = require('./components/page.jsx');
const PageContents = require('./components/page-contents.jsx');
const PageGallery = require('./components/page-gallery.jsx');
const PageArtwork = require('./components/page-artwork.jsx');

const HomePageContents = require('./components/home.jsx');
const ArtPageContents = require('./components/art.jsx');
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



const PageContainer = connect(
	null,
	( dispatch ) => {
		return{
			onClick: () => dispatch({type: 'ADD_TEST_ART'})
		}
	}
)(Page);

const PageArtworkContainer = connect(
	(state) => {return{artwork: state[0]}}
)(PageArtwork);

const PageGalleryContainer = connect(
	(state) => {return{galleryImages: state}}
)(PageGallery)



const appReducer = require('./reducers/art_reducer.js');
ReactDOM.render((

	<Provider store={Redux.createStore(appReducer)}>
		<Router history={hashHistory}>
			<Route path="/" component={PageContainer}>
				<IndexRedirect to="/home" />
				<Route path="/home" component={PageContents}>
					<IndexRoute component={HomePageContents} />
					<Route path="/art" component={ArtPageContents} />
					<Route path="/design" component={ArtPageContents} />
					<Route path="/prices" component={PricesPageContents} />
					<Route path="/about" component={AboutPageContents} />
					<Route path="/contact" component={ContactPageContents} />
				</Route>
				<Route path="/gallery" component={PageGalleryContainer} />
				<Route path="/artwork" component={PageArtworkContainer} />
				<Route path="*" component={NotFound} />
			</Route>
		</Router>
	</Provider>
),
document.getElementById('app'));
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


let artId = 0;
const PageContainer = connect(
	( state ) => {
		return{ state }
	},
	( dispatch ) => {
		return{
			onClick: () => {
				dispatch({type: 'ADD_TEST_ART', id:artId})
				artId++;
			}
		}
	}
)(Page);

const PageArtworkContainer = connect(
	(state) => {return{artwork: state.artReducer.artworks[state.artReducer.selectedArt]}}
)(PageArtwork);

const PageGalleryContainer = connect(
	(state) => {return{galleryImages: state.artReducer.artworks}},
	(dispatch) => {return{
		selectArt: (id) => {
			dispatch({type:"SELECT_ART", id:id})
		}
	}}
)(PageGallery);

const ArtPageContentsContainer = connect(
	(state) => {return{galleries: state.galleryReducer.galleries}},
	(dispatch) => {return{
		setGallery: (id) => {
			dispatch({type:"SELECT_GALLERY", id:id})
		}
	}}
)(ArtPageContents);



const appReducer = require('./reducers/art_reducer.js');
ReactDOM.render((

	<Provider store={Redux.createStore(appReducer)}>
		<Router history={hashHistory}>
			<Route path="/" component={PageContainer}>
				<IndexRedirect to="/home" />
				<Route path="/home" component={PageContents}>
					<IndexRoute component={HomePageContents} />
					<Route path="/art" component={ArtPageContentsContainer} />
					<Route path="/design" component={ArtPageContentsContainer} />
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
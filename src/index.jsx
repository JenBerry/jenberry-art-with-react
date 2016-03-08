const ReactDOM = require('react-dom');
const React = require('react');

const Redux = require('redux');
const {Provider, connect} = require('react-redux');
const {Router, Route, Link, hashHistory, IndexRoute, IndexRedirect} = require('react-router');

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

const appReducer = require('./reducers/app_reducer.js');

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
		return{
			state,
			currentArtwork: state.artReducer.selectedArtObject,
			currentGallery: state.galleryReducer.selectedGalleryObject
		}
	},
	( dispatch ) => {
		return{
			addDummyArt: () => {
				for(let i=0; i<60; i++){
					dispatch({type: 'ADD_TEST_ART', id:artId})
					artId++;
				}
			}
		}
	}
)(Page);

const PageArtworkContainer = connect(
	(state) => {
		return{
			artwork: state.artReducer.selectedArtObject,
			galleries: state.galleryReducer.galleries
	}},
	(dispatch) => {return{
		setArt: (id) => {
			dispatch({type:"SELECT_ART", id:id})
		}
	}}
)(PageArtwork);

const PageGalleryContainer = connect(
	(state) => {
		const currentGallery = state.galleryReducer.selectedGalleryObject
		return{
			galleryImages: state.artReducer.artworks,
			currentGallery:  currentGallery
	}},
	(dispatch) => {return{
		setGallery: (slug) => {
			dispatch({type:"SET_GALLERY_FROM_SLUG", slug})
		}
	}}
)(PageGallery);

const ArtPageContentsContainer = connect(
	(state) => {return{galleries: state.galleryReducer.galleries}}
)(ArtPageContents);




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
				<Route path="/gallery/:gallery" component={PageGalleryContainer} />
				<Route path="/artwork/:artworkId" component={PageArtworkContainer} />
				<Route path="*" component={NotFound} />
			</Route>
		</Router>
	</Provider>
),
document.getElementById('app'));
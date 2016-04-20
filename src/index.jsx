const ReactDOM = require('react-dom');
const React = require('react');

const Redux = require('redux');
const {Provider} = require('react-redux');
const {Router, Route, Link, hashHistory, IndexRoute, IndexRedirect} = require('react-router');

const html = require('./index.html');
// Uncomment to use Bootstrap javascript elements
	// global.jQuery = require('jquery');
	// const bootstrap = require('bootstrap-webpack');
const styles = require('./styles.less');


const PageContents = require('./components/page-contents.jsx');
const HomePageContents = require('./components/home.jsx');
let PricesPageContents
let AboutPageContents
let ContactPageContents
const {
	PageContainer, 
	PageArtworkContainer, 
	PageGalleryContainer, 
	ArtPageContentsContainer,
} = require('./containers/containers.js')


const NotFound = React.createClass({
	render(){
		return(
			<h1>Page Not found <Link to="/">Go home</Link></h1>
		)
	}
});

const appReducer = require('./reducers/app_reducer.js');

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
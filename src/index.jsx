var ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var html = require('./index.html');
// Uncomment to use Bootstrap javascript elements
	// global.jQuery = require('jquery');
	// var bootstrap = require('bootstrap-webpack');
var styles = require('./styles.less');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;

var Page = React.createClass({
	setPage: function(page){
		this.setState({page:page});
	},
	getInitialState: function(){
		return {page: 'artwork'}
	},
	render: function(){
		return(
		<div className="container">
			<Header page={this.state.page} setPage={this.setPage} />
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
			<IndexRoute component={PageGallery} />
		</Route>
		<Route path="*" component={NotFound} />
	</Router>
),
document.getElementById('app'));
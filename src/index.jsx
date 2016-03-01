var ReactDOM = require('react-dom');
var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var html = require('./index.html');
// Uncomment to use Bootstrap javascript elements
	// global.jQuery = require('jquery');
	// var bootstrap = require('bootstrap-webpack');
var styles = require('./styles.less');


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
			<PageContents page={this.state.page} />
			<Link to="foo">foo</Link>
			<Footer />
		</div>
		);
	}
});

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var PageContents = require('./page-contents.jsx');

var NotFound = React.createClass({
	render: function(){
		return(
			<h1>Page Not found <Link to="/">Go home</Link></h1>
		)
	}
});



ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Page} />
		<Route path="*" component={NotFound} />
	</Router>
),
document.getElementById('app'));
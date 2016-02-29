var ReactDOM = require('react-dom');
var React = require('react');
var html = require('./index.html')
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
			<Footer />
		</div>
		);
	}
});

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var PageContents = require('./page-contents.jsx');


ReactDOM.render(<Page />, document.getElementById('app'));
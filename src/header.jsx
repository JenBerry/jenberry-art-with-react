var React = require('react');

var Header = React.createClass({
	clicked: function(something){
		this.props.setPage(something);
	},
	render: function(){
		var navItems = [
			'home',
			'artwork',
			'design',
			'portfolio',
			'prices',
			'about me',
			'contact'
		].map(function(pageName, i){
			return (
				<li className={pageName===this.props.page ? 'active' : ''} key={i}>
					<a href="#" onClick={this.clicked.bind(this, pageName)}>{pageName}</a>
				</li>
			)
		}, this);
		return(
			<header className="page-header">
				<h1>Jen Berry</h1>
				<nav>
					<ul className="nav nav-pills">
						{navItems}
					</ul>
				</nav>
				<ol className="breadcrumb">
					<li className="active"> <a href="#"> Page </a></li>
				</ol>
			</header>
		);
	}
});

module.exports = Header;
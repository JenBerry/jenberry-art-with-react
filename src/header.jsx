var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
	render: function(){
		var navItems = [
			'home',
			'art',
			'design',
			'portfolio',
			'prices',
			'about',
			'contact'
		].map(function(pageName, i){
			return (
				<li key={i}>
					<Link to={pageName} >{pageName}</Link>
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
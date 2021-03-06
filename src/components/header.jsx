const React = require('react');
const Link = require('react-router').Link;
const {mediaRoot} = require('../globals.js');

const Header = React.createClass({
	render(){
		let path = this.props.path;
		let currentNav = 'home';

		const currentGallery = this.props.currentGallery;
		const currentArtwork = this.props.currentArtwork;

		const createBreadcrumb = (link,text) => {
			return <li><Link to={link}>{text}</Link></li>
		}
		let pageBreadcrumb;
		let galleryBreadcrumb;
		let artworkBreadcrumb;

		if(path === '/home'){
			currentNav = 'home';
		}
		if(path.match(/^\/\w*$/) && path !== '/home'){
			currentNav = path.substring(1);
			pageBreadcrumb = createBreadcrumb(currentNav,currentNav);
		}
		if((path.match(/^\/gallery\//) || path.match(/^\/artwork\//)) && typeof currentGallery !== 'undefined'){
			currentNav = currentGallery.mainCategory;
			pageBreadcrumb = createBreadcrumb(currentNav,currentNav);
			galleryBreadcrumb = createBreadcrumb("gallery/" + currentGallery.slug,currentGallery.name);
		}
		if(path.match(/^\/artwork\//) && typeof currentArtwork !== 'undefined'){
			artworkBreadcrumb = createBreadcrumb("artwork/" + currentArtwork.id,currentArtwork.name);
		}


		const navItems = [
			'home',
			'art',
			'design',
			'about',
			'contact'
		].map(function(pageName, i){
			return (
				<li key={i} className={pageName === currentNav ? 'active': ''}>
					<Link to={'/'+pageName}>{pageName}</Link>
				</li>
			)
		}, this);

		return(
			<header className="row">
				<div className="col-xs-12 col-sm-6 breadcrumb-container">
					<ol className="breadcrumb">
						<li><Link to="home">Home</Link></li>
						{pageBreadcrumb}
						{galleryBreadcrumb}
						{artworkBreadcrumb}
					</ol>
				</div>
				<div className="page-header col-xs-12 col-sm-6">
					<h1>
						<img className="full-width" src={mediaRoot+"/img/jenberry2.png"} alt="Jen Berry" title="Jen Berry" />
					</h1>
					<nav>
						<ul className="nav nav-pills">
							{navItems}
						</ul>
					</nav>
				</div>
				<div className="clearfix"></div>
			</header>
		);
	}
});

module.exports = Header;
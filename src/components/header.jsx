const React = require('react');
const Link = require('react-router').Link;
const {hashHistory} = require('react-router');

const Header = React.createClass({
	render(){
		let path
		//listen for URL changes and update path variable when changed
		hashHistory.listen(ev => {
			path = ev.pathname
		});
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
			'prices',
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
			<header className="page-header">
				{path}
				<h1>Jen Berry </h1>
				<nav>
					<ul className="nav nav-pills">
						{navItems}
					</ul>
				</nav>
				<ol className="breadcrumb">
					<li><Link to="home">Home</Link></li>
					{pageBreadcrumb}
					{galleryBreadcrumb}
					{artworkBreadcrumb}
				</ol>
			</header>
		);
	}
});

module.exports = Header;
const React = require('react');
const Link = require('react-router').Link;
const {hashHistory} = require('react-router');

const Header = React.createClass({
	render(){
		const navItems = [
			'home',
			'art',
			'design',
			'prices',
			'about',
			'contact'
		].map(function(pageName, i){
			return (
				<li key={i}>
					<Link to={pageName} activeClassName="active" onlyActiveOnIndex={true}>{pageName}</Link>
				</li>
			)
		}, this);



		const currentGallery = this.props.currentGallery;
		const currentArtwork = this.props.currentArtwork;

		const createBreadcrumb = (link,text) => {
			return <li><Link to={link}>{text}</Link></li>
		}
		let pageBreadcrumb;
		let galleryBreadcrumb;
		let artworkBreadcrumb;

		let path
		hashHistory.listen(ev => {path = ev.pathname});
		if(path.match(/^\/\w*$/) && path !== '/home'){
			pageBreadcrumb = createBreadcrumb(path.substring(1),path.substring(1)) 
		}
		if((path.match(/^\/gallery\//) || path.match(/^\/artwork\//)) && typeof currentGallery !== 'undefined'){
			pageBreadcrumb = createBreadcrumb('art','Art')
			galleryBreadcrumb = createBreadcrumb("gallery/" + currentGallery.slug,currentGallery.name)
		}
		if(path.match(/^\/artwork\//) && typeof currentArtwork !== 'undefined'){
			artworkBreadcrumb = createBreadcrumb("artwork/" + currentArtwork.id,currentArtwork.name)
		}

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
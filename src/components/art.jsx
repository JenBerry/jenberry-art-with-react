const React = require('react');
const Link = require('react-router').Link;

const ArtPageContents = React.createClass({
	render(){
		const galleries = this.props.galleries
		const galleryItems = galleries.map((gallery, i) => {
			return (
				<li key={i}><Link className="block-link" to={"/gallery/" + gallery.slug}>
					<h3 key={i}>{gallery.name}</h3>
					<img className="full-width" src={gallery.imageUrl} />
				</Link></li>
			)
		}, this);
		return(
			<div>
				<h2>Artwork</h2>
				{galleryItems}
			</div>
		);
	}
});

module.exports = ArtPageContents;
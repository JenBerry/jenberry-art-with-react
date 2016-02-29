var React = require('react');

var ArtPageContents = React.createClass({
	render: function(){
		var gallery = function(name, slug, imageUrl){
			return (
				{
					name: name,
					slug: slug,
					imageUrl: imageUrl
				}
			)
		}
		var galleries = [
			gallery('Abstract Art',                     'abstract',    'http://lorempixel.com/496/89/abstract/1'),
			gallery('Digital Art',                      'digital',     'http://lorempixel.com/496/89/abstract/2'),
			gallery('Traditional Paintings & Drawings', 'traditional', 'http://lorempixel.com/496/89/abstract/3'),
			gallery('Pen Animal Portraits',             'pen',         'http://lorempixel.com/496/89/abstract/4'),
			gallery('Concept Sketches & Speedpaints',   'sketches',    'http://lorempixel.com/496/89/abstract/5'),
			gallery('Tutorials & Walkthroughs',         'tutorials',   'http://lorempixel.com/496/89/abstract/6')
		]
		var galleryItems = galleries.map(function(gallery, i){
			return (
				<li key={i}><a className="block-link" href="#">
					<h3 key={i}>{gallery.name}</h3>
					<img className="full-width" src={gallery.imageUrl} />
				</a></li>
			)
		}, this);
		return(
			<div className="row">
				<div className="col-xs-12 col-sm-6 col-sm-offset-6">
					<h2>Artwork</h2>
					{galleryItems}
				</div>
			</div>
		);
	}
});

module.exports = ArtPageContents;
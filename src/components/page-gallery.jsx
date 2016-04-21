const React = require('react');
const Link = require('react-router').Link;
const ThumbButton = require('./thumb-button.jsx');

const PageGallery = React.createClass({
	setGallery(slug){
		this.props.setGallery(slug);
	},
	componentWillMount(){
		const urlGallery = this.props.params.gallery;
		this.setGallery(urlGallery);
	},
	render(){
		let galleryImages = this.props.galleryImages;
		const currentGallery = this.props.currentGallery;

		if (typeof currentGallery === 'undefined'){
			return (
				<h2>No gallery selected</h2>
			)
		}

		galleryImages = galleryImages.filter(g => g.gallery === currentGallery.slug);

		const artItems = galleryImages.map((artThumb, i) => {
			return(
				<li className="block-grid-item list-unstyled" key={i}>
					<ThumbButton art={artThumb}>
						<p>{artThumb.name}</p>
					</ThumbButton>
				</li>
			)
		}, this);
		return(
			<div>
				<div className="row">
					<div className="col-xs-12">
						<h2>{currentGallery.name}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-3" dangerouslySetInnerHTML={{__html: currentGallery.description}} />
					<div className="col-xs-12 col-sm-9">
						<div className="block-grid-xs-2 block-grid-sm-3 block-grid-md-4" >
							{artItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PageGallery;
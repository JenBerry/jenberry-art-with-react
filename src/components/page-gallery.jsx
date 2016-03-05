const React = require('react');
const Lorem = require('react-lorem-component');
const Link = require('react-router').Link;

const PageGallery = React.createClass({
	click(thing){
		console.log(thing);
	},
	render(){
		const galleryImages = this.props.galleryImages
		const artItems = galleryImages.map(function(artThumb, i){
			return(
				<li className="block-grid-item list-unstyled" key={i}>
					<Link to="/artwork" className="block-link">
						<img src={artThumb.thumbUrl} />
						<h3>{artThumb.name}</h3>
					</Link>
				</li>
			)
		}, this);
		return(
			<div>
				<div className="row">
					<div className="col-xs-12">
						<h2>Art Gallery</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-3">
						<Lorem count="1"/>
					</div>
					<div className="col-xs-12 col-sm-9">
						<div className="row">
							<div className="block-grid-xs-2 block-grid-sm-3 block-grid-md-4" >
								{artItems}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PageGallery;
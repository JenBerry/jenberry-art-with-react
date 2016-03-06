const React = require('react');
const Lorem = require('react-lorem-component');
const Link = require('react-router').Link;

const PageGallery = React.createClass({
	selectArt(id){
		this.props.selectArt(id);
	},
	render(){
		const galleryImages = this.props.galleryImages;
		const currentGallery = this.props.currentGallery;

		if (typeof currentGallery === 'undefined'){
			return (
				<h2>No gallery selected</h2>
			)
		}

		const artItems = galleryImages.map((artThumb, i) => {
			return(
				<li className="block-grid-item list-unstyled" key={i}>
					<Link to="/artwork" className="block-link" onClick={this.selectArt.bind(this, artThumb.id)}>
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
						<h2>Art Gallery: {currentGallery.name}</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-3">
						<Lorem count="1"/>
					</div>
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
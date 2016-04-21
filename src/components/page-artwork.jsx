const React = require('react');
const Link = require('react-router').Link;
const Lorem = require('react-lorem-component');
const ImageLoader = require('react-imageloader');

const ThumbButton = require('./thumb-button.jsx');

const PageArtwork = React.createClass({
	setArt(){
		this.props.setArt(this.props.params.artworkId)
	},
	componentWillMount(){
		this.setArt();
	},
	componentDidUpdate(){
		if (this.props.params.artworkId !==  String(this.props.artwork.id))
		{this.setArt();}
	},
	render(){
		const artwork = this.props.artwork;
		const gallery = this.props.gallery;
		const nextArt = this.props.nextArt;
		const prevArt = this.props.prevArt;
		if (typeof artwork == 'undefined' ){
			return <h2>No artwork selected</h2>
		}
		let nextButton
		if (typeof nextArt !== 'undefined'){
			nextButton = (
				<ThumbButton className="right" art={nextArt}>
					<p>Next</p>
				</ThumbButton>
			)
		}
		let prevButton
		if (typeof prevArt !== 'undefined'){
			prevButton = (
				<ThumbButton className="left" art={prevArt}>
					<p>Previous</p>
				</ThumbButton>
			)
		}
		return(
			<div>
				<div className="row">
					<div className="col-xs-12">
						<Link to={"/gallery/" + gallery.slug}>{gallery.name}</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<div className="art-container">
							<h2>{artwork.name}</h2>
							<ImageLoader imgProps={{className:"full-width"}} 
										 src={artwork.url}
										 preloader={()=><span>Loading...</span>}>
								<span>Problem Loading artwork</span>
							</ImageLoader>
							<p className="art-description" dangerouslySetInnerHTML={{__html: artwork.text}} />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6">
						{prevButton}
					</div>
					<div className="col-xs-6">
						{nextButton}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PageArtwork;
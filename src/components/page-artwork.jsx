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
		this.setArt();
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
				<ThumbButton art={nextArt}>
					Next
				</ThumbButton>
			)
		}
		let prevButton
		if (typeof prevArt !== 'undefined'){
			prevButton = (
				<ThumbButton art={prevArt}>
					Previous
				</ThumbButton>
			)
		}
		return(
			<div>
				<div className="row">
					<div className="col-xs-12">
						<h2><Link to={"/gallery/" + gallery.slug}>{gallery.name}</Link></h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<h3>{artwork.name}</h3>
						<ImageLoader imgProps={{className:"full-width"}} 
									 src={artwork.url}
									 preloader={()=><span>Loading...</span>}>
							<span>Problem Loading artwork</span>
						</ImageLoader>
						<p>{artwork.text}</p>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6">
						{prevButton}
					</div>
					<div className="col-xs-6 text-right">
						{nextButton}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PageArtwork;
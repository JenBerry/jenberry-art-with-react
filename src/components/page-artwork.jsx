const React = require('react');
const Link = require('react-router').Link;
const Lorem = require('react-lorem-component');

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
				<Link to={"artwork/"+nextArt.id} className="btn btn-primary" href="">Next</Link>
			)
		}
		let prevButton
		if (typeof prevArt !== 'undefined'){
			prevButton = (
				<Link to={"artwork/"+prevArt.id} className="btn btn-primary" href="">Previous</Link>
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
						<img className="full-width" src={artwork.url} />
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
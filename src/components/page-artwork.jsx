const React = require('react');
const Link = require('react-router').Link;
const Lorem = require('react-lorem-component');

const PageArtwork = React.createClass({
	setArt(id){this.props.setArt(id)},
	componentWillMount(){
		const urlArt = this.props.params.artworkId;
		this.setArt(urlArt);
	},
	render(){
		const artwork = this.props.artwork;
		const gallery = this.props.gallery;
		if (typeof artwork == 'undefined' ){
			return <h2>No artwork selected</h2>
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
						<a className="btn btn-primary" href="">Previous</a>
					</div>
					<div className="col-xs-6 text-right">
						<a className="btn btn-primary" href="">Next</a>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PageArtwork;
const React = require('react');
const Link = require('react-router').Link;
const Lorem = require('react-lorem-component');

const PageArtwork = React.createClass({
	render(){
		const artwork = this.props.artwork;
		console.log('art:' + artwork);
		if (typeof artwork == 'undefined' ){
			return <h2>No artwork selected</h2>
		}
		return(
			<div>
				<div className="row">
					<div className="col-xs-12">
						<h2><Link to="/gallery">{artwork.gallery}</Link></h2>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<h3>{artwork.name}</h3>
						<img src={artwork.url} />
						<Lorem count="1"/>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PageArtwork;
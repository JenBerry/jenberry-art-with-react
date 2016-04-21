const React = require('react');
const Lorem = require('react-lorem-component');
const ThumbButton = require('./thumb-button.jsx');

const HomePageContents = React.createClass({

	render(){
		const artItems = this.props.artworks.map((artThumb, i) => {
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
				<h2>Newest additons</h2>
				<div className="block-grid-xs-2">
					{artItems}
				</div>
			</div>
		);
	}
});

module.exports = HomePageContents;
const React = require('react');
const Link = require('react-router').Link;
const ImageLoader = require('react-imageloader');

const ThumbButton = (props) => {
	return (
		<Link to={"/artwork/"+props.art.id} className={"thumbnail " + props.className} href="">
			<ImageLoader src={props.art.thumbUrl}
						 preloader={()=><span>Loading...</span>} >
				<span>Problem loading thumbnail</span>
			</ImageLoader>
			<div className="caption">
				{props.children}
			</div>
		</Link>
	);
};

ThumbButton.propTypes = {
	art: React.PropTypes.shape({
		id: React.PropTypes.string,
		thumbUrl: React.PropTypes.string
	}).isRequired
};

module.exports = ThumbButton; 
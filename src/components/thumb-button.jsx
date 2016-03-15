const React = require('react');
const Link = require('react-router').Link;
const ImageLoader = require('react-imageloader');

const ThumbButton = (props) => {
	return (
		<Link to={"artwork/"+props.art.id} className="block-link" href="">
			<ImageLoader src={props.art.thumbUrl}
						 preloader={()=><span>Loading...</span>} >
				<span>Problem loading thumbnail</span>
			</ImageLoader>
			{props.children}
		</Link>
	);
};


module.exports = ThumbButton;
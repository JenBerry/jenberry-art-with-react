const React = require('react');
const Lorem = require('react-lorem-component');
const Link = require('react-router').Link;

const PageGallery = React.createClass({
	click(thing){
		console.log(thing);
	},
	render(){
		const artThumb = (name, imageUrl) => {
			return({
				name: name,
				imageUrl: imageUrl
			})
		}
		const artThumbs = [
			artThumb('kjdshf ka', 'http://lorempixel.com/160/160/abstract/1'),
			artThumb('hkfjae keja', 'http://lorempixel.com/160/160/abstract/2'),
			artThumb('gea', 'http://lorempixel.com/160/160/abstract/3'),
			artThumb('kjd akka', 'http://lorempixel.com/160/160/abstract/4'),
			artThumb('af la', 'http://lorempixel.com/160/160/abstract/5'),
			artThumb('ejrhak a', 'http://lorempixel.com/160/160/abstract/6'),
			artThumb('dkjhfka ka', 'http://lorempixel.com/160/160/abstract/7'),
			artThumb('kjhafjhdfja ajhdajdjahd aj hdahdfaj agdfahdgfa', 'http://lorempixel.com/160/160/abstract/8'),
			artThumb('jhh', 'http://lorempixel.com/160/160/abstract/9'),
			artThumb('lklkjkj jagdf a', 'http://lorempixel.com/160/160/abstract/10'),
		]
		const artItems = artThumbs.map(function(artThumb, i){
			return(
				<li className="block-grid-item list-unstyled" key={i}>
					<Link to="/artwork" className="block-link">
						<img src={artThumb.imageUrl} />
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
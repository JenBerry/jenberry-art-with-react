const React = require('react');
const Link = require('react-router').Link;

const ArtPageContents = React.createClass({
	render(){
		const galleries = this.props.galleries;

		const sortedGalleries = galleries.reduce((buckets, item)=>{
			if(!buckets[item.subCategory]){
				buckets[item.subCategory] = [];
			}
			buckets[item.subCategory].push(item);
			return buckets;
		},{});

		const galleryCategories = (sortedGalleries) => {
			const galleryCategory = (category) => {
				return(
					<div key={category}>
						<h2>{category}</h2>
						{sortedGalleries[category].map((gallery, i) => {
							return (
								<li key={i}><Link className="block-link" to={"/gallery/" + gallery.slug}>
									<h3 key={i}>{gallery.name}</h3>
									<img className="full-width" src={gallery.imageUrl} />
								</Link></li>
							)
						}, this)}
					</div>
				)
			}
			let categories = [];
			for (let key in sortedGalleries){
				categories.push(galleryCategory(key))
			}
			return categories
		}

		return(
			<div>
				{galleryCategories(sortedGalleries)}
			</div>
		);
	}
});

module.exports = ArtPageContents;
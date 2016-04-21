const React = require('react');
const Link = require('react-router').Link;
const {hashHistory} = require('react-router');

const ArtPageContents = React.createClass({
	componentWillMount(){
		hashHistory.listen(ev => {
			this.props.setMainCategory(ev.pathname.substring(1));
		});
	},
	render(){
		let galleries = this.props.galleries;
		let mainCategory
		if (typeof this.props.selectedGalleryObject !== "undefined"){
			mainCategory = this.props.selectedGalleryObject.mainCategory;
			galleries = galleries.filter(g => g.mainCategory ===  mainCategory);
		}
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
								<li className="list-unstyled" key={i}><Link className="thumbnail" to={"/gallery/" + gallery.slug}>
									<h3 key={i} className="caption">{gallery.name}</h3>
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
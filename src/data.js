const expect = require('expect');
const data = require('../data.json');
console.log('raw data:');
console.log(data)

let categories = data.category;
const getCategory = id => categories.find(category => category.id === id).category;

let galleries = data.galleryid;
galleries = galleries.map((gallery)=>{
	return {
		id: gallery.id,
		name: gallery.name,
		slug: gallery.galleryid,
		mainCategory: getCategory(gallery.categoryid),
		description: gallery.description
	};
});
const getGallerySlug = id => galleries.find(gallery => gallery.id === id).slug;
const getGalleryCategory = id => galleries.find(gallery => gallery.id === id).mainCategory;

let artworks = data.artwork;
artworks = artworks.map((artwork)=>{
	const mainCategory = getGalleryCategory(artwork.galleryid);
	return {
		slug: artwork.picid,
		name: artwork.name,
		url: `http://www.jenberry.co.uk/art/media/img/${mainCategory}/${artwork.url}`,
		thumbUrl: `http://www.jenberry.co.uk/art/media/img/thumb/${mainCategory}/${artwork.thumbnailurl}`,
		gallery: getGallerySlug(artwork.galleryid),
		text: artwork.description
	};
});

module.exports = {galleries, artworks};
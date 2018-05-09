const data = require('../data.json');
const {mediaRoot} = require('./globals.js');

const checkCategory = (category) => {
	if (data.validCategories.indexOf(category) >= 0) {
		return category
	} else {
		console.log(new Error(`Invalid data, category does not exist: ${category}`))
		return ""
	}
}

const galleries = data.gallery.map((gallery)=>{
	return {
		id: gallery.id,
		name: gallery.name,
		slug: gallery.galleryid,
		imageUrl: `${mediaRoot}/img/${gallery.galleryImage}`,
		mainCategory: checkCategory(gallery.category),
		subCategory: gallery.subCategory,
		description: gallery.description,
		order: gallery.order
	};
}).sort((a,b)=> {
	if (a.order > b.order){
		return 1
	}
	if (a.order < b.order){
		return -1
	}
	return 0
});

const getGallerySlug = id => galleries.find(gallery => gallery.id === id).slug;
const getGalleryCategory = id => galleries.find(gallery => gallery.id === id).mainCategory;

const artworks = data.artwork.map((artwork)=>{
	const mainCategory = getGalleryCategory(artwork.galleryid);
	let date = artwork.date.toString();
	if (date.length === 5){
		date = "200"+ date;
	} else {
		date = "20"+date;
	};
	let day = date.slice(-2);
	let month = date.slice(-4,-2);
	let year = date.slice(0,4);
	date = new Date(year,month,day);

	return {
		slug: artwork.picid,
		name: artwork.name,
		url: `${mediaRoot}/img/${mainCategory}/${artwork.url}`,
		thumbUrl: `${mediaRoot}/img/thumb/${mainCategory}/${artwork.thumbnailurl}`,
		gallery: getGallerySlug(artwork.galleryid),
		text: artwork.description,
		date: date
	};
}).sort((a,b)=> {
	if (a.date < b.date){
		return 1
	}
	if (a.date > b.date){
		return -1
	}
	return 0
});

module.exports = {galleries, artworks};

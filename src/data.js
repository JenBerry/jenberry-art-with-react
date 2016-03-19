const expect = require('expect');
const data = require('../data.json');
console.log('raw data:');
console.log(data)

let categories = data.category;
const getCategory = id => categories.find(category => category.id === id).category;

let galleries = data.galleryid;
const galleryImages = [
	{gallery: 'digital-paintings', image: 'digibutton.png'},
	{gallery: 'pen-animals',       image: 'penbutton.png'},
	{gallery: 'traditional',       image: 'tradbutton.png'},
	{gallery: 'sketches',          image: 'quickbutton.png'},
	{gallery: 'walkthroughs',      image: 'stepbutton.png'},
	{gallery: 'abstract',          image: 'abstractbutton.jpg'},
	{gallery: 'animal-photography',image: ''},
	{gallery: 'scisoc',            image: 'posterbutton.png'},
	{gallery: 'weevil',            image: 'magbutton.png'},
	{gallery: 'orchard-park',      image: 'opbutton.png'},
	{gallery: 'logos',             image: 'logobutton.png'},
	{gallery: 'websites',          image: 'webbutton.png'},
	{gallery: 'rocksoc',           image: 'rocksocbutton.png'},
	{gallery: 'domino',            image: 'dominobutton.jpg'},
];
const getGalleryImage = (gallery) => galleryImages.find(g => g.gallery === gallery);
galleries = galleries.map((gallery)=>{
	let galleryImage = getGalleryImage(gallery.galleryid).image;
	return {
		id: gallery.id,
		name: gallery.name,
		slug: gallery.galleryid,
		imageUrl: `http://jenberry.co.uk/art/media/img/${galleryImage}`,
		mainCategory: getCategory(gallery.categoryid),
		subCategory: getCategory(gallery.categoryid),
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
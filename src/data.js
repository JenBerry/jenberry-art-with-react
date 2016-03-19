const expect = require('expect');
const data = require('../data.json');
console.log('raw data:');
console.log(data)

let categories = data.category;
const getCategory = id => categories.find(category => category.id === id).category;

let galleries = data.galleryid;
const extraGalleryData = [
	{gallery: 'digital-paintings', image: 'digibutton.png',    subCategory: 'Artwork'},
	{gallery: 'pen-animals',       image: 'penbutton.png',     subCategory: 'Artwork'},
	{gallery: 'traditional',       image: 'tradbutton.png',    subCategory: 'Artwork'},
	{gallery: 'sketches',          image: 'quickbutton.png',   subCategory: 'Artwork'},
	{gallery: 'walkthroughs',      image: 'stepbutton.png',    subCategory: 'Artwork'},
	{gallery: 'abstract',          image: 'abstractbutton.jpg',subCategory: 'Artwork'},
	{gallery: 'animal-photography',image: '',                  subCategory: 'Photography'},
	{gallery: 'scisoc',            image: 'posterbutton.png',  subCategory: 'Projects'},
	{gallery: 'weevil',            image: 'magbutton.png',     subCategory: 'Projects'},
	{gallery: 'orchard-park',      image: 'opbutton.png',      subCategory: 'Projects'},
	{gallery: 'logos',             image: 'logobutton.png',    subCategory: 'Design'},
	{gallery: 'websites',          image: 'webbutton.png',     subCategory: 'Design'},
	{gallery: 'rocksoc',           image: 'rocksocbutton.png', subCategory: 'Projects'},
	{gallery: 'domino',            image: 'dominobutton.jpg',  subCategory: 'Projects'},
];
const getGalleryImage = (gallery) => extraGalleryData.find(g => g.gallery === gallery);
galleries = galleries.map((gallery)=>{
	const galleryImage = getGalleryImage(gallery.galleryid).image;
	const gallerySubCategory = getGalleryImage(gallery.galleryid).subCategory;
	return {
		id: gallery.id,
		name: gallery.name,
		slug: gallery.galleryid,
		imageUrl: `http://jenberry.co.uk/art/media/img/${galleryImage}`,
		mainCategory: getCategory(gallery.categoryid),
		subCategory: gallerySubCategory,
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
const expect = require('expect');
const data = require('../data.json');
const {mediaRoot} = require('./globals.js');
console.log('raw data:');
console.log(data)

let categories = data.category;
const getCategory = id => categories.find(category => category.id === id).category;

let galleries = data.galleryid;
const extraGalleryData = [
	{gallery: 'digital-paintings', image: 'digibutton.png',    subCategory: 'Artwork',   order:2},
	{gallery: 'pen-animals',       image: 'penbutton.png',     subCategory: 'Artwork',   order:4},
	{gallery: 'traditional',       image: 'tradbutton.png',    subCategory: 'Artwork',   order:3},
	{gallery: 'sketches',          image: 'quickbutton.png',   subCategory: 'Artwork',   order:5},
	{gallery: 'walkthroughs',      image: 'stepbutton.png',    subCategory: 'Artwork',   order:6},
	{gallery: 'abstract',          image: 'abstractbutton.jpg',subCategory: 'Artwork',   order:1},
	{gallery: 'animal-photography',image: '',                  subCategory: 'Photography', order: 100},
	{gallery: 'scisoc',            image: 'posterbutton.png',  subCategory: 'Projects',  order:3},
	{gallery: 'weevil',            image: 'magbutton.png',     subCategory: 'Projects',  order:4},
	{gallery: 'orchard-park',      image: 'opbutton.png',      subCategory: 'Projects',  order:2},
	{gallery: 'logos',             image: 'logobutton.png',    subCategory: 'Design',    order:1},
	{gallery: 'websites',          image: 'webbutton.png',     subCategory: 'Design',    order:2},
	{gallery: 'rocksoc',           image: 'rocksocbutton.png', subCategory: 'Projects',  order:5},
	{gallery: 'domino',            image: 'dominobutton.jpg',  subCategory: 'Projects',  order:2},
];
const getGalleryImage = (gallery) => extraGalleryData.find(g => g.gallery === gallery);
galleries = galleries.map((gallery)=>{
	const galleryImage = getGalleryImage(gallery.galleryid).image;
	const gallerySubCategory = getGalleryImage(gallery.galleryid).subCategory;
	const galleryOrder = getGalleryImage(gallery.galleryid).order;
	return {
		id: gallery.id,
		name: gallery.name,
		slug: gallery.galleryid,
		imageUrl: `${mediaRoot}/img/${galleryImage}`,
		mainCategory: getCategory(gallery.categoryid),
		subCategory: gallerySubCategory,
		description: gallery.description,
		order: galleryOrder
	};
});
galleries = galleries.sort((a,b)=> {
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

let artworks = data.artwork;
artworks = artworks.map((artwork)=>{
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
});
artworks = artworks.sort((a,b)=> {
	if (a.date < b.date){
		return 1
	}
	if (a.date > b.date){
		return -1
	}
	return 0
});

module.exports = {galleries, artworks};
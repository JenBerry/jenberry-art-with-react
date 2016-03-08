const Redux = require('redux');
const Lorem = require('react-lorem-component');
const expect = require('expect');

const gallery = (id, name, slug, imageUrl) => {
	return (
		{
			id: id,
			name: name,
			slug: slug,
			imageUrl: imageUrl
		}
	)
}
const galleries = [
	gallery(0, 'Abstract Art',                     'abstract',    'http://lorempixel.com/496/89/abstract/1'),
	gallery(1, 'Digital Art',                      'digital',     'http://lorempixel.com/496/89/abstract/2'),
	gallery(2, 'Traditional Paintings & Drawings', 'traditional', 'http://lorempixel.com/496/89/abstract/3'),
	gallery(3, 'Pen Animal Portraits',             'pen',         'http://lorempixel.com/496/89/abstract/4'),
	gallery(4, 'Concept Sketches & Speedpaints',   'sketches',    'http://lorempixel.com/496/89/abstract/5'),
	gallery(5, 'Tutorials & Walkthroughs',         'tutorials',   'http://lorempixel.com/496/89/abstract/6')
]

const artListReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_TEST_ART':
			console.log(action.type + ' ' + action.id);
			const width = Math.floor(Math.random()*500 + 500);
			const height = Math.floor(Math.random()*500 + 500);
			const picture = Math.floor(Math.random()*9+1);
			const gallerySlug = galleries[Math.floor(Math.random()*galleries.length)].slug;
			return [
				...state,
				{
					id: action.id,
					name: "Test Art " + action.id,
					url: `http://lorempixel.com/${width}/${height}/abstract/${picture}`,
					thumbUrl: `http://lorempixel.com/160/160/abstract/${picture}`,
					gallery: gallerySlug,
					text: "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis."
				}
			];
		default:
			return state;
	}
};

const artReducer = (state = {artworks:[], galleries:galleries}, action) => {
	const getGallery = (galleries, slug) => {
		return galleries.find(n => n.slug === slug)
	}
	switch (action.type){
		case 'ADD_TEST_ART':
			return (
				Object.assign({}, state, {
					artworks: artListReducer(state.artworks, action)
				})
			);
		case 'SELECT_ART':{
			console.log(action.type + ' ' + action.id);
			let selectedArtObject;
			let selectedGalleryObject = state.selectedGalleryObject;
			if (typeof action.id !== 'undefined'){
				selectedArtObject = state.artworks[action.id]
				selectedGalleryObject = getGallery(state.galleries, selectedArtObject.gallery)
				return (
					Object.assign({}, state, {
						selectedArtObject,
						selectedGalleryObject
					})
				)
			} else {
				return state;
			}
		}
		case 'SET_GALLERY_FROM_SLUG' : {
			console.log(action.type + ' ' + action.slug);
			let selectedGalleryObject;
			if (typeof action.slug !== 'undefined'){
				selectedGalleryObject = getGallery(state.galleries, action.slug)
				return(
					Object.assign({}, state, {
						selectedGalleryObject
					})
				);
			} else {
				return state;
			}
		}
		default:
			return state;
		
	}
}

module.exports = artReducer;

console.log('testing');

//test artListReducer
expect(
	artListReducer(undefined,{type:'OTHER'})
).toEqual(
	[]
);

expect(
	artListReducer([1,2],{type:'ADD_TEST_ART', id:2}).length
).toEqual(
	3
);

//test artReducer
expect(
	artReducer(undefined,{type:'OTHER'})
).toEqual(
	{
		artworks:[],
		galleries: galleries
	}
);

expect(
	artReducer({},{type: 'ADD_TEST_ART', id:0}).artworks.length
).toEqual(
	1
);

expect(
	artReducer(
		{
			artworks:[{gallery:'mySlug'},2,3],
			galleries:[{slug: 'mySlug'}]
		},
		{type:'SELECT_ART', id:0})
).toEqual(
	{
		artworks:[{gallery:'mySlug'},2,3,],
		galleries: [{slug: 'mySlug'}],
		selectedArtObject:{gallery:'mySlug'},
		selectedGalleryObject:{slug:'mySlug'}
	}
);

expect(
	artReducer(
		{
			artworks:[],
			galleries:[]
		},
		{type:'SELECT_ART'})
).toEqual(
	{
		artworks:[],
		galleries: [],
	}
);

expect(
	artReducer(
		{artworks:[], galleries:[{slug: 'digital'}]},
		{type:'SET_GALLERY_FROM_SLUG', slug:'digital'})
).toEqual(
	{
		artworks:[],
		galleries:[{slug: 'digital'}],
		selectedGalleryObject: {slug: 'digital'}
	}
);

expect(
	artReducer(
		{artworks:[], galleries:[]},
		{type:'SET_GALLERY_FROM_SLUG'})
).toEqual(
	{
		artworks:[],
		galleries:[],
	}
);


console.log('tests passed');







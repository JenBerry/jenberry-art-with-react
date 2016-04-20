/*eslint semi: 2*/
const Redux = require('redux');
const Lorem = require('react-lorem-component');
const expect = require('expect');

const artListReducer = (state = [], action) => {
	switch (action.type){
		// case 'ADD_TEST_ART':
		// 	console.log(action.type + ' ' + action.id);
		// 	const width = Math.floor(Math.random()*500 + 500);
		// 	const height = Math.floor(Math.random()*500 + 500);
		// 	const picture = Math.floor(Math.random()*9+1);
		// 	let gallerySlug;
		// 	if (typeof action.galleries !== 'undefined'){
		// 		const randomGallery = Math.floor(Math.random()*action.galleries.length);
		// 		gallerySlug = action.galleries[randomGallery].slug;
		// 	}
		// 	return [
		// 		...state,
		// 		{
		// 			id: action.id,
		// 			name: "Test Art " + action.id,
		// 			url: `http://lorempixel.com/${width}/${height}/abstract/${picture}`,
		// 			thumbUrl: `http://lorempixel.com/160/160/abstract/${picture}`,
		// 			gallery: gallerySlug,
		// 			text: "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis."
		// 		}
		// 	];
		case 'ADD_ART':
			// console.log(action.type + ' ' + action.slug);
			if(typeof action.slug !== 'string' || action.slug === ''){
				console.error('Error: art is missing slug string');
			}
			else if (state.find(art => art.id === action.slug.toLowerCase())){
				console.error('Error: artwork already exists: ' + action.slug);
			} else {
				return [
					...state,
					{
						id: action.slug.toLowerCase(),
						name: action.name,
						url: action.url,
						thumbUrl: action.thumbUrl,
						gallery: action.gallery,
						text: action.text
					}
				];
			}
		default:
			return state;
	}
};

const galleryListReducer = (state = [], action) =>{
	switch (action.type){
		case 'ADD_GALLERY':
			console.log(action.type + ' ' + action.slug);
			if(typeof action.slug !== 'string' || action.slug === ''){
				console.error('Error: gallery is missing slug string');
			}
			else if (state.find(gallery => gallery.slug === action.slug.toLowerCase())){
				console.error('Error: gallery already exists: ' + action.slug);
			} else {
				return [
					...state,
					{
						name: action.name,
						slug: action.slug.toLowerCase(),
						imageUrl: action.imageUrl,
						mainCategory: action.mainCategory,
						subCategory: action.subCategory
					}
				];
		};
		default: return state;	
	}
};
const artReducer = (state = {artworks:[], galleries:[]}, action) => {
	const getGallery = (galleries, slug) => {
		return galleries.find(n => n.slug === slug);
	};
	switch (action.type){
		case 'ADD_ART':
			// console.log(action.type + ' ' + action.slug + ' to ' + action.gallery);
			if (state.galleries.find(gallery => gallery.slug === action.gallery)){
				return (
					Object.assign({}, state, {
						artworks: artListReducer(
							state.artworks,
							action
						)
					})
				);
				
			} else {
				console.error("Error: Can't add art to non existant gallery: ");
				return state;
			}
		case 'SELECT_ART':{
			console.log(action.type + ' ' + action.id);
			if (typeof action.id !== 'undefined'){
				const selectedArtObject = state.artworks.find(artwork => artwork.id === action.id);
				if (typeof selectedArtObject !== 'undefined'){
					const selectedGalleryObject = getGallery(state.galleries, selectedArtObject.gallery);
					const artworksInGallery = state.artworks.filter(a => a.gallery === selectedArtObject.gallery);
					const positionOfSelectedArt = artworksInGallery.findIndex(a => a === selectedArtObject);
					let nextArtObject = artworksInGallery[positionOfSelectedArt+1];
					let prevArtObject = artworksInGallery[positionOfSelectedArt-1];

					return (
						Object.assign({}, state, {
							selectedArtObject,
							selectedGalleryObject,
							nextArtObject,
							prevArtObject
						})
					);
				} else {
					console.error("Error: No artwork found with id " + action.id);
				}
			} else {
				console.error("Error: no art id provided for selection");
			}
		}
		case 'ADD_GALLERY' : {
			return (
				Object.assign({}, state, {
					galleries: galleryListReducer(
						state.galleries,
						action
					)
				})
			);
		}
		case 'SET_GALLERY_FROM_SLUG' : {
			console.log(action.type + ' ' + action.slug);
			let selectedGalleryObject;
			if (typeof action.slug !== 'undefined'){
				selectedGalleryObject = getGallery(state.galleries, action.slug);
				if(typeof selectedGalleryObject === 'undefined'){
					console.error('Error: No gallery exists with slug: ' + action.slug);
				};
			} else {
				console.error('Error: No slug provided to set gallery');
			}
			return(
				Object.assign({}, state, {
					selectedGalleryObject
				})
			);
		}
		case 'SET_GALLERY_MAIN_CATEGORY' : {
			console.log(action.type + ' ' + action.mainCategory);
			if (state.galleries.find(g => g.mainCategory ===  action.mainCategory)){
				return(
					Object.assign({}, state, {
						selectedGalleryObject: {mainCategory: action.mainCategory}
					})
				);
			} else {
				console.error('Error: main category doesn\'t exist: ',  action.mainCategory);
				return state;
			}
		}
		case 'SET_PATH' : {
			console.log(action.type + ' path ' + action.path);
			return(
				Object.assign({}, state, {
					path: action.path
				})
			);
		}
		default:
			return state;
		
	}
};

module.exports = artReducer;

console.log('testing');

console.log('test initialisation');
	expect(
		artReducer(undefined,{type:'OTHER'})
	).toEqual(
		{galleries:[], artworks:[]}
	);

console.log('test unrecognised action');
	expect(
		artReducer('state', {type:'OTHER'})
	).toEqual(
		'state'
	);
	expect(
		artListReducer('state', {type:'OTHER'})
	).toEqual(
		'state'
	);
	expect(
		galleryListReducer('state', {type:'OTHER'})
	).toEqual(
		'state'
	);

console.log('test adding gallery');
{
	const addedGallery = galleryListReducer([1], {type:'ADD_GALLERY', slug:'hello'});
	expect(
		[addedGallery[1].slug, addedGallery.length]
	).toEqual(
		['hello', 2]
	);	
}
	console.log('test adding gallery with incorrect slug');
	expect(
		galleryListReducer([{slug:'hello'}], {type:'ADD_GALLERY', slug:'Hello'})
	).toEqual(
		[{slug:'hello'}]
	);
	expect(
		galleryListReducer([], {type:'ADD_GALLERY'})
	).toEqual(
		[]
	);
	expect(
		galleryListReducer([], {type:'ADD_GALLERY', slug:''})
	).toEqual(
		[]
	);
	expect(
		galleryListReducer([], {type:'ADD_GALLERY', slug:5})
	).toEqual(
		[]
	);

console.log('test adding artwork');
{
	const addedArt = artListReducer([1], {type:'ADD_ART', slug: 'fOx'});
	expect(
		[addedArt[1].id, addedArt.length]
	).toEqual(
		['fox',2]
	);
}
	console.log('test adding art with incorrect slug');
	expect(
		artListReducer([{id:'fox'}], {type:'ADD_ART', slug: 'fOx'})
	).toEqual(
		[{id:'fox'}]
	);
	expect(
		artListReducer([], {type:'ADD_ART'})
	).toEqual(
		[]
	);
	expect(
		artListReducer([], {type:'ADD_ART', slug: ''})
	).toEqual(
		[]
	);
	expect(
		artListReducer([], {type:'ADD_ART', slug: 10})
	).toEqual(
		[]
	);

	console.log('test adding artwork to a gallery that doesn\'t exist');
	expect(
		artReducer({artworks:[], galleries:[]}, {type:'ADD_ART', gallery:'notexist'})
	).toEqual(
		{artworks:[], galleries:[]}
	);

console.log('testing setting gallery');
	expect(
		artReducer({artworks:[], galleries:[{slug:'poo'}]}, {type:'SET_GALLERY_FROM_SLUG', slug:'poo'})
	).toEqual(
		{artworks:[], galleries:[{slug:'poo'}], selectedGalleryObject:{slug:'poo'}}
	);

	expect(
		artReducer({artworks:[], galleries:[], selectedGalleryObject:{}}, {type:'SET_GALLERY_FROM_SLUG'})
	).toEqual(
		{artworks:[], galleries:[], selectedGalleryObject:undefined}
	);
	expect(
		artReducer({artworks:[], galleries:[], selectedGalleryObject:{}}, {type:'SET_GALLERY_FROM_SLUG', slug:'hello'})
	).toEqual(
		{artworks:[], galleries:[], selectedGalleryObject:undefined}
	);

console.log('testing setting a gallery main category');
	expect(
		artReducer(
			{artworks:[],galleries:[{mainCategory:'foo'}]},
			{type:'SET_GALLERY_MAIN_CATEGORY', mainCategory: 'foo'}
		)
	).toEqual(
		{artworks:[],galleries:[{mainCategory:'foo'}], selectedGalleryObject:{mainCategory:'foo'}}
	);

	expect(
		artReducer(
			{artworks:[],galleries:[]},
			{type:'SET_GALLERY_MAIN_CATEGORY'}
		)
	).toEqual(
		{artworks:[],galleries:[]}
	);

	expect(
		artReducer(
			{artworks:[],galleries:[]},
			{type:'SET_GALLERY_MAIN_CATEGORY', mainCategory: 'foo'}
		)
	).toEqual(
		{artworks:[],galleries:[]}
	);

console.log('test selecting art');
	expect(
		artReducer({artworks:[], galleries:[]}, {type:'SELECT_ART'})
	).toEqual(
		{artworks:[], galleries:[]}
	);
	expect(
		artReducer({artworks:[], galleries:[]}, {type:'SELECT_ART', id:"notexist"})
	).toEqual(
		{artworks:[], galleries:[]}
	);

	expect(
		artReducer({
			artworks:[
				{id:'this_one', gallery:'my_gallery'}
			],
			galleries:[
				{slug:'my_gallery'}
			]
		},
		{
			type:'SELECT_ART',
			id:'this_one'
		})
	).toEqual(
		{
			artworks:[
				{id:'this_one', gallery:'my_gallery'}
			],
			galleries:[
				{slug:'my_gallery'}
			],
			selectedArtObject: {id:'this_one', gallery:'my_gallery'},
			selectedGalleryObject: {slug:'my_gallery'},
			nextArtObject: undefined,
			prevArtObject:undefined
		}
	);

	expect(
		artReducer({
			artworks:[
				{id:'this_one', gallery:'my_gallery'},
				{id:'that_one', gallery:'another'},
				{id:'poo', gallery:'my_gallery'},
			],
			galleries:[
				{slug:'my_gallery'},
				{slug:'another'},
			]
		},
		{
			type:'SELECT_ART',
			id:'this_one'
		})
	).toEqual(
		{
			artworks:[
				{id:'this_one', gallery:'my_gallery'},
				{id:'that_one', gallery:'another'},
				{id:'poo', gallery:'my_gallery'},
			],
			galleries:[
				{slug:'my_gallery'},
				{slug:'another'},
			],
			selectedArtObject: {id:'this_one', gallery:'my_gallery'},
			selectedGalleryObject: {slug:'my_gallery'},
			nextArtObject: {id:'poo', gallery:'my_gallery'},
			prevArtObject:undefined
		}
	);

console.log('test setting path');
	expect(
		artReducer({artworks:[], galleries:[]},{type:'SET_PATH', path:'boo'})
	).toEqual(
		{artworks:[], galleries:[], path:'boo'}
	);
	expect(
		artReducer({artworks:[], galleries:[]},{type:'SET_PATH'})
	).toEqual(
		{artworks:[], galleries:[], path:undefined}
	);

console.log('tests passed');






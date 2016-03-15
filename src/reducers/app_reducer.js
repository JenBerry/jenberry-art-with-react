/*eslint semi: 2*/
const Redux = require('redux');
const Lorem = require('react-lorem-component');
const expect = require('expect');

const artListReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_TEST_ART':
			console.log(action.type + ' ' + action.id);
			const width = Math.floor(Math.random()*500 + 500);
			const height = Math.floor(Math.random()*500 + 500);
			const picture = Math.floor(Math.random()*9+1);
			let gallerySlug;
			if (typeof action.galleries !== 'undefined'){
				const randomGallery = Math.floor(Math.random()*action.galleries.length);
				gallerySlug = action.galleries[randomGallery].slug;
			}
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

const galleryListReducer = (state = [], action) =>{
	switch (action.type){
		case 'ADD_GALLERY':
			return [
				...state,
				{
					id: action.id,
					name: action.name,
					slug: action.slug,
					imageUrl: action.imageUrl,
					mainCategory: action.mainCategory,
					subCategory: action.subCategory
				}
			];
		default: return state;	
	}
};
const artReducer = (state = {artworks:[]}, action) => {
	const getGallery = (galleries, slug) => {
		return galleries.find(n => n.slug === slug);
	};
	switch (action.type){
		case 'ADD_TEST_ART':
			return (
				Object.assign({}, state, {
					artworks: artListReducer(
						state.artworks,
						{type:action.type, id:action.id, galleries:state.galleries}
					)
				})
			);
		case 'SELECT_ART':{
			console.log(action.type + ' ' + action.id);
			if (typeof action.id !== 'undefined'){
				const selectedArtObject = state.artworks[action.id];
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
				return state;
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
};

module.exports = artReducer;

console.log('testing');

//test artListReducer
	//default behaviour
	expect(
		artListReducer(undefined,{type:'OTHER'})
	).toEqual(
		[]
	);

	//add a test art
	expect(
		artListReducer(
			[1],
			{type:'ADD_TEST_ART', id:1}
		).length
	).toEqual(
		2
	);

	//test art should choose gallery from provided list of galleries
	expect(
		artListReducer(
			[1,2],
			{type:'ADD_TEST_ART', id:2, galleries:[{slug:'x'}]}
		)[2].gallery
	).toEqual(
		'x'
	);

//test galleryListReducer
	//test default behaviour
	expect(
		galleryListReducer(undefined,{type:'OTHER'})
	).toEqual(
		[]
	);

	//test adding a gallery
	expect(
		galleryListReducer([],{
			type:'ADD_GALLERY',
			id: 0,
			name: 'Test',
			slug: 'test',
			imageUrl: '',
			mainCategory: 'Test',
		})
	).toEqual(
		[{
			id: 0,
			name: 'Test',
			slug: 'test',
			imageUrl: '',
			mainCategory: 'Test',
			subCategory: undefined
		}]
	);

//test artReducer
	//test default behaviour
	expect(
		artReducer(undefined,{type:'OTHER'})
	).toEqual(
		{
			artworks:[]
		}
	);

	//test passing through to artListReducer
	expect(
		artReducer(
			{},
			{type: 'ADD_TEST_ART', id:0}
		).artworks.length
	).toEqual(
		1
	);

	//test passing through to galleryListReducer
	expect(
		artReducer(
			{galleries:[]},
			{
				type: 'ADD_GALLERY',
				id: 0,
				name: 'Test',
				slug: 'test',
				imageUrl: '',
				mainCategory: 'Test',
			}
		)
	).toEqual(
		{
			galleries: [
				{
					id: 0,
					name: 'Test',
					slug: 'test',
					imageUrl: '',
					mainCategory: 'Test',
					subCategory: undefined
				}
			]
		}
	);
	//test selecting an artwork
	expect(
		artReducer(
			{
				artworks:[
					{name:'wa wa',   gallery:'mySlug'},
					{name:'wee wee', gallery:'toilet'},
					{name:'ho ho',   gallery:'mySlug'},
				],
				galleries:[{slug: 'mySlug'}, {slug: 'toilet'}]
			},
			{type:'SELECT_ART', id:0})
	).toEqual(
		{
			artworks:[
				{name:'wa wa', gallery:'mySlug'},
				{name:'wee wee', gallery:'toilet'},
				{name:'ho ho',gallery:'mySlug'},
			],
			galleries:            [{slug: 'mySlug'}, {slug: 'toilet'}],
			selectedArtObject:    {name:'wa wa', gallery:'mySlug'},
			selectedGalleryObject:{slug:'mySlug'},
			nextArtObject:        {name:'ho ho',gallery:'mySlug'},
			prevArtObject:        undefined
		}
	);

	//if SELECT_ART is called with no id, don't do anything
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

	//test selecting a gallery
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

	//if SET_GALLERY_FROM_SLUG called with no slug, don't do anything
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






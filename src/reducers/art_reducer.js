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
			const galleryName = galleries[Math.floor(Math.random()*galleries.length)].name;
			return [
				...state,
				{
					id: action.id,
					name: "Test Art " + action.id,
					url: `http://lorempixel.com/${width}/${height}/abstract/${picture}`,
					thumbUrl: `http://lorempixel.com/160/160/abstract/${picture}`,
					gallery: galleryName,
					text: "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis."
				}
			];
		default:
			return state;
	}
};

const artReducer = (state = {artworks:[]}, action) => {
	switch (action.type){
		case 'ADD_TEST_ART':
			return (
				Object.assign({}, state, {
					artworks: artListReducer(state.artworks, action)
				})
			);
		case 'SELECT_ART':
			console.log(action.type + ' ' + action.id);
			return (
				Object.assign({}, state, {
					selectedArtObject: state.artworks[action.id]
				})
			)
		default:
			return state;
		
	}
}

const galleryReducer = (state, action) =>{
	if (typeof state === 'undefined'){
		state = {galleries: galleries};
	}
	switch (action.type){
		case 'SET_GALLERY_FROM_SLUG' :
		console.log(action.type + ' ' + action.slug);
			return(
				Object.assign({}, state, {
					selectedGallerySlug: action.slug
				})
			);
		default:
			return state;
	}}

const appReducer = Redux.combineReducers({
	artReducer,
	galleryReducer
});

module.exports = appReducer;

console.log('testing');

//test artListReducer
expect(
	artListReducer(undefined,{type:'OTHER'})
).toEqual(
	[]
);

expect(
	artListReducer([],{type:'ADD_TEST_ART', id:0}).length
).toEqual(
	1
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
	{artworks:[]}
);
expect(
	artReducer({},{type: 'ADD_TEST_ART', id:0}).artworks.length
).toEqual(
	1
);
expect(
	artReducer(
		{artworks:[{hello:'foo'},2,3]},
		{type:'SELECT_ART', id:0})
).toEqual(
	{
		artworks:[{hello:'foo'},2,3],
		selectedArtObject:{hello:'foo'}
	}
);

//test galleryReducer
expect(
	galleryReducer(undefined,{type:'OTHER'})
).toEqual(
	{galleries: galleries}
)
expect(
	galleryReducer(
		{galleries:galleries},
		{type:'SET_GALLERY_FROM_SLUG', slug:'digital'})
).toEqual(
	{
		galleries: galleries,
		selectedGallerySlug: 'digital'
	}
);

//test complete reducer
expect(
	appReducer(undefined,{type:'OTHER'})
).toEqual(
	{
		artReducer: {artworks:[]},
		galleryReducer: {galleries: galleries}
	}
)


console.log('tests passed');







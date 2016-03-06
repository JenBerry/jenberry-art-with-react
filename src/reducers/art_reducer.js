const Lorem = require('react-lorem-component');
const gallery = (name, slug, imageUrl) => {
	return (
		{
			name: name,
			slug: slug,
			imageUrl: imageUrl
		}
	)
}
const galleries = [
	gallery('Abstract Art',                     'abstract',    'http://lorempixel.com/496/89/abstract/1'),
	gallery('Digital Art',                      'digital',     'http://lorempixel.com/496/89/abstract/2'),
	gallery('Traditional Paintings & Drawings', 'traditional', 'http://lorempixel.com/496/89/abstract/3'),
	gallery('Pen Animal Portraits',             'pen',         'http://lorempixel.com/496/89/abstract/4'),
	gallery('Concept Sketches & Speedpaints',   'sketches',    'http://lorempixel.com/496/89/abstract/5'),
	gallery('Tutorials & Walkthroughs',         'tutorials',   'http://lorempixel.com/496/89/abstract/6')
]

const artListReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_TEST_ART':
			const width = Math.floor(Math.random()*500 + 500);
			const height = Math.floor(Math.random()*500 + 500);
			const picture = Math.floor(Math.random()*10);
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
			return (
				Object.assign({}, state, {
					selectedArt: action.id
				})
			)
		default:
			return state;
		
	}
}

module.exports = artReducer;
const Lorem = require('react-lorem-component');
const artReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_TEST_ART':
			return [
				...state,
				{
					name: "Test Art",
					url: "http://lorempixel.com/518/750/abstract/1",
					thumbUrl: "http://lorempixel.com/160/160/abstract/1",
					gallery: "Artwork",
					text: "Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis."
				}
			];
		default:
			return state;
	}
};

module.exports = artReducer;
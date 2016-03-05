/*jshint esversion: 6 */
const artReducer = (state = [], action) => {
	switch (action.type){
		case 'ADD_TEST_ART':
			return [
				...state,
				{
					name: "Test Art",
					url: "http://lorempixel.com/518/750/abstract/1",
					thumbUrl: "http://lorempixel.com/160/160/abstract/1",
					gallery: "Artwork"
				}
			];
		default:
			return state;
	}
};

module.exports = artReducer;
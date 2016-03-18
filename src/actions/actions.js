let artId = 0;
let galleryId = 0;

// const addDummyArt = () => {
// 	const action = {
// 		type: 'ADD_TEST_ART',
// 		id:artId
// 	};
// 	artId++;
// 	return action;
// }

const addGallery = ({name, slug, imageUrl, mainCategory, subCategory}) => {
	const action = {
		type: 'ADD_GALLERY',
		id: galleryId,
		name,
		slug,
		imageUrl,
		mainCategory,
		subCategory
	};
	galleryId ++;
	return action;
}

const addArt = ({slug, name, url, thumbUrl, gallery, text}) => {
	const action = {
		type: 'ADD_ART',
		id: artId,
		slug,
		name,
		url,
		thumbUrl,
		gallery,
		text
	};
	artId++;
	return action;
}

const selectArt = (id) =>{
	return{
		type: "SELECT_ART",
		id
	}
}

const setGallery = (slug) => {
	return{
		type: 'SET_GALLERY_FROM_SLUG',
		slug
	}
}

module.exports = {
	// addDummyArt,
	addGallery,
	addArt,
	selectArt,
	setGallery
}
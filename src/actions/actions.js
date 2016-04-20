
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
		name,
		slug,
		imageUrl,
		mainCategory,
		subCategory
	};
	return action;
}

const addArt = ({slug, name, url, thumbUrl, gallery, text, date}) => {
	const action = {
		type: 'ADD_ART',
		slug,
		name,
		url,
		thumbUrl,
		gallery,
		text,
		date
	};
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

const setMainCategory = (category) => {
	return {
		type: 'SET_GALLERY_MAIN_CATEGORY',
		mainCategory: category
	}
}

const setPath = (path) => {
	return {
		type: 'SET_PATH',
		path: path
	}
}

module.exports = {
	// addDummyArt,
	addGallery,
	addArt,
	selectArt,
	setGallery,
	setMainCategory,
	setPath
}
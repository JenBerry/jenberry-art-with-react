const {connect} = require('react-redux');

const Page = require('../components/page.jsx');
const PageArtwork = require('../components/page-artwork.jsx');
const PageGallery = require('../components/page-gallery.jsx');
const ArtPageContents = require('../components/art.jsx');

const actions = require('../actions/actions.js');

const PageContainer = connect(
	( state ) => {
		return{
			state,
			currentArtwork: state.selectedArtObject,
			currentGallery: state.selectedGalleryObject
		}
	},
	( dispatch ) => {
		return{
			addDummyArt: () => {
				for(let i=0; i<30; i++){
					dispatch(actions.addDummyArt())
				}
			},
			addDummyGallery: () =>{
				dispatch(actions.addGallery({
					name: "Abstract Art",
					slug: 'abstract',
					imageUrl: 'http://lorempixel.com/496/89/abstract/1',
					mainCategory: 'Artwork',
					subCategory: 'New'
				}));
				dispatch(actions.addGallery({
					name: "Traditional Art",
					slug: 'traditional',
					imageUrl: 'http://lorempixel.com/496/89/abstract/3',
					mainCategory: 'Artwork',
					subCategory: 'New'
				}));
				dispatch(actions.addGallery({
					name: "Digital Art",
					slug: 'digital',
					imageUrl: 'http://lorempixel.com/496/89/abstract/2',
					mainCategory: 'Artwork',
					subCategory: 'Old Stuff'
				}));
			}
		}
	}
)(Page);

const PageArtworkContainer = connect(
	(state) => {
		return{
			artwork: state.selectedArtObject,
			gallery: state.selectedGalleryObject,
			nextArt: state.nextArtObject,
			prevArt: state.prevArtObject
	}},
	(dispatch) => {return{
		setArt: (id) => {
			dispatch(actions.selectArt(id))
		}
	}}
)(PageArtwork);

const PageGalleryContainer = connect(
	(state) => {
		return{
			galleryImages: state.artworks,
			currentGallery:  state.selectedGalleryObject
	}},
	(dispatch) => {return{
		setGallery: (slug) => {
			dispatch(actions.setGallery(slug))
		}
	}}
)(PageGallery);

const ArtPageContentsContainer = connect(
	(state) => {return{galleries: state.galleries}}
)(ArtPageContents);

module.exports = {
	PageContainer,
	PageArtworkContainer,
	PageGalleryContainer,
	ArtPageContentsContainer
}
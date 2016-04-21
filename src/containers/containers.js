const {connect} = require('react-redux');
const data = require('../data.js');

const Page = require('../components/page.jsx');
const PageArtwork = require('../components/page-artwork.jsx');
const PageGallery = require('../components/page-gallery.jsx');
const ArtPageContents = require('../components/art.jsx');
const Header = require('../components/header.jsx');
const HomePageContents = require('../components/home.jsx');

const actions = require('../actions/actions.js');

const PageContainer = connect(
	( state ) => {
		return{
			state
		}
	},
	( dispatch ) => {
		return{
			initialiseGalleries: ()=>{
				for (let n in data.galleries){
					const gallery = data.galleries[n];
					dispatch(actions.addGallery({
						name: gallery.name,
						slug: gallery.slug,
						imageUrl: gallery.imageUrl,
						mainCategory: gallery.mainCategory,
						subCategory: gallery.subCategory,
						description: gallery.description
					}))
				};
			},
			initialiseArt: () =>{
				for (let n in data.artworks){
					const artwork = data.artworks[n];
					dispatch(actions.addArt({
						slug: artwork.slug,
						name: artwork.name,
						url: artwork.url,
						thumbUrl: artwork.thumbUrl,
						gallery: artwork.gallery,
						text: artwork.text,
						date: artwork.date
					}));
				};
			},
			setPath: (path) =>{
				dispatch(actions.setPath(path));
			}

		};
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
	(state) => {return{
		galleries: state.galleries,
		selectedGalleryObject: state.selectedGalleryObject,
	}},
	(dispatch) => {return{
		setMainCategory: (category) => {
			dispatch(actions.setMainCategory(category))
		}
	}}
)(ArtPageContents);

const HomeContainer = connect(
	(state) => {return{
		artworks: state.artworks.slice(0,8)
	}}
)(HomePageContents);

module.exports = {
	PageContainer,
	PageArtworkContainer,
	PageGalleryContainer,
	ArtPageContentsContainer,
	HomeContainer
}
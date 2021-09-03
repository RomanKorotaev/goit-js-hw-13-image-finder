import './sass/main.scss';
import ImageApiService from './js/apiService'
import axios from 'axios';
import onePhotoCardTpl from './templates/onePhotoCardTpl.hbs';


console.log("index2.js")

const imageApiService = new ImageApiService();


// const KEY_API = '23193680-1d95b6a7ab6e160162f942df5'
// const BASE_URL = 'pixabay.com/api'

//let searchQuery = '';

 //const pageCounter = 1;


const refs = {
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('#input'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('[data-action="load-more"]')
    //loadMore: document.querySelector('#loadMore')
    
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

   imageApiService.query= e.currentTarget.elements.query.value;
   imageApiService.fetchImages();
}
 

function onLoadMore() {
    imageApiService.fetchImages();
 }

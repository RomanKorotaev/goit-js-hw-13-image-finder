import './sass/main.scss';
import ImageApiService from './js/apiService';
import refs from './js/refs';
import axios from 'axios';
import onePhotoCardTpl from './templates/onePhotoCardTpl.hbs';



const imageApiService = new ImageApiService();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchImages().then(hits => console.log(hits));
   imageApiService.fetchImages().then(onePhotoCardMarkUp);
}
 

function onLoadMore() {
  //  imageApiService.fetchImages().then(hits => console.log(hits));
    imageApiService.fetchImages().then(onePhotoCardMarkUp);
}

 
// Функция получает объект, применяем распыление, чтобы вытянуть из него только те свойства, что нам нужны
function onePhotoCardMarkUp(hits) {
    
//Рендерим разментку из шаблона onePhotoCardTpl.hbs через функцию onePhotoCardTpl () . Был установлен пакет с шаблонизатором  "parcel-plugin-handlebars-precompile": "^1.0.2"
refs.gallery.insertAdjacentHTML('beforeend', onePhotoCardTpl(hits))

  
    
}

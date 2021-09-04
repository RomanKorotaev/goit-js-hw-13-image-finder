import './sass/main.scss';
import ImageApiService from './js/apiService';
import refs from './js/refs';
import axios from 'axios';
import onePhotoCardTpl from './templates/onePhotoCardTpl.hbs';


import { alert, info, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';


const imageApiService = new ImageApiService();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    //clearPhotosGallary();
  if (e.currentTarget.elements.query.value === '') {alert({text: 'You didn`t enter a query!'});
  } else {
        imageApiService.query = e.currentTarget.elements.query.value;
        imageApiService.resetPage();
        imageApiService.fetchImages()
          .then(hits => {
            if (hits.length === 0) {
              info({ text: 'No such images!' });
            }
            else {
              clearPhotosGallary();
              PhotoCardMarkUp(hits);
              refs.loadMore.classList.remove("visually-hidden")
            }         
          })
          .catch(() => { alert({ text: 'Ошибка при запросе на бекенд!'}); } );
      
      }
}


// //  --------- Начало функции onSearch c более чистым синтаксисом, без проверки что ввёл пользователь -------//
//  function onSearch(e) {
//     e.preventDefault();
//     imageApiService.query = e.currentTarget.elements.query.value;
//     imageApiService.resetPage();
//     imageApiService.fetchImages().then(hits=>{
//         clearPhotosGallary();
//         onePhotoCardMarkUp(hits);
//     });
// }
// //  --------- Конец функции onSearch c более чистым синтаксисом, без проверки что ввёл пользователь -------//


function onLoadMore() {
  //  imageApiService.fetchImages().then(hits => console.log(hits));
    imageApiService.fetchImages()
        .then(PhotoCardMarkUp)
        .then(() => {
      scrollGallery();
    });
 
}

 
// Функция получает объект, применяем распыление, чтобы вытянуть из него только те свойства, что нам нужны
function PhotoCardMarkUp(hits) {
    
//Рендерим разментку из шаблона onePhotoCardTpl.hbs через функцию onePhotoCardTpl () . Был установлен пакет с шаблонизатором  "parcel-plugin-handlebars-precompile": "^1.0.2"
refs.gallery.insertAdjacentHTML('beforeend', onePhotoCardTpl(hits))
  
}


function clearPhotosGallary() {
    refs.gallery.innerHTML = '';
 }


function scrollGallery() {
     refs.loadMore.scrollIntoView({
     behavior: 'smooth',
     block: 'end',
  });
}

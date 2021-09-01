import './sass/main.scss';
import axios from 'axios';

console.log('Домашнее задание №13 по JS: goit-js-hw-13-image-finder');


/*
https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=23193680-1d95b6a7ab6e160162f942df5

*/

const refs = {
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('#input'),
    gallery: document.querySelector('.gallery')
}

let pageCounter = 1;

 // Пример запроса на бекенд через функцию  библиотеку axios: npm install axios
 // сначала установить ее через коменду npm install, а потом экспортируем в файл index.js: import axios from 'axios';
const hndlerSubmit = (event) => {
    event.preventDefault()
    const value = refs.input.value;
    console.log(value)

axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${pageCounter}&per_page=12&key=23193680-1d95b6a7ab6e160162f942df5 `)
    //.then(result => console.log(result.data.hits))
    .then(result => renderCollection (result.data.hits))
   // .then(result => renderCollection (result.data.drinks))
      .catch(err => console.log(err))   
    
}


function createItem({webformatURL, tags, likes, views, comments, downloads}) {  
    const onePhotoCard = `<li>
       <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" />

  <div class="stats">
    <p class="stats-item">
      <i class="material-icons">thumb_up (likes)</i>
      ${likes}
    </p>
    <p class="stats-item">
      <i class="material-icons">visibility (views)</i>
      ${views}
    </p>
    <p class="stats-item">
      <i class="material-icons">comment</i>
      ${comments}
    </p>
    <p class="stats-item">
      <i class="material-icons">cloud_download</i>
      ${downloads}
    </p>
  </div>
</div>
        </li>
    `
    refs.gallery.insertAdjacentHTML('beforeend', onePhotoCard)
}

function renderCollection(arr) {
    arr.forEach (el => createItem (el) )
}



refs.searchForm.addEventListener('submit', hndlerSubmit)



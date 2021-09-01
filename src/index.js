import './sass/main.scss';
import axios from 'axios';
import onePhotoCardTpl from './templates/onePhotoCardTpl.hbs';

console.log('Домашнее задание №13 по JS: goit-js-hw-13-image-finder');



const refs = {
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('#input'),
    gallery: document.querySelector('.gallery')
}

let pageCounter = 1;

 // Пример запроса на бекенд через  библиотеку axios: npm install axios
 // сначала установить ее через коменду npm install, а потом экспортируем в файл index.js: import axios from 'axios';
const hndlerSubmit = (event) => {
    event.preventDefault()  // сброс настроек по умолчанию
    const value = refs.input.value;
    console.log(value)

axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${pageCounter}&per_page=12&key=23193680-1d95b6a7ab6e160162f942df5 `)
    .then(result => { renderCollection(result.data.hits); console.log ("result.data.hits = ", result.data.hits) })
    .catch(err => console.log(err))   
    
}

// Функция получает объект, применяем распыление, чтобы вытянуть из него только те свойства, что нам нужны
function createItem({ webformatURL, tags, likes, views, comments, downloads }) {
    
//Рендерим разментку из шаблона onePhotoCardTpl.hbs через функцию onePhotoCardTpl () . Был установлен пакет с шаблонизатором  "parcel-plugin-handlebars-precompile": "^1.0.2"
refs.gallery.insertAdjacentHTML('beforeend', onePhotoCardTpl({webformatURL, tags, likes, views, comments, downloads}))
}

function renderCollection(arr) {
     //Чтобы нарисовать все карточки за одно обращение - после цикла map() применяем функцию массива join('')/
    //и всю разметку всех элементов полученного массива превращаем в отду строку
   return arr.map(createItem).join('');
}



refs.searchForm.addEventListener('submit', hndlerSubmit)



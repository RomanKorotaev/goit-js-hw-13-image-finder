import './sass/main.scss';
import axios from 'axios';
import onePhotoCardTpl from './templates/onePhotoCardTpl.hbs';

console.log('Домашнее задание №13 по JS: goit-js-hw-13-image-finder');



const refs = {
    searchForm: document.querySelector('#search-form'),
    input: document.querySelector('#input'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('#loadMore')
}

let pageCounter = 1;

//---------------------

function handleButtonClick() {
  refs.loadMore.scrollIntoView({block: "end", behavior: "smooth"});
   // btm2.scrollIntoView({block: "end", behavior: "smooth"});
}
//---------------------


 // Пример запроса на бекенд через  библиотеку axios: npm install axios
 // сначала установить ее через коменду npm install, а потом экспортируем в файл index.js: import axios from 'axios';
const hndlerSubmit = (event) => {
   event.preventDefault()  // сброс настроек по умолчанию
    const value = refs.input.value;
    console.log(value)

 const axiosPrpmice = axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${pageCounter}&per_page=12&key=23193680-1d95b6a7ab6e160162f942df5 `)
        .then(result => { renderCollection(result.data.hits); console.log("result.data.hits = ", result.data.hits);  })
        .then(() => { pageCounter++; } ) // увеличиваем счётчик после каждого запроса
     .catch(err => console.log(err))
    
    const scrollingWithDelay = async () => {
        console.log ("Вызвана функция scrollingWithDelay")
        const result = await axiosPrpmice;
        console.log (' typeof axiosPrpmice', typeof axiosPrpmice)
     }
    
    scrollingWithDelay();
    
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



refs.searchForm.addEventListener('submit', hndlerSubmit);
refs.loadMore.addEventListener('click', hndlerSubmit);

//console.log("TEST: ", hndlerSubmit('click'));

/*
//Страница должна автоматически плавно проскроливаться после рендера изображений, чтобы перевести пользователя на
//следующие загруженные изображения.Используй метод Element.scrollIntoView().

function handleButtonClick() {
   refs.loadMore.scrollIntoView({block: "center", behavior: "smooth"});
}


refs.loadMore.addEventListener('click', handleButtonClick)
*/

// var hiddenElementLoadMore = document.getElementById("loadMore");
// var btn = document.querySelector('.loadMore');

// const btm2 =document.querySelector('#loadMoreContainer'); 

// function handleButtonClick() {
//   refs.gallery.scrollIntoView({block: "end", behavior: "smooth"});
//    // btm2.scrollIntoView({block: "end", behavior: "smooth"});
// }

//btn.addEventListener('click', handleButtonClick);
//refs.loadMore.addEventListener('click', handleButtonClick);


const KEY_API = '23193680-1d95b6a7ab6e160162f942df5'
const BASE_URL = 'pixabay.com/api'

const pageCounter = 1;

 class ImageApiService {

     constructor() {
         this.searchQuery = '';
    };
    
     
    fetchImages(searchQuery) {  
        fetch(`https://${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${pageCounter}&per_page=12&key=${KEY_API} `)
        .then(response => response.json())
        .then (console.log) 
    }

     get query() {
         return this.searchQuery;
     }
     
     set query(newQuery) {
         this.searchQuery = newQuery;
     }

}
 
export default ImageApiService
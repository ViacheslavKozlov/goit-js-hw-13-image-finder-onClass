// https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
// const API_KEY = '23294543-72cf202e86e11bc05e525db7a';
// const BASE_URL = 'https://pixabay.com/api';

// export default function fetchImages(searchQuery, pageNumber) {
//     return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${API_KEY}`)
//         .then(response => {
//             if (response.status === 404) {
//                 return Promise.reject('Not found');
//             }
//             return response.json()
//         })
// }

export default class ApiPixabay {  
    #API_KEY = '23294543-72cf202e86e11bc05e525db7a';
    BASE_URL = 'https://pixabay.com/api';

    constructor() {
        this.q = '';
        this.page = 1;
    }
    fetchImages() {
        const searchParameters = new URLSearchParams({
            image_type: 'photo',
            orientation: 'horizontal',
            q: this.q,
            page: this.page,
            per_page: 12,
            key: this.#API_KEY,
        });

        return fetch(`${this.BASE_URL}?${searchParameters}`)
            .then(response => {
                if (response.status === 404) {
                    return Promise.reject('Not found');
                }
                return response.json()
            })
    }
    
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}

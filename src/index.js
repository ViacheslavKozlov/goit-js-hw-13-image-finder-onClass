import ApiPixabay from './js/apiService';
import imageMarkup from './templates/imagemarkup.hbs';
import styles from './css/styles.css';
// const debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    searchBtn: document.querySelector('.search-btn')
}

const api = new ApiPixabay();
// refs.input.addEventListener('input', debounce(onInput, 500));
refs.input.addEventListener('submit', onInput);
refs.loadMoreBtn.addEventListener('click', onClickLoadMore);


function onInput(evt) {
    evt.preventDefault();
    const searchQuery = evt.currentTarget.elements.query.value.trim()
    // searchQuery = evt.target.value.toLowerCase().trim();
    api.q = searchQuery;
    if (searchQuery === '') {
        return
    }
    refs.searchBtn.disabled = true;
    refs.gallery.innerHTML = '';
    api.resetPage();
    getImages();
    smoothScrolling();
    // fetchImages(searchQuery)
    //     .then((data) => {
    //         renderMarkup(data)
    //         refs.searchBtn.disabled = false
    //         refs.loadMoreBtn.classList.remove('is-hidden');
    //     })

}

function getImages() {
    api.fetchImages().then(data => {
        renderMarkup(data);
        refs.searchBtn.disabled = false;
        refs.loadMoreBtn.classList.remove('is-hidden');
    })
}

function renderMarkup({ hits }) {
    refs.gallery.insertAdjacentHTML('beforeend', imageMarkup(hits))
}

function onClickLoadMore() {
    api.incrementPage();

    api.fetchImages()
        .then(data => {
            renderMarkup(data)
            smoothScrolling();
        })
        
        // .then((images) =>  {
        //     renderMarkup(images)
        //     smoothScrolling()
        // })
}

function smoothScrolling() {
    setTimeout(refs.loadMoreBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    }), 500)
    
}

// function incrementPage() {
//     pageNumber += 1;
// }

// function resetPage() {
//     pageNumber = 1;
// }
// function checkLastPage() {
    //     fro
    //     frown
    // }

// function changeInput(value) {
//     searchQuery = value;
// }
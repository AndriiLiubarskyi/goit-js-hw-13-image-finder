import './sass/main.scss';
import imagesTpl from './templates/images.hbs';
import ImageApiService from './js/apiService';


const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
};

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    clearImagesContainer();
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchImage().then(images => {
        appendImagesMarkup(images);
    });
}

function onLoadMore() {
    imageApiService.fetchImage().then(appendImagesMarkup);
};

function appendImagesMarkup(images) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', imagesTpl
        (images))
    refs.articlesContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
};

function clearImagesContainer() {
    refs.articlesContainer.innerHTML = '';
};

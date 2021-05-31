// import './sass/main.scss';
// import onSearch from './js/apiService'
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
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.fetchImage(searchQuery);
};

function onLoadMore() {
    imageApiService.fetchImage(searchQuery);
};


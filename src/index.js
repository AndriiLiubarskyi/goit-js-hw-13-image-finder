import './sass/main.scss';
import imagesTpl from './templates/images.hbs';
import ImageApiService from './js/apiService';


const refs = {
    div: document.querySelector('.div'),
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
};

refs.loadMoreBtn.classList.add("hidden");
const imageApiService = new ImageApiService();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    hiddenRemove();
    e.preventDefault();
    clearImagesContainer();
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    imageApiService.fetchImage().then(images => {
        appendImagesMarkup(images);
    });
};

function onLoadMore() {
    imageApiService.fetchImage()
    .then(appendImagesMarkup)
        .then(hiddenRemove)
        .then(divbottom)
    };
    
function divbottom() {    
  refs.div.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        })   
};

    function appendImagesMarkup(images) {
        refs.articlesContainer.insertAdjacentHTML('beforeend', imagesTpl
        (images))

};

function hiddenRemove() {
      refs.loadMoreBtn.classList.remove('hidden');
};


function clearImagesContainer() {
    refs.articlesContainer.innerHTML = '';
};
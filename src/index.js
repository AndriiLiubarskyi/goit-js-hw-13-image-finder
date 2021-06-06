import './sass/main.scss';
import imagesTpl from './templates/images.hbs';
import ImageApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';


const div = document.querySelector('.div')

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
};


const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();
    imageApiService.query = e.currentTarget.elements.query.value;
    imageApiService.resetPage();
    loadMoreBtn.hide();
    imageApiService.fetchImage().then(images => {
        clearImagesContainer();
        appendImagesMarkup(images);
        const imagesArrayLength = document.querySelector('.js-articles-container').children.length;
        if (imagesArrayLength > 11) {
            loadMoreBtn.show();
        };
    });
};


function onLoadMore() {
    loadMoreBtn.disable();
    imageApiService.fetchImage()
        .then(images => {
            appendImagesMarkup(images);
            loadMoreBtn.enable();
        })
    };
    
    function appendImagesMarkup(images) {
        refs.articlesContainer.insertAdjacentHTML('beforeend', imagesTpl(images));
        setTimeout(() =>
            {
                div.scrollIntoView(
                    { behavior: 'smooth', block: 'end', }
                )
            }, 1000);
};
         
function clearImagesContainer() {
    refs.articlesContainer.innerHTML = '';
};
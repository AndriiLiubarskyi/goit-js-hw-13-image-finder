export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImage() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=21859794-b320bd39175c403fcfc8c4a95`;
       return fetch(url)
            .then(r => r.json())
            .then(data => {
                this.incrementPage();
                return data.hits;
            });  
    };

    incrementPage() {
        this.page += 1;
    };
    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    };
};
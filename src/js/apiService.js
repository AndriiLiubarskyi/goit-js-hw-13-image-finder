export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
     }
    
    fetchImage() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=1&per_page=12&key=21859794-b320bd39175c403fcfc8c4a95`;
        fetch(url)
            .then(r => r.json())
            .then(console.log);  
    };

    get query() {
        return this.searchQuery;
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    };
};
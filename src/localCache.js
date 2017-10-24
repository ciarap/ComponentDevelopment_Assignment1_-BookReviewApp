
class LocalCache {

    constructor() {
        this.books = [] ;
    }

    getAll() {
        return this.books ;
    }

    populate(books) {
        this.books = books;
    }


}

export default (new LocalCache() );

// Author: Ciara Power 20072488

class LocalBookCache {    // local cache for books list

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

export default (new LocalBookCache() );

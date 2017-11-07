// Author: Ciara Power 20072488 

class LocalReviewCache {  // local cache for reviews list

    constructor() {
        this.reviews = [] ;
    }

    getAll() {
        return this.reviews ;
    }

    populate(reviews) {
        this.reviews = reviews;
    }


}

export default (new LocalReviewCache() );

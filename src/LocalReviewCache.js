class LocalReviewCache {

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

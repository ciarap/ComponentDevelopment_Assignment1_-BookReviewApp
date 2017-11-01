  class AuthorCache {

        constructor() {
           this.author = null ;
        }

        setAuthor(author) {
           this.author = author ;
        }

        getAuthor() {
           return this.author;
        }

    }

    export default (new AuthorCache() );
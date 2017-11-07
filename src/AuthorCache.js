  // Author : Ciara Power 20072488

  class AuthorCache {   // local cache for one author object

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
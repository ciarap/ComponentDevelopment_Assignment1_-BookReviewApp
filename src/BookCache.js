// Author: Ciara Power 20072488

  class BookCache {  // local cache for one book object

        constructor() {
           this.book = null ;
        }

        setBook(book) {
           this.book = book ;
        }

        getBook() {
           return this.book;
        }

    }

    export default (new BookCache() );
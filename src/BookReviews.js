import React from 'react';

  class BookReviews extends React.Component {

      state = { };

       componentDidMount() {
            request.get(
             '/bookDetails/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                BookCache.setBook(json);
                this.setState({});
           }) ;

 request.get(
            '/authors/' + this.props.params.authorId + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                AuthorCache.setAuthor(json);
                 this.setState({});
           }) ;
      } 
      render(){

          let bookDisplay = <p>No book details + {this.props.params.id}</p> ; 
          let book= BookCache.getBook();

          let authorDisplay = <p>No author details + {this.props.params.authorId}</p> ; 
          let author=AuthorCache.getAuthor();

         if(author){
            authorDisplay = (
            <AuthorSection author={author}  />
              )
          }
          if (book) {
              bookDisplay =  (
                <div>
                    <div className="row">
                      <div className="col-md-1">
                       <Link className="link" to={'/AllBooks/'}> 
                       <img className="img-responsive back-arrow" src="/img/back_arrow.png" alt="Back Arrow" />
                        <figcaption>  Go Back  </figcaption>
                        </Link> 
                        </div>
                         <div className="col-md-10">
                       <h1 className="BlackPageTitle">{book.title}</h1>      
                    </div>
                    </div>
                    <BookSection book={book} />
                    {authorDisplay}
                    </div>
                    ) ;
          }
          return (
            <div>
              {
            </div>
            );
      }
    };



 
    export default BookReviews;
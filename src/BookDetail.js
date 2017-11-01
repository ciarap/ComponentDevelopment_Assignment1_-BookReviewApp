 import React from 'react';
    import localCache from './localCache';
    import BookCache from './BookCache';
    import request from 'superagent' ; 
     import { Link } from 'react-router'; 
   

   class BookSection extends React.Component { 
      render(){
          var mainImage = (
            <div className="book-images">
              <img src={"../"+this.props.book.imageUrl}  
                    alt={this.props.book.title}  className="book"/>
            </div>
            ) ;
            return (
                <div className="row">
                <div className="col-md-4">
                   {mainImage}
                   </div>
                   <div className="col-md-7  about">
                   <h1>About</h1>
                    <p> {this.props.book.blurb}</p>
                    </div>
                  </div>
                  );
          }
    };

    class AuthorSection extends React.Component { 
      render(){
          var mainImage = (
            <div className="author-images">
              <img src={"../"+this.props.book.authorImageUrl}  
                    alt={this.props.book.author}  className="author"/>
            </div>
            ) ;
            return (
                   <div className="author">
                   <h1>Author</h1>
                   {mainImage}
                    <p> {this.props.book.author}</p>
                    
                  </div>
                  );
          }
    };


    class BookDetail extends React.Component {

      state = { };

       componentDidMount() {
            request.get(
             '/bookDetails/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                BookCache.setBook(json);
                this.setState({});
           }) ;
      } 
      render(){
          let display = <p>No book details + {this.props.params.id}</p> ; 
          let book= BookCache.getBook();
          if (book) {
              display =  (
                <div>
                    <div className="row">
                      <div className="col-md-1">
                       <Link className="link" to={'/AllBooks/'}> 
                       <img className="img-responsive back-arrow" src=".././img/back_arrow.png" alt="Back Arrow" />
                        <figcaption>  Go Back  </figcaption>
                        </Link> 
                        </div>
                         <div className="col-md-10">
                       <h1 className="BlackPageTitle">{book.title}</h1>      
                    </div>
                    </div>
                    <BookSection book={book} />
                    <AuthorSection book={book} />
                    </div>
                    ) ;
          }
          return (
            <div>
              {display}
            </div>
            );
      }
    };



 
    export default BookDetail;
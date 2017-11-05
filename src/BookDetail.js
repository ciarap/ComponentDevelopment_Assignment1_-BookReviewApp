 import React from 'react';
    import BookCache from './BookCache';
    import AuthorCache from './AuthorCache';
    import request from 'superagent' ; 
     import { Link } from 'react-router'; 
   

   class BookSection extends React.Component { 
      render(){
          var mainImage = (
            <div className="book-images">
              <img src={"/"+this.props.book.imageUrl}  
                    alt={this.props.book.title}  className="book"/>
            </div>
            ) ;
            return (
                <div className="row">
                <div className="col-md-4">
                   {mainImage}
                   </div>
                   <div className="col-md-7  about">
                   <div className="row">
                   <div className="col-md-10">
                   <h1>About</h1>
                   </div>
                   <div className="col-md-2" style={{float:'right',textAlign:'right'}}>
                    <span className="glyphicon glyphicon-heart "  style={{ color: 'red',fontSize:'50px' }}>  {this.props.book.votes}</span> 
                   

                   </div>

                   </div>
                   <h4> Category: {this.props.book.category}</h4>
                   <h4> Publish Date: {this.props.book.date}</h4>

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
              <img src={"/"+this.props.author.imageUrl}  
                    alt={this.props.author.name}  className="author"/>
            </div>
            ) ;
            return (
                   <div className="authorAbout">
                   <div className="row">
                   <div className="col-md-3">
                   {mainImage}
                   </div>
                   <div className="col-md-9 ">
                   <h1 >Author</h1>
                   <a className="link" href={this.props.author.url}>
                   <h3>{this.props.author.name}</h3>
                   </a>
                    <p> {this.props.author.info}</p>
                    </div>
                    </div>
                  </div>
                  );
          }
    };


    class BookDetail extends React.Component {

      state = { };

       componentDidMount() {

        request.get('http://localhost:3000/books/'+this.props.params.id)
            .end(function(error, res){
                if (res) {
                    var book = JSON.parse(res.text);
                    BookCache.setBook(book);
                    this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 

 request.get('http://localhost:3000/authors/'+this.props.params.authorId)
            .end(function(error, res){
                if (res) {
                  if(error){
                    if (error.status === 404){
                    AuthorCache.setAuthor(null);
                  }
                }
                  else{
                    var author = JSON.parse(res.text);
                    AuthorCache.setAuthor(author);
                  }
                    this.setState({}) ; 
                } else {
                   
                    console.log(error );
                 
                }
            }.bind(this)); 
      } 
      render(){

          let bookDisplay = <p>No book details + {this.props.params.id}</p> ; 
          let book= BookCache.getBook();

          let authorDisplay = <p>No author details + {this.props.params.authorId}</p> ; 
          var author=AuthorCache.getAuthor();

         if(author){
            authorDisplay = (
            <AuthorSection author={author}  />
              )
          }
          else{
            console.log("Else");
          }
          if (book) {
              bookDisplay =  (
                <div>
                    <div className="row header" >
                      <div className="col-md-1">
                       <Link className="link" to={'/AllBooks/'}> 
                       <img className="img-responsive back-arrow" src="/img/back_arrow.png" alt="arrow" />
                        <figcaption>  Go Back to All Books </figcaption>
                        </Link> 
                        </div>
                         <div className="col-md-10">
                       <h1 className="BlackPageTitle">{book.title}</h1>      
                    </div>
                    <div className="col-md-1">
                     <Link className="link" to={'/AllBooks/'+book.id+'/'+book.authorId+'/BookReviews'}>
                       <img className="img-responsive back-arrow" src="/img/forward_arrow.png" alt="arrow" />
                        <figcaption>  Reviews  </figcaption>
                        </Link> 
                        </div>
                    </div>
                    <BookSection book={book} />
                    {authorDisplay}
                    </div>
                    ) ;
          }
          return (
            <div>
              {bookDisplay}
            </div>
            );
      }
    };



 
    export default BookDetail;
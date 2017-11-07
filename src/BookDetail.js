// Author : Ciara Power 20072488

 import React from 'react';
    import BookCache from './BookCache';
    import AuthorCache from './AuthorCache';
    import request from 'superagent' ; 
     import { Link } from 'react-router'; 
   

   class BookSection extends React.Component {  // section of page containing book details
    
    handleVote = () => {  // book upvoted
            this.props.upvoteHandler(this.props.book.id,this.props.book.votes);
        };

      render(){
          var mainImage = (
            <div className="book-images">
              <img src={"/"+this.props.book.images[0]}   // first image in nested images collection is main image 
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
                    <span className="glyphicon glyphicon-heart "  style={{ color: 'red',cursor: 'pointer',fontSize:'50px' }} onClick={this.handleVote}>  {this.props.book.votes}</span> {/*heart icon button  for upvotes */}
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


class ImagesSection extends React.Component{   // images section of page

  render(){
    var thumbImages = this.props.book.images.map(function(img,index) {   {/*get each image in the collection*/}
               console.log(img);
               return (
                <li key={index}>
                   <img key={index} src={"/"+img}
                       alt="missing" />

                </li>
                ) ;
              } );

  return (
    <div>
    <ul className="book-thumbs">
       {thumbImages}
     </ul>
     </div>
  );
}
};

    class AuthorSection extends React.Component {   //Author info section of page
      render(){
          var mainImage = (
            <div className="author-images">
              <img src={"/"+this.props.author.imageUrl}     // get the image to be shown 
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
                   <h3 style={{borderBottom:'none'}}>{this.props.author.name}</h3>
                   </a>
                    <p> {this.props.author.info}</p>
                    </div>
                    </div>
                  </div>
                  );
          }
    };


    class BookDetail extends React.Component {  // total book detail page component

      state = { };

       componentDidMount() {   // when component mounts

        request.get('http://localhost:3000/books/'+this.props.params.id)   // gets book object from server (READ)
            .end(function(error, res){
                if (res) {
                    var book = JSON.parse(res.text);
                    BookCache.setBook(book);
                    this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 

        request.get('http://localhost:3000/authors/'+this.props.params.authorId) //gets author relevant to book from server (READ)
            .end(function(error, res){
                if (res) {
                  if(error){
                    if (error.status === 404){   // if author doesnt exist
                    AuthorCache.setAuthor(null);
                  }
                }
                  else{
                    var author = JSON.parse(res.text);   // author found
                    AuthorCache.setAuthor(author);
                  }
                    this.setState({}) ; 
                } else {
                   
                    console.log(error );
                 
                }
            }.bind(this)); 
      } 


      componentWillUpdate() {  // before update

        request.get('http://localhost:3000/books/'+this.props.params.id)  //get the book from server (READ)
            .end(function(error, res){
                if (res) {
                    var newBook = JSON.parse(res.text);   // new book from server
                    var oldBook=BookCache.getBook();   // book that was previously loaded
                    BookCache.setBook(newBook);
                    newBook=BookCache.getBook();

                    if(newBook.votes !== oldBook.votes){   // if the votes differ, an upvote occurred, so update 
                      this.setState({});
                }
              }
                 else {
                    console.log(error );
                }
            }.bind(this));     
      };


       incrementUpvote = (bookId,votes) => {   // when upvote occurs
             request.patch('http://localhost:3000/books/'+bookId,{"votes": votes+1})  // patches the new votes value to the books attribute
            .end(function(error, res){
                if (res) {
                  console.log(res);
                  this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
          };

      render(){

          let bookDisplay = <p>No book details + {this.props.params.id}</p> ; 
          let book= BookCache.getBook();

          let authorDisplay = <p>No author details + {this.props.params.authorId}</p> ; 
          var author=AuthorCache.getAuthor();

         if(author){  // if author exists
            authorDisplay = (
            <AuthorSection author={author}  />
              )
          }
          if (book) {  // if book exists
              bookDisplay =  (
                <div>
                    <div className="row header" >
                      <div className="col-md-1">
                       <Link className="link" to={'/AllBooks/'}>     {/*link back to all books page*/}
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
                    <BookSection book={book} upvoteHandler={this.incrementUpvote} />
                     <div className="bookCoverImages">
                       <h1> Alternative Book Covers </h1>
                     <ImagesSection book={book}/>
                     </div>
                    </div>
                    ) ;
          }
          return (
            <div>
              {bookDisplay}
                {authorDisplay}
            </div>
            );
      }
    };

 
    export default BookDetail;
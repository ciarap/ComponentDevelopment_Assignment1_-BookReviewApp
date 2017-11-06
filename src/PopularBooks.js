import React from 'react';
import LocalBookCache from './LocalBookCache';
import _ from 'lodash';
 import { Link } from 'react-router'; 
  import BookCache from './BookCache';

var request = require('superagent') ;

class PopularBookListItem extends React.Component {
 state = {};
  componentDidMount() {

  request.get('http://localhost:3000/books/'+this.props.book.id)
            .end(function(error, res){
                if (res) {
                    var book = JSON.parse(res.text);
                    BookCache.setBook(book);
                    this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
}

    render() {
      let bookDisplay = (
         <li  style={{border: '1px solid black'}}>
            <p>No book details + {this.props.book.bookId}</p>
            </li> )

      let book= BookCache.getBook();

if(book){
  bookDisplay=(
    <div>
    <li style={{border: '1px solid black'}} >
    <div className="row">
   <div className="col-md-2" style={{margin:'auto',minHeight: '180px'}}>
             <Link className="link" to={'/AllBooks/' + book.id +'/'+book.authorId}>
            <img src={"../"+book.images[0]} alt= {book.title} className="thumb"/>
                 </Link>
                 </div>
                  <div className="col-md-10">
                   <h4> 
                   <span  style={{fontWeight:'bold'}}>Votes: </span> 
                      <span className="glyphicon glyphicon-heart "  style={{ color: 'red',fontSize:'25px' }} > {this.props.book.votes}</span>
                       </h4>
                 <h4><span  style={{fontWeight:'bold'}}>Book:</span>  <Link className="link" to={'/AllBooks/' + book.id +'/'+book.authorId}>{book.title}</Link></h4>
                <h4><span  style={{fontWeight:'bold'}}> Author: </span>{this.props.book.author}</h4>
                <h4> <span style={{fontWeight:'bold'}}>Category: </span>{this.props.book.category}</h4>
                <h4> <span  style={{fontWeight:'bold'}}>Date: </span>{this.props.book.date}</h4>
                  <h4> <span  style={{fontWeight:'bold'}}>Blurb: </span>{this.props.book.blurb}</h4>
                   </div> 
                   </div>
                </li>
                </div>
  )
}
        return (
             <span>{bookDisplay}</span>
        );
    }
}


class FilteredPopularBooksList extends React.Component {
      render() {
          var displayedPopularBooks = this.props.books.map(function(book) {
            return <PopularBookListItem key={book.id} book={book} /> ;
          }) ;
          return (
                  <div >
                    <ul className="allPopularBooks">
                        {displayedPopularBooks}
                    </ul>
                  </div>
            ) ;
      }
    }


class PopularBooks extends React.Component{
componentDidMount() {
        request.get('http://localhost:3000/books')
            .end(function(error, res){
                if (res) {
                    var books = JSON.parse(res.text);
                    LocalBookCache.populate(books);
                    this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
    }
          render(){
                let list = LocalBookCache.getAll();
                let filteredPopularBooksList = _.sortBy(list, 'votes') ;
                filteredPopularBooksList=filteredPopularBooksList.reverse();
                filteredPopularBooksList=filteredPopularBooksList.slice(0,5);
           return (
           <div className="popularBooksBlock">
                <h1 className="BlackPageTitle">Top 5 Popular Books</h1>
                <div className="view-container">
                <div className="view-frame">
                   <div className="container-fluid">
                   <div className="row">
                       <FilteredPopularBooksList books={filteredPopularBooksList} />
                  </div> 
                  </div>                   
                </div>
              </div>
              </div>
         );
    }


   

}



export default PopularBooks;
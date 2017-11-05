import React from 'react';
import LocalBookCache from './LocalBookCache';
import _ from 'lodash';
 import { Link } from 'react-router'; 
  import BookCache from './BookCache';

var request = require('superagent') ;

class SelectBox extends React.Component {
    handleChange = (e, type, value) => {
        e.preventDefault();
        this.props.onUserInput( type,value);
    };

    handleTextChange = (e) => {
        this.handleChange( e, 'search', e.target.value);
    };

    handleSortChange = (e) => {
        this.handleChange(e, 'sort', e.target.value);
    };

    render() {
        return (
            <div className="searchSortBar">
            <div className="col-md-4">
                <input type="text" placeholder="Search" 
                    value={this.props.filterText}
                    onChange={this.handleTextChange} />
            </div>
            <div className="col-md-4">
                <p>Sort by: &emsp; </p>
                <select id="sort" value={this.props.order } 
                    onChange={this.handleSortChange} >
                    <option value="title">Alphabetical</option>
                    <option value="date">Newest</option>
                    <option value="author">Author</option>
                    <option value="category">Category</option>
                     <option value="votes">Highest Rated</option>
                </select>
                </div>
            </div>
        );
    }
  }


class BookListItem extends React.Component {

    handleVote = () => {
            this.props.upvoteHandler(this.props.book.id,this.props.book.votes);
        };
    render() {
        return (
            <li className="thumbnail book-listing">
            <div className="col-md-2">
             <Link className="link" to={'/AllBooks/' + this.props.book.id +'/'+this.props.book.authorId}>
            <img src={"../"+this.props.book.imageUrl} alt= {this.props.book.title} className="thumb"/>
                 </Link>
                 </div>
                  <div className="col-md-10">
                   <Link className="link" to={'/AllBooks/' + this.props.book.id +'/'+this.props.book.authorId}>
                 <h3>{this.props.book.title}</h3>
                 </Link>
                <h4> Author: {this.props.book.author}</h4>
                <h4> Category: {this.props.book.category}</h4>
                 <h4> Publish Date: {this.props.book.date}</h4>
</div>
 <div className="col-md-2" style={{float:'right',textAlign:'right'}}>
                    <span className="glyphicon glyphicon-heart "  style={{ color: 'red',cursor: 'pointer',fontSize:'25px' }} onClick={this.handleVote}> {this.props.book.votes}</span> 
                    </div>
            </li>
        );
    }
}


class FilteredBookList extends React.Component {
      render() {
          var displayedBooks = this.props.books.map(function(book) {
            return <BookListItem key={book.id} book={book}  upvoteHandler={this.props.upvoteHandler} /> ;
          }.bind(this)) ;
          return (
                  <div className="col-md-10">
                    <ul className="books">
                        {displayedBooks}
                    </ul>
                  </div>
            ) ;
      }
    }


class AllBooks extends React.Component{

   componentWillUpdate() {

        request.get('http://localhost:3000/books')
            .end(function(error, res){
                if (res) {
                    var newBooks = JSON.parse(res.text);
                    var oldBooks=LocalBookCache.getAll();
                    LocalBookCache.populate(newBooks);
                    newBooks=LocalBookCache.getAll();

               
                for(var i=0;i<newBooks.length;i++){
                    if(newBooks[i].votes !== oldBooks[i].votes){
                      this.setState({});
                    }
                }
              }
                 else {
                    console.log(error );
                }
            }.bind(this)); 

           
      };


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
state = { search: '', sort: 'title' };
      handleChange = (type, value) => {
        if ( type === 'search' ) {
            this.setState( { search: value } ) ;
        } else {
            this.setState( { sort: value } ) ;
        }
    };

     incrementUpvote = (bookId,votes) => {
             request.patch('http://localhost:3000/books/'+bookId,{"votes": votes+1})
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
                let list = LocalBookCache.getAll().filter( (p) => {
                    return p.title.toLowerCase().search(
                        this.state.search.toLowerCase() ) !== -1 ;
                } );
                let filteredList = _.sortBy(list, this.state.sort) ;
                if(this.state.sort==="votes" || this.state.sort==="date"){
                  filteredList=filteredList.reverse();
                }
           return (
           <div className="booksBlock">
                <h1 className="WhitePageTitle">All Books</h1>
                <div className="view-container">
                <div className="view-frame">
                   <div className="container-fluid">
                   <div className="row">
                      <SelectBox onUserInput={this.handleChange } 
                             filterText={this.state.search} 
                             sort={this.state.sort} />
                       <FilteredBookList books={filteredList} upvoteHandler={this.incrementUpvote} />
                  </div> 
                  </div>                   
                </div>
              </div>
              </div>
         );
    }


   

}



export default AllBooks;
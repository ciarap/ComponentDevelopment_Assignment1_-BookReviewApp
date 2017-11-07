// Author : Ciara Power 20072488 

import React from 'react';
import LocalBookCache from './LocalBookCache';
import _ from 'lodash';
import { Link } from 'react-router'; 

var request = require('superagent') ;

class SelectBox extends React.Component {
    handleChange = (e, type, value) => {        // type will be search or sort  
        e.preventDefault();
        this.props.onUserInput( type,value);
    };

    handleTextChange = (e) => {    // type in search bar
        this.handleChange( e, 'search', e.target.value);
    };

    handleSortChange = (e) => {   // sort value dropdown changes
        this.handleChange(e, 'sort', e.target.value);
    };

    render() {
        return (
            <div className="searchSortBar">   {/*search text input*/}
            <div className="col-md-4">
                <input type="text" placeholder="Search" 
                    value={this.props.filterText}
                    onChange={this.handleTextChange} />
            </div>
            <div className="col-md-4">   {/*sort dropdown menu*/}
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


class BookListItem extends React.Component {   //each individual book item details listed

    handleVote = () => {   
            this.props.upvoteHandler(this.props.book.id,this.props.book.votes);
        };

         handleDelete = () => {
            this.props.deleteHandler(this.props.book.id);
        };

    render() {
        return (
            <li className="thumbnail book-listing">
            <div>
            <div className="row">
            <div className="col-md-2">
             <Link className="link" to={'/AllBooks/' + this.props.book.id +'/'+this.props.book.authorId}>  {/* Image is link to book details page*/}
            <img src={"../"+this.props.book.images[0]} alt= {this.props.book.title} className="thumb"/>
                 </Link>
                 </div>
                  <div className="col-md-7">
                   <Link className="link" to={'/AllBooks/' + this.props.book.id +'/'+this.props.book.authorId}>  {/* Title is link to book details page*/}
                 <h3>{this.props.book.title}</h3>
                 </Link>
                <h4> Author: {this.props.book.author}</h4>
                <h4> Category: {this.props.book.category}</h4>
                 <h4> Publish Date: {this.props.book.date}</h4>
             </div>
                  <div className="col-md-3" style={{float:'right',textAlign:'right'}} onClick={this.handleDelete}>   {/* Delete Button */}
                    <button type="delete" className="btn btn-danger"
                        >Delete</button>
                        </div>
                        </div>
                           <div className="row">
                  } 
               <div className="col-md-3" style={{float:'right',textAlign:'right'}}>   {/* Heart to upvote book */}
                    <span className="glyphicon glyphicon-heart "  style={{ color: 'red',cursor: 'pointer',fontSize:'25px' }} onClick={this.handleVote}> {this.props.book.votes}</span> 
                    </div>
                    </div>
                    </div>
            </li>
        );
    }
}


class FilteredBookList extends React.Component {     // The full list of filtered book items
      render() {
          var displayedBooks = this.props.books.map(function(book) {   /*  to deal with one book item from the books array at a time */
            return <BookListItem key={book.id} book={book}  upvoteHandler={this.props.upvoteHandler}  deleteHandler={this.props.deleteHandler} /> ;
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


class AllBooks extends React.Component{   // overall component for page

   componentWillUpdate() {     // called just before update when component values change

        request.get('http://localhost:3000/books')    // (READ)
            .end(function(error, res){
                if (res) {
                    var newBooks = JSON.parse(res.text);   {/* the updated json file from server*/}
                    var oldBooks=LocalBookCache.getAll();   {/* the previous list of books that was stored in cache */}
                    LocalBookCache.populate(newBooks);
                    newBooks=LocalBookCache.getAll();    {/* updated list*/}

               if(newBooks.length!== oldBooks.length){    {/* if list length was changed */}
                this.setState({});
               }
               else{
                for(var i=0;i<newBooks.length;i++){   { /* for each book in the new list, if votes isnt equal to votes in corresponding book of old list */}
                    if(newBooks[i].votes !== oldBooks[i].votes){
                      this.setState({});
                    }
                }
               }
             }
          else {
                    console.log(error );
                }
            }.bind(this)); 
      };


componentDidMount() {      // when component is mounted at first 

        request.get('http://localhost:3000/books')   // Get books list from server  (READ)
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

    state = { search: '', sort: 'title',  };      // sort state originally set to title so default load shows alphabetical order 

    handleChange = (type, value) => {     // handles change for search or sort input
        if ( type === 'search' ) {
            this.setState( { search: value } ) ;    
        } else {
            this.setState( { sort: value } ) ;
        }
    };

     incrementUpvote = (bookId,votes) => {    // increments the votes in the book object on server when user upvotes a book in list
             
             request.patch('http://localhost:3000/books/'+bookId,{"votes": votes+1})    // patches the votes attribute in book object (UPDATE)
            .end(function(error, res){
                if (res) {
                  console.log(res);
                  this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
          };

           deleteBook = (bookId) => {    // handles deleting book when delete button pressed

             request.delete('http://localhost:3000/books/'+bookId)   // deletes book with specified id from json server 
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
                let list = LocalBookCache.getAll().filter( (p) => {      {/* searches through list in accordance with search state value*/}
                    return p.title.toLowerCase().search(
                        this.state.search.toLowerCase() ) !== -1 ;
                } );
                
                let filteredList = _.sortBy(list, this.state.sort) ;   {/* sorts by sort value */}
                if(this.state.sort==="votes" || this.state.sort==="date"){   {/* default number sorting goes low -> high, so reverse for high -> low */}
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

                       <FilteredBookList books={filteredList} upvoteHandler={this.incrementUpvote}  deleteHandler={this.deleteBook} />

                  </div> 
                  </div>                   
                </div>
              </div>
              </div>
         );
    }
}


export default AllBooks;
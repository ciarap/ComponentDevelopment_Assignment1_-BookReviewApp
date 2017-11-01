import React from 'react';
import localCache from './localCache';
import _ from 'lodash';
 import { Link } from 'react-router'; 

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
                    <option value="age">Newest</option>
                    <option value="author">Author</option>
                    <option value="category">Category</option>
                </select>
                </div>
            </div>
        );
    }
  }


class BookListItem extends React.Component {
    render() {
        return (
            <li className="thumbnail book-listing">
             <Link className="link" to={'/AllBooks/' + this.props.book.id +'/'+this.props.book.authorId}>
            <img src={"../"+this.props.book.imageUrl} alt= {this.props.book.title} className="thumb"/>
                <h3>{this.props.book.title}</h3>
                 </Link>
                <h4> Author: {this.props.book.author}</h4>
                <h4> Category: {this.props.book.category}</h4>

            </li>
        );
    }
}


class FilteredBookList extends React.Component {
      render() {
          var displayedBooks = this.props.books.map(function(book) {
            return <BookListItem key={book.id} book={book} /> ;
          }) ;
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
componentDidMount() {
        request.get('http://localhost:3000/books')
            .end(function(error, res){
                if (res) {
                    var books = JSON.parse(res.text);
                    localCache.populate(books);
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
          render(){
                let list = localCache.getAll().filter( (p) => {
                    return p.title.toLowerCase().search(
                        this.state.search.toLowerCase() ) !== -1 ;
                } );
                let filteredList = _.sortBy(list, this.state.sort) ;
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
                       <FilteredBookList books={filteredList} />
                  </div> 
                  </div>                   
                </div>
              </div>
              </div>
         );
    }


   

}



export default AllBooks;
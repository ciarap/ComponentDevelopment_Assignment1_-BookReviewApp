import React from 'react';
import localCache from './localCache';

var request = require('superagent') ;


class BookListItem extends React.Component {
    render() {
        return (
            <li className="thumbnail book-listing">
            <img src={"../"+this.props.book.imageUrl} alt= {this.props.book.title} className="thumb"/>
                <h3>{this.props.book.title}</h3> 
                <h4> Author: {this.props.book.author}</h4>
                <h4> Category: {this.props.book.category}</h4>
            </li>
        );
    }
}


class BookList extends React.Component {
    render() {
        var items = this.props.list.map(function(item) {
            return <BookListItem key={item.title} book={item} />;
        });
        return (
         <div >
            <ul className="books">
                {items}
            </ul>
            </div>
        );
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

    render() {
        return (
            <div className="booksBlock">
                <h1 className="WhitePageTitle">All Books</h1>
                <BookList list={localCache.getAll()} /> </div>
        );
    }

}

export default AllBooks;
import React from 'react';
import localCache from './localCache';

var request = require('superagent') ;


class BookListItem extends React.Component {
    render() {
        return (
            <li> 
                <h2>{this.props.book.title}</h2> 
                <h3> Author: {this.props.book.author}</h3>
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
            <ul>
                {items}
            </ul>
        );
    }
}


class Books extends React.Component{
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
            <div>
                <h1>Books List</h1>
                <BookList list={localCache.getAll()} />
            </div>
        );
    }

}

export default Books;
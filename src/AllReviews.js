import React from 'react';
import LocalReviewCache from './LocalReviewCache';
import _ from 'lodash';
 import { Link } from 'react-router'; 
  import BookCache from './BookCache';

var request = require('superagent') ;

class SelectBox extends React.Component {
    handleChange = (e,  value) => {
        e.preventDefault();
        this.props.onUserInput( value);
    };


    handleSortChange = (e) => {
        this.handleChange(e,  e.target.value);
    };

    render() {
        return (
            <div className="searchSortBar">
                <p>Sort by: &emsp; </p>
                <select id="sort" value={this.props.order} 
                    onChange={this.handleSortChange} >
                    <option value="bookId">Book</option>
                    <option value="username">User</option>
                    <option value="upvote">Highest Rated</option>
                </select>
            </div>
        );
    }
  }


class AllReviewListItem extends React.Component {
 state = {};
  componentDidMount() {

  request.get('http://localhost:3000/books/'+this.props.review.bookId)
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

 componentWillReceiveProps(nextProps) {

  request.get('http://localhost:3000/books/'+this.props.review.bookId)
            .end(function(error, res){
                if (res) {
                    var newBook = JSON.parse(res.text);
                    BookCache.setBook(newBook);
                    
                    if(newBook.id!==nextProps){
                      this.setState({});
                    }
                } else {
                    console.log(error );
                }
            }.bind(this)); 
}

    render() {
      let bookDisplay = (
         <li  style={{border: '1px solid black'}}>
            <p>No book details + {this.props.review.bookId}</p>
            </li> )

      let book= BookCache.getBook();

if(book){
  bookDisplay=(
    <div>
    <li style={{border: '1px solid black'}} >
    <div className="row">
   <div className="col-md-2" style={{margin:'auto'}}>
             <Link className="link" to={'/AllBooks/' + book.id +'/'+book.authorId}>
            <img src={"../"+book.imageUrl} alt= {book.title} className="thumb"/>
                 </Link>
                 </div>
                  <div className="col-md-9">
                 <h4><span  style={{fontWeight:'bold'}}>Book:</span>  <Link className="link" to={'/AllBooks/' + book.id +'/'+book.authorId}>{book.title}</Link></h4>
                <h4><span  style={{fontWeight:'bold'}}> User: </span>{this.props.review.username}</h4>
                <h4> <span style={{fontWeight:'bold'}}>Votes: </span>{this.props.review.upvote}</h4>
                <h4> <span  style={{fontWeight:'bold'}}>Review: </span>{this.props.review.opinion}</h4>
                </div>
                 <div className="col-md-1" style={{float:'right',textAlign:'right'}}>
                    <button type="delete" className="btn btn-danger"
                        >Delete</button>
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


class FilteredAllReviewList extends React.Component {


      render() {
          var displayedAllReviews = this.props.reviews.map(function(review) {
            return <AllReviewListItem key={review.id} review={review} /> ;
          }) ;
          return (
                  <div >
                    <ul className="allReviews">
                        {displayedAllReviews}
                    </ul>
                  </div>
            ) ;
      }
    }


class AllReviews extends React.Component{
componentDidMount() {


        request.get('http://localhost:3000/reviews')
            .end(function(error, res){
                if (res) {
                    var reviews = JSON.parse(res.text);
                    LocalReviewCache.populate(reviews);
                    this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
    }
state = {  sort: 'bookId' };
      handleChange = ( value) => {
            this.setState( { sort: value } ) ;
    };
          render(){
                let list = LocalReviewCache.getAll();
                let filteredAllReviewList = _.sortBy(list, this.state.sort) ;
                if(this.state.sort==="upvote"){
                  filteredAllReviewList=filteredAllReviewList.reverse();
                }
           return (
           <div className="allReviewsBlock">
                <h1 className="BlackPageTitle">All Reviews</h1>
                <div className="view-container">
                <div className="view-frame">
                   <div className="container-fluid">
                   <div className="row">
                      <SelectBox onUserInput={this.handleChange } 
                             sort={this.state.sort} />
                       <FilteredAllReviewList reviews={filteredAllReviewList} />
                  </div> 
                  </div>                   
                </div>
              </div>
              </div>
         );
    }


   

}



export default AllReviews;
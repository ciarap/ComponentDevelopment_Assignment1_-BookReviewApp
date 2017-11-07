// Author: Ciara Power 20072488

import React from 'react';
import LocalReviewCache from './LocalReviewCache';
import _ from 'lodash';
import { Link } from 'react-router'; 
import BookCache from './BookCache';

var request = require('superagent') ;

class SelectBox extends React.Component {     
    handleChange = (e,  value) => {    // handles change after sort value changes
        e.preventDefault();
        this.props.onUserInput( value);
    };


    handleSortChange = (e) => {   //sort value changes
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


class AllReviewListItem extends React.Component {    // each review item in list 
 state = {};

  componentDidMount() {       // after mounted first 

  request.get('http://localhost:3000/books/'+this.props.review.bookId)    // gets book related to the review being listed (READ)
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

 componentWillReceiveProps(nextProps) {      // change to state

    request.get('http://localhost:3000/books/'+this.props.review.bookId)   //gets book related to review in question after changes occur
            .end(function(error, res){
                if (res) {
                    var newBook = JSON.parse(res.text);
                    BookCache.setBook(newBook);
                    
                    if(newBook.id!==nextProps){    // if the id of the  book currently in item position doesnt equal the id it should have nextProps , then set state to update
                      this.setState({});
                    }
                } else {
                    console.log(error );
                }
            }.bind(this)); 
     }

        handleDelete = () => {    // delete review handler
            this.props.deleteHandler(this.props.review.id);
        };

         handleVote = () => {   // upvote review 
            this.props.upvoteHandler(this.props.review.id,this.props.review.upvote);
        };

    render() {
      let bookDisplay = (
         <li  style={{border: '1px solid black'}}>
            <p>No book details + {this.props.review.bookId}</p>   {/*default incase no book object found later*/}
            </li> )

      let book= BookCache.getBook();

if(book){    {/* book object found */}
  bookDisplay=(
    <div>
    <li style={{border: '1px solid black'}} >
    <div className="row">
   <div className="col-md-2" style={{margin:'auto'}}>
             <Link className="link" to={'/AllBooks/' + book.id +'/'+book.authorId}>   {/*link to book details*/}
            <img src={"../"+book.images[0]} alt= {book.title} className="thumb"/>
                 </Link>
                 </div>
                  <div className="col-md-9" style={{paddingTop:'2em'}}>
                 <h4><span  style={{fontWeight:'bold'}}>Book:</span>  
                        <Link className="link" to={'/AllBooks/' + book.id +'/'+book.authorId}>{book.title}</Link></h4>  {/*link to book details*/}
                <h4><span  style={{fontWeight:'bold'}}> User: </span>{this.props.review.username}</h4>
                <h4> <span  style={{fontWeight:'bold'}}>Review: </span>{this.props.review.opinion}</h4>
                </div>
                 <div className="col-md-1" style={{float:'right',textAlign:'right'}}  >   {/* Delete button */}
                    <button type="delete" onClick={this.handleDelete} className="btn btn-danger"
                        >Delete</button>
                        </div>
                         <div className="col-md-2" style={{float:'right',textAlign:'right'}}>    
                    <span className="glyphicon glyphicon-thumbs-up"  style={{ cursor: 'pointer',fontSize:'20px' }} onClick={this.handleVote}> {this.props.review.upvote}</span> {/* Vote Button */}
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


class FilteredAllReviewList extends React.Component {  // whole list of filtered reviews

      render() {
          var displayedAllReviews = this.props.reviews.map(function(review) {  {/* To deal with one review from list at a time */}
            return <AllReviewListItem key={review.id} review={review} upvoteHandler={this.props.upvoteHandler} deleteHandler={this.props.deleteHandler} /> ;
          }.bind(this)) ;
          return (
                  <div >
                    <ul className="allReviews">
                        {displayedAllReviews }
                    </ul>
                  </div>
            ) ;
      }
    }


class AllReviews extends React.Component{    // whole page 

componentDidMount() { //after mounted
        request.get('http://localhost:3000/reviews') //get all reviews in server (READ)
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


    componentWillUpdate() {  //before update occurs

        request.get('http://localhost:3000/reviews')   //get all reviews (READ)
            .end(function(error, res){
                if (res) {
                    var newReviews = JSON.parse(res.text);    // updated list from server
                    var oldReviews=LocalReviewCache.getAll();   // current reviews list
                    LocalReviewCache.populate(newReviews);
                    newReviews=LocalReviewCache.getAll();

                    if(newReviews.length !== oldReviews.length ){    // if lists differ in size - change occured, set state to update view
                    this.setState({}) ; 
                }
                
                else{
                for(var i=0;i<newReviews.length;i++){    // for each review, check if votes are same for old and new list - if not then upvote occured so update view
                    if(newReviews[i].upvote !== oldReviews[i].upvote){
                      this.setState({});
                    }
                }
              }
            }else {
                    console.log(error );
                }
            }.bind(this)); 
      };


incrementUpvote = (reviewId,upvote) => {   //revire upvoted

             request.patch('http://localhost:3000/reviews/'+reviewId,{"upvote": upvote+1}) // update the upvote attribute of relevant review (UPDATE)
            .end(function(error, res){
                if (res) {
                  console.log(res);
                  this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
          };


state = {  sort: 'bookId' };  // state sort value default set to sort by bookId

      handleChange = ( value) => {   // handle sort value change
            this.setState( { sort: value } ) ;
    };

     deleteReview = (reviewId) => {     // delete review

             request.delete('http://localhost:3000/reviews/'+reviewId)  // delete a review from server file (DELETE)
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
                let list = LocalReviewCache.getAll();
                let filteredAllReviewList = _.sortBy(list, this.state.sort) ;    {/* Sort list of reviews */}
                if(this.state.sort==="upvote"){  {/* if sorting by upvotes, want high to low (default is low to high) so reverse */} 
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
                       <FilteredAllReviewList reviews={filteredAllReviewList} upvoteHandler={this.incrementUpvote} deleteHandler={this.deleteReview} />
                  </div> 
                  </div>                   
                </div>
              </div>
              </div>
         );
    }
}

export default AllReviews;
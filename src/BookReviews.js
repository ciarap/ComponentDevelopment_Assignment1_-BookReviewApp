import React from 'react';
import BookCache from './BookCache';
import request from 'superagent' ;
 import { Link } from 'react-router';
  import _ from 'lodash';
 


class Form extends React.Component {
        state = { opinion: '', username: ''};

        handleOpinionChange = (e) => {
            this.setState({opinion : e.target.value});
        };

        handleUsernameChange = (e) => {
            this.setState({username: e.target.value});
        };

        onSubmit = (e) => {
            e.preventDefault();
            let opinion = this.state.opinion.trim();
            let username = this.state.username.trim();
            if (!opinion ) {
                return;
            }
            this.props.reviewHandler(opinion,username );
            this.setState({opinion: '', username: ''});
        };

        render() {
            return (
                <form  style={{marginTop: '30px'}}>
                    <h3>Add a New Review</h3>

                    <div className="form-group">
                        <input type="text"  className="form-control"
                            placeholder="Review" value={this.state.opinion}
                            onChange={this.handleOpinionChange} ></input>
                    </div>     
                    <div className="form-group">
                        <input type="text"  className="form-control"
                            placeholder="Your name" value={this.state.username}
                            onChange={this.handleUsernameChange} ></input>
                    </div>
                    <button type="submit" className="btn btn-primary"
                        onClick={this.onSubmit}>Submit</button>
                </form>
            );
        }
    }
class ReviewListItem extends React.Component {

   handleVote = () => {
            this.props.upvoteHandler(this.props.review.id,this.props.review.upvote);
        };
    render() {
       let lineStyle = {
                fontSize: '20px', margin: '10px'  };
            return (
                <div>
                <li style={{border: '1px solid black'}}>
                <div className="row" style={lineStyle}>
                 <div className="col-md-11">
                <span style={lineStyle} >
                        {this.props.review.opinion}
                    </span>
                    </div>
                    <div className="col-md-1" style={{float:'right',textAlign:'right'}}>
                    <button type="delete" className="btn btn-danger"
                        >Delete</button>
                        </div>

                    </div>
                    <div className="row" style={{ marginLeft: '-0.5em',marginRight: '-0.5em',backgroundColor:' #DCDCDC'}}>
                   
                    <div className="col-md-4" style={{float:'left'}}>
                     Written by {this.props.review.username}
                     </div>
                      <div className="col-md-2" style={{float:'right',textAlign:'right'}}>
                    <span className="glyphicon glyphicon-thumbs-up"  style={{ cursor: 'pointer',fontSize:'20px' }} onClick={this.handleVote}> {this.props.review.upvote}</span> 
                    </div>
                    </div>
                    </li>
                </div>                
            );
    }
}


class ReviewList extends React.Component {
      render() {
        let items = this.props.reviews.map((review,index) => {
                return (
                    <ReviewListItem key={index} review={review}  upvoteHandler={this.props.upvoteHandler}  />
                );
            } );
          return (
                  <div>
                  <ul className="reviews">
                   {items}
                   </ul>
                  </div>
            ) ;
      }
    }


  class BookReviews extends React.Component {

       componentWillUpdate() {

        request.get('http://localhost:3000/books/'+this.props.params.id+'?_embed=reviews')
            .end(function(error, res){
                if (res) {
                    var newBook = JSON.parse(res.text);
                    var oldBook=BookCache.getBook();
                    BookCache.setBook(newBook);
                    newBook=BookCache.getBook();

                    if(newBook.reviews.length > oldBook.reviews.length ){
                    this.setState({}) ; 
                }
                else{
                for(var i=0;i<newBook.reviews.length;i++){
                    if(newBook.reviews[i].upvote !== oldBook.reviews[i].upvote){
                      this.setState({});
                    }
                }
              }
                } else {
                    console.log(error );
                }
            }.bind(this)); 

           
      };


      componentDidMount() {
        request.get('http://localhost:3000/books/'+this.props.params.id+'?_embed=reviews')
            .end(function(error, res){
                if (res) {
                    var book = JSON.parse(res.text);
                    BookCache.setBook(book);
                    this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 

           
      };


 incrementUpvote = (reviewId,upvote) => {
             request.patch('http://localhost:3000/reviews/'+reviewId,{"upvote": upvote+1})
            .end(function(error, res){
                if (res) {
                  console.log(res);
                  this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
          };


          addReview = (opinion,username) => {
            request.post('http://localhost:3000/reviews/',{"opinion":opinion, "bookId":this.props.params.id,"username":username, "upvote":0})
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
               
          let formDisplay=<p> No Form</p>;
          let reviewDisplay = <p>No book + {this.props.params.id}</p> ; 
          let book= BookCache.getBook();

          let reviews=false;
          if(book){
            reviews=  _.sortBy(book.reviews, function(review) {
                return - review.upvote;
                }
            ); 
          }


        if (reviews) {
              reviewDisplay =  (
                <div >
                 <div className="row header" >
                      <div className="col-md-1">
                       <Link className="link" to={'/AllBooks/'+this.props.params.id+'/'+this.props.params.authorId}> 
                       <img className="img-responsive back-arrow" src="/img/back_arrow.png" alt="arrow" />
                        <figcaption>  Go Back  </figcaption>
                        </Link> 
                        </div>
                         <div className="col-md-10">
                <h1 className="BlackPageTitle">Book Reviews</h1>
                </div>
                </div>
                <div className="view-container">
                <div className="view-frame">
                   <div className="container-fluid">
                   <div className="row">
                    <ReviewList reviews={reviews} upvoteHandler={this.incrementUpvote}/>
                     
                  </div> 
                  </div>                   
                </div>
              </div>
              </div>
              );}
if(book){
  formDisplay=(
  <div>
  <Form book={book}  reviewHandler={this.addReview} /> 
  </div>
  );}
           return (
            <div>
              {reviewDisplay}
              {formDisplay}
            </div>
         );
    }
    };



 
    export default BookReviews;
import React from 'react';
import BookCache from './BookCache';
import request from 'superagent' ;


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
    render() {
       let lineStyle = {
                fontSize: '20px', marginLeft: '10px'  };
            return (
                <div>
                    <span className="glyphicon glyphicon-thumbs-up"></span> by {this.props.review.username}
                    <span style={lineStyle} >
                        {this.props.review.opinion}
                    </span>
                </div>                
            );
    }
}


class ReviewList extends React.Component {
      render() {
        let items = this.props.reviews.map((review,index) => {
                return (
                    <ReviewListItem key={index} review={review}    />
                );
            } );
          return (
                  <div>
                   {items}
                  </div>
            ) ;
      }
    }


  class BookReviews extends React.Component {

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


          addReview = (opinion,username) => {
            request.post('http://localhost:3000/reviews/',{"opinion":opinion, "bookId":this.props.params.id,"username":username})
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
            reviews= book.reviews;
          }

        if (reviews) {
              reviewDisplay =  (
                <div >
                <h1 className="BlackPageTitle">Book Reviews</h1>
                <div className="view-container">
                <div className="view-frame">
                   <div className="container-fluid">
                   <div className="row">
                    <ReviewList reviews={book.reviews}/>
                     
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
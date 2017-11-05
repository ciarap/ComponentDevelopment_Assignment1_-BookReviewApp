import React from 'react';
import request from 'superagent' ;
 


class Form extends React.Component {
        state = { title: '', author: '',authorImageUrl:'',authorInfo:'',authorWikiUrl:'',imageUrl:'',category:'General',date:'',blurb:''};

        handleTitleChange = (e) => {
            this.setState({title : e.target.value});
        };

        handleAuthorChange = (e) => {
            this.setState({author: e.target.value});
        };
 handleAuthorImageUrlChange = (e) => {
            this.setState({authorImageUrl: e.target.value});
        };
         handleAuthorWikiUrlChange = (e) => {
            this.setState({authorWikiUrl: e.target.value});
        }; 
        handleAuthorInfoChange = (e) => {
            this.setState({authorInfo: e.target.value});
        };
           handleImageUrlChange = (e) => {
            this.setState({imageUrl : e.target.value});
        };

        handleCategoryChange = (e) => {
            this.setState({category: e.target.value});
        };

           handleDateChange = (e) => {
            this.setState({date : e.target.value});
        };

        handleBlurbChange = (e) => {
            this.setState({blurb: e.target.value});
        };

        onSubmit = (e) => {
            e.preventDefault();
            let title = this.state.title.trim();
            let author = this.state.author.trim();
            let authorImageUrl = this.state.authorImageUrl.trim();
            let authorWikiUrl = this.state.authorWikiUrl.trim();
            let authorInfo = this.state.authorInfo.trim();
             let imageUrl = this.state.imageUrl.trim();
            let category = this.state.category.trim();
             let date = this.state.date.trim();
            let blurb = this.state.blurb.trim();
            if (!title || !author || !authorImageUrl || !authorWikiUrl || !authorInfo || !imageUrl || !date || !blurb) {
                return;
            }
            this.props.addBookHandler(title,author,imageUrl,category,date,blurb );
            this.props.addAuthorHandler(author,authorImageUrl,authorInfo,authorWikiUrl);
            this.setState({ title: '', author: '',authorImageUrl:'',authorInfo:'',authorWikiUrl:'',imageUrl:'',category:'General',date:'',blurb:''});
        };

        render() {
            return (
              <div>
                <form  style={{marginTop: '30px'}}>
                    <div className="form-group">
                        <input type="text"  style={{width:'70%',margin:'auto'}}  className="form-control"
                            placeholder="Title" value={this.state.title}
                            onChange={this.handleTitleChange} ></input>
                    </div>     
                      <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder="Book Image Url" value={this.state.imageUrl}
                            onChange={this.handleImageUrlChange} ></input>
                    </div> 
                        
                    <div className="form-group">
                     <select className="form-control"   style={{width:'70%',margin:'auto'}}  value={this.state.category}
                    onChange={this.handleCategoryChange} >
                    <option value="General">General</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romance">Romance</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Allegorical">Allegorical</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Children">Children</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Crime">Crime</option>
                </select>
                    </div>
                      <div className="form-group">
                        <input type="text"   style={{width:'70%',margin:'auto'}} className="form-control"
                            placeholder="Date" value={this.state.date}
                            onChange={this.handleDateChange} ></input>
                    </div>     
                    <div className="form-group">
                        <textarea  style={{width:'70%',margin:'auto'}} rows="3" col="3" className="form-control"
                            placeholder="Blurb" value={this.state.blurb}
                            onChange={this.handleBlurbChange} ></textarea>
                    </div>
               
                     <div className="form-group">
                        <input type="text"   style={{width:'70%',margin:'auto'}} className="form-control"
                            placeholder="Author" value={this.state.author}
                            onChange={this.handleAuthorChange} ></input>
                    </div>
                      <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder=" Author Image Url" value={this.state.authorImageUrl}
                            onChange={this.handleAuthorImageUrlChange} ></input>
                    </div> 
                      <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder=" Author Wiki Url" value={this.state.authorWikiUrl}
                            onChange={this.handleAuthorWikiUrlChange} ></input>
                    </div>  
                     <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder=" Author Info" value={this.state.authorInfo}
                            onChange={this.handleAuthorInfoChange} ></input>
                    </div> 
                    <div style={{textAlign:'center'}}>
                    <button type="submit" style={{width: '120px', height: '60px'}} className="btn btn-primary"
                        onClick={this.onSubmit}>Submit</button>
                        </div>
                </form>
                </div>
            );
        }
    }

  class AddBookView extends React.Component {

          addBook = (title,author,imageUrl,category,date,blurb) => {

            let id=  title.replace(/\s+/g, '-');
            id=id.toLowerCase();
            let authorId= author.replace(/\s+/g, '-');
            authorId=authorId.toLowerCase();

            date= parseInt(date,10);

            request.post('http://localhost:3000/books/',{"votes":0,"id":id, "authorId":authorId,"title":title, "author":author,"imageUrl":imageUrl, "category":category,"date":date,"blurb":blurb})
            .end(function(error, res){
                if (res) {
                  console.log(res);
                  this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
};

           addAuthor= (author,authorImageUrl,authorInfo,authorWikiUrl) => {
            let authorId= author.replace(/\s+/g, '-');
            authorId=authorId.toLowerCase();


        request.get('http://localhost:3000/authors/'+authorId)
            .end(function(error, res){
                if (res) {
                  if(error){
                    if (error.status === 404){
                     request.post('http://localhost:3000/authors/',{"name":author, "id":authorId,"url":authorWikiUrl, "imageUrl":authorImageUrl,"info":authorInfo})
                      .end(function(error, res){
                      if (res) {
                         console.log(res);
                        this.setState({}) ; 
                      } else {
                    console.log(error );
                      }
                     }.bind(this)); 
                  }
                   }
                    this.setState({}) ; 
                } else {
                   
                    console.log(error );
                 
                }
            }.bind(this)); 

};


      render(){
               
           return (
               <div>
               <h1 className="BlackPageTitle">Add Book</h1>
              <Form addBookHandler={this.addBook} addAuthorHandler={this.addAuthor} /> 
              </div>
         );
    }
    };



 
    export default AddBookView;
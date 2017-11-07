// Author: Ciara Power 20072488

import React from 'react';
import request from 'superagent' ;
 


class Form extends React.Component {
        state = { title: '', author: '',authorImageUrl:'',authorInfo:'',authorWikiUrl:'',imageUrl1:'',imageUrl2:'',imageUrl3:'',imageUrl4:'',category:'General',date:'',blurb:''};

// following will handle changes in any of the text input boxes
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
           handleImageUrl1Change = (e) => {
            this.setState({imageUrl1 : e.target.value});
        };
         handleImageUrl2Change = (e) => {
            this.setState({imageUrl2 : e.target.value});
        };
         handleImageUrl3Change = (e) => {
            this.setState({imageUrl3 : e.target.value});
        };
         handleImageUrl4Change = (e) => {
            this.setState({imageUrl4 : e.target.value});
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

        onSubmit = (e) => {   // when submit button is pressed 
            e.preventDefault();

            // trim all text inputs of leading and trailing spaces
            let title = this.state.title.trim();
            let author = this.state.author.trim();
            let authorImageUrl = this.state.authorImageUrl.trim();
            let authorWikiUrl = this.state.authorWikiUrl.trim();
            let authorInfo = this.state.authorInfo.trim();
            let imageUrl1 = this.state.imageUrl1.trim();
            let imageUrl2 = this.state.imageUrl2.trim();
            let imageUrl3 = this.state.imageUrl3.trim();
            let imageUrl4 = this.state.imageUrl4.trim();
            let category = this.state.category.trim();
            let date = this.state.date.trim();
            let blurb = this.state.blurb.trim();

            if (!title || !author || !authorImageUrl || !authorWikiUrl || !authorInfo || !imageUrl1 || !date || !blurb) {  // required inputs before submission occurs
                return;
            }
            this.props.addBookHandler(title,author,imageUrl1,imageUrl2,imageUrl3,imageUrl4,category,date,blurb );  // send book values to add book
            this.props.addAuthorHandler(author,authorImageUrl,authorInfo,authorWikiUrl);  // send author values to add author 
            this.setState({ title: '', author: '',authorImageUrl:'',authorInfo:'',authorWikiUrl:'',imageUrl1:'',imageUrl2:'',imageUrl3:'',imageUrl4:'',category:'General',date:'',blurb:''});
        };

        render() {
            return (
              <div>
              
                <form  style={{marginTop: '30px'}}>
                <div className="formSection">  {/* book info section of form */}
              <h2> Book Info </h2>
                    <div className="form-group">
                        <input type="text"  style={{width:'70%',margin:'auto'}}  className="form-control"
                            placeholder="Title" value={this.state.title}
                            onChange={this.handleTitleChange} ></input>
                    </div> 
                    <div className="littleFormSection">   {/* section for image urls  */} 
                    <h3> Book Images </h3>   
                      <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder="Book Image Url 1" value={this.state.imageUrl1}
                            onChange={this.handleImageUrl1Change} ></input>
                    </div> 
                    <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder="Book Image Url 2" value={this.state.imageUrl2}
                            onChange={this.handleImageUrl2Change} ></input>
                    </div> 
                    <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder="Book Image Url 3" value={this.state.imageUrl3}
                            onChange={this.handleImageUrl3Change} ></input>
                    </div> 
                    <div className="form-group">
                        <input type="text"    style={{width:'70%',margin:'auto'}}className="form-control"
                            placeholder="Book Image Url 4" value={this.state.imageUrl4}
                            onChange={this.handleImageUrl4Change} ></input>
                    </div> 
                        </div>
                    <div className="form-group">   
                     <select className="form-control"   style={{width:'70%',margin:'auto'}}  value={this.state.category}
                    onChange={this.handleCategoryChange} >
                    <option value="General">General</option>     {/* dropdown menu for categories */}
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
                        <textarea  style={{width:'70%',margin:'auto'}} rows="3" className="form-control"
                            placeholder="Blurb" value={this.state.blurb}
                            onChange={this.handleBlurbChange} ></textarea>
                    </div>
               </div>
               <div className="formSection">   {/* author info input section */} 
                <h2> Author Info </h2>
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
                    </div>
                    <div style={{textAlign:'center'}}>
                    <button type="submit" style={{width: '120px', height: '60px'}} className="btn btn-primary" 
                        onClick={this.onSubmit}>Submit</button>   {/* submit button*/}
                        </div>
                </form>
                </div>
            );
        }
    }

  class NewBookView extends React.Component {

          addBook = (title,author,imageUrl1,imageUrl2,imageUrl3,imageUrl4,category,date,blurb) => {   // add new book
            let id=  title.replace(/\s+/g, '-');   // replace spaces in title name with - for id value
            id=id.toLowerCase();  // set to lower case id
            let authorId= author.replace(/\s+/g, '-');   // similar to title/id above
            authorId=authorId.toLowerCase();

            date= parseInt(date,10); // convert date string value to number

            let images=[];  //empty images array 
            if(imageUrl1){      // test if each url is not empty, then push it into the array
              images.push(imageUrl1);
            }
            if(imageUrl2){
              images.push(imageUrl2);
            }
            if(imageUrl3){
              images.push(imageUrl3);
            }
            if(imageUrl4){
              images.push(imageUrl4);
            }

            request.post('http://localhost:3000/books/',{"votes":0,"id":id, "authorId":authorId,"title":title, "author":author,"images":images, "category":category,"date":date,"blurb":blurb})  // add new book to server with all attributes (CREATE)
            .end(function(error, res){
                if (res) {
                  console.log(res);
                  this.setState({}) ; 
                } else {
                    console.log(error );
                }
            }.bind(this)); 
        };

           addAuthor= (author,authorImageUrl,authorInfo,authorWikiUrl) => {  // add author 
            let authorId= author.replace(/\s+/g, '-');  //replace author name spaces with -
            authorId=authorId.toLowerCase();   // author id to lower case


        request.get('http://localhost:3000/authors/'+authorId)  // get author object from server (READ)
            .end(function(error, res){
                if (res) {
                  if(error){
                    if (error.status === 404){  // if the author doesnt exist then create the author 
                     request.post('http://localhost:3000/authors/',{"name":author, "id":authorId,"url":authorWikiUrl, "imageUrl":authorImageUrl,"info":authorInfo})  //add author to server (CREATE)
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
 
    export default NewBookView;
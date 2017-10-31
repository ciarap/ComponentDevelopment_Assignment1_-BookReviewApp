 import React from 'react';
    import localCache from './localCache';
    import BookCache from './BookCache';
    import request from 'superagent' ; 

   

    class BookDetail extends React.Component {

      state = { };

       componentDidMount() {
            request.get(
             '/bookDetails/' + this.props.params.id + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                BookCache.setBook(json);
                this.setState({});
           }) ;
      } 
      render(){
          let display = <p>No book details + {this.props.params.id}</p> ; 
          let book= BookCache.getBook();
          if (book) {
              display =  (
                      <div>
                           <h1 className="BlackPageTitle">{book.title}</h1>      
                    </div>
                    ) ;
          }
          return (
            <div>
              {display}
            </div>
            );
      }
    };



 
    export default BookDetail;
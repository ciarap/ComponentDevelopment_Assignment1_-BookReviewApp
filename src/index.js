import React from 'react';
    import ReactDOM from 'react-dom';
    import '../node_modules/bootstrap/dist/css/bootstrap.css';
    import '../src/style.css';
    import { Router, Route, IndexRoute, browserHistory } from 'react-router';
    import {Navbar, Nav, NavItem} from 'react-bootstrap';
    import Homepage from './App';
    import AllBooks from './AllBooks';
    import BookDetail from './BookDetail';
    import BookReviews from './BookReviews';
    import AllReviews from './AllReviews';
    import AddBook from './AddBook';
    import PopularBooks from './PopularBooks';




var NavigationBar = React.createClass({

  render() {
    return (
      <Navbar className="navbar-fixed-top" >
      <div className= "navbar-brand"> <a data-toggle="tooltip" title="Homepage" href="/"><img src="/bookIcon.png" alt="Book Icon"/> BookShelf </a></div>
      <Nav  className="navbar-right ">
    <NavItem  className="navItem " href="/AllBooks">All Books</NavItem>
     <NavItem className="navItem" href="/AllReviews">All Reviews</NavItem>
    <NavItem className="navItem" href="/PopularBooks">Popular Books</NavItem>
     <NavItem className="navItem" href="/AddBook">Add Book</NavItem>
   
      </Nav >
      </Navbar>
    )
  }
});

var App = React.createClass({
  render() {
    return (
      <div >
      <NavigationBar/>
      <div className="bodyText">
      {this.props.children}
      </div>
      </div>
    )
  }
});


 ReactDOM.render( 
              <Router history={browserHistory} >
                <Route path="/" component={App}>
                <IndexRoute component={Homepage}/>
                <Route path ="/AllBooks" component={AllBooks}/>
                 <Route path="AllBooks/:id/:authorId/BookReviews" component={BookReviews} />
                <Route path="AllBooks/:id/:authorId" component={BookDetail} />
                <Route path="/AllReviews" component={AllReviews}/>
                 <Route path="/AddBook" component={AddBook}/>
                 <Route path="/PopularBooks" component={PopularBooks}/>
               
                </Route>
              </Router>
            ,
      document.getElementById('root')
    );
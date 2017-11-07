// Author: Ciara Power 20072488

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
    import NewBook from './NewBook';
    import PopularBooks from './PopularBooks';




var NavigationBar = React.createClass({  // navigation bar for top of screen 

  render() {
    return (
      <Navbar className="navbar-fixed-top" >    {/* nav bar stays fixed at top even when page is scrolled  */}
      <div className= "navbar-brand"> <a data-toggle="tooltip" title="Homepage" href="/"><img src="/bookIcon.png" alt="Book Icon"/> BookShelf </a></div> {/*logo on left*/}
      <Nav  className="navbar-right ">
    <NavItem  className="navItem " href="/AllBooks">All Books</NavItem>
     <NavItem className="navItem" href="/AllReviews">All Reviews</NavItem>
    <NavItem className="navItem" href="/PopularBooks">Popular Books</NavItem>
     <NavItem className="navItem" href="/NewBook">Add Book</NavItem>
   
      </Nav >
      </Navbar>
    )
  }
});

var App = React.createClass({
  render() {
    return (
      <div >
      <NavigationBar/>   // to be present regardless of what the body includes (for all pages )
      <div className="bodyText">
      {this.props.children}
      </div>
      </div>
    )
  }
});


 ReactDOM.render( 
              <Router history={browserHistory} >
                <Route path="/" component={App}>   // default page route 
                <IndexRoute component={Homepage}/>
                <Route path ="/AllBooks" component={AllBooks}/>
                 <Route path="AllBooks/:id/:authorId/BookReviews" component={BookReviews} />
                <Route path="AllBooks/:id/:authorId" component={BookDetail} />
                <Route path="/AllReviews" component={AllReviews}/>
                 <Route path="/NewBook" component={NewBook}/>
                 <Route path="/PopularBooks" component={PopularBooks}/>
               
                </Route>
              </Router>
            ,
      document.getElementById('root')
    );
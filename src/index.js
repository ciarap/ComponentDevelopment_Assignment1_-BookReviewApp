import React from 'react';
    import ReactDOM from 'react-dom';
    import '../node_modules/bootstrap/dist/css/bootstrap.css';
    import '../src/style.css';
    import { Router, Route, IndexRoute, browserHistory } from 'react-router';
    import {Navbar, Nav, NavItem, Brand} from 'react-bootstrap';
    import Homepage from './App';
    import AllBooks from './AllBooks';
    import BookDetail from './BookDetail';




var NavigationBar = React.createClass({

  render() {
    return (
      <Navbar className="navbar-fixed-top" >
      <div className= "navbar-brand"> <a data-toggle="tooltip" title="Homepage" href="/"><img src="/bookIcon.png"/> BookShelf </a></div>
      <Nav  className="navbar-right ">
    <NavItem  className="navItem " href="/AllBooks">All Books</NavItem>
     <NavItem className="navItem" href="#">All Reviews</NavItem>
    <NavItem className="navItem" href="#">Popular Books</NavItem>
     <NavItem className="navItem" href="#">Add Book</NavItem>
   
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
                <Route path="books/:id" component={BookDetail} />
                </Route>
              </Router>
            ,
      document.getElementById('root')
    );
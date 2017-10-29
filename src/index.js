import React from 'react';
    import ReactDOM from 'react-dom';
    import '../node_modules/bootstrap/dist/css/bootstrap.css';
    import '../src/style.css';
    import { Router, Route, IndexRoute, browserHistory } from 'react-router';
    import {Navbar, Nav, NavItem, Brand} from 'react-bootstrap';
    import Books from './App';



var NavigationBar = React.createClass({
  render() {
    return (
      <Navbar className="navbar-fixed-top" >
      <div className= "navbar-brand"> <a href="#"><img src="/bookIcon.png"/> BookShelf </a></div>
      <Nav  className="navbar-right ">
        
    <NavItem className="navItem " href="#">Page 1</NavItem>
    <NavItem className="navItem" href="#">Page 2</NavItem>
   
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
                   <IndexRoute component={Books}/>
                </Route>
              </Router>
            ,
      document.getElementById('root')
    );
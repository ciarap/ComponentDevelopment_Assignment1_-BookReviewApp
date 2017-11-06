import React from 'react';




class Homepage extends React.Component{


    render() {
        return (
            <div >
            <img className=" center-block img-rounded img-responsive" src=".././img/header_AllBooks.jpg" alt="Books Homepage"/>
             <h1 className="BlackPageTitle">Homepage</h1>
             <div className="homeMessage">
             <p> <span style={{fontSize:'20px',fontWeight:'bold'}}> Welcome to BookShelf - the most useful book review website to be found ! </span><br/><br/> 
             Use the navigation bar above to navigate through sections.<br/>
             Remember - clicking the BookShelf logo on the left will take you back to this page!
              </p>
             </div>

            </div>
        );
    }

}

export default Homepage;
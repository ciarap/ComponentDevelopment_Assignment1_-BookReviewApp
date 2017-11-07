# Assignment 1 - ReactJS app.

Name: Ciara Power

## Overview.

This is an app created with the use of React Framework and Node.js (npm). Javascript, HTML and CSS languages are used throughout.

The app itself forms a Book Review application, with the concept of having different data objects (books, authors, reviews) served on a JSON server, and for the user to be able to add reviews and books, and even read about books on the app. 

The JSON server hosts a json file, which contains three json arrays, books/authors/reviews. The web app gets all data from the localhost server running on the local machine. HTTP requests are, as a result, used throughout the project to perform CRUD actions.

The structure of the data in this app is quite simple, a Book object will have an Author ID attribute within, which corresponds to an Author object in the authors data array. Review objects all contain a Book ID - indicating which book the review is for. 

 ### User features: 
 
 + View all books
 + View certain book's details (including details about the author) 
 + View certain book's reviews
 + View all reviwes
 + View 5 most popular books ( most votes for book )
 + Leave review for a book
 + Add book and its corresponding author to database 
 + Sort all books list by Alphabetical, Newest, Author, Category, Highest Rated
 + Sort all reviews list by Book, Username, Highest Rated
 + Search through all books list 
 + Vote for books
 + Upvote reviews
 + Delete book
 + Delete review
 

## Installation requirements.

### Software Used

The following list of software was used to develop the app: 

+ ReactJS v15.3.0
+ Bootstrap 3
+ create-react-app tool
+ Node.js 
+ React-Router
+ Babel Loader
+ React-DOM
+ JSON server
+ Lodash
+ Superagent
 

### Cloning and Running Project : Steps

Clone the project and direct cmd into the base folder. 

Install npm, json server, create react app, bootstrap, lodash, react router, superagent  :

```

$ npm install
$ npm install -g create-react-app
$ npm install  bootstrap@3.3.6  --save
$ npm install -g json-server
$ npm install  lodash@2.4.2 --save
$ npm install react-router@2.6.1  --save
$ npm install  superagent@1.6.1 --save

```

Run the server from the project base folder in a cmd window :
```
$ json-server ./data.json
```

In another cmd window, run the app:
```
$ npm start
```

The server should be running on localhost 3000, and the SPA on localhost 3001. 
Both can be accessed through an internet browser , e.g Google Chrome.


## Data Model Design.

This json server includes three entities : Books, Authors and Reviews.

Books

![][image1]

Authors

![][image2]

Reviews

![][image3]


## App Component Design.

 . . . A diagram showing the app's hierarchical component design (see example below) . . . .  



## UI Design.

### HomePage

![][image4]

### All Books
View:

![][image5]

Sorting bar:

![][image6]

### All Reviews

View 1:

![][image7]

View 2:

![][image8]

Sorting bar:

![][image9]

### Book Details

View 1:

![][image10]

View 2:

![][image11]

View 3: 

![][image12]

### Book Reviews

View 1:

![][image13]

View 2:

![][image14]

### New Book

View 1:

![][image15]

View 2: 

![][image16]

Category Dropdown menu :

![][image17]

### Popular Books

View 1:

![][image18]




## Routing.
. . . . List each route supported by the app and state the associated view . . . . . (see examples below)

+ /foos - displays all published foos
+ /foos/:id - detail view of a particular foo (:id)
+ etc
+ etc

## Extra features
. . . . . Briefly explain any non-standard features, functional or non-functional, developed for the app . . . . . .  

## Independent learning.
. . . . . State the non-standard aspects of React (or other related technologies) that you researched and applied in this assignment . . . . .  


[image1]: ./views_screenshots/books.PNG
[image2]: ./views_screenshots/authors.png
[image3]: ./views_screenshots/reviews.png

[image4]: ./views_screenshots/HomePage.PNG
[image5]: ./views_screenshots/AllBooks1.PNG
[image6]: ./views_screenshots/AllBooks2.PNG
[image7]: ./views_screenshots/AllReviews1.PNG
[image8]: ./views_screenshots/AllReviews2.PNG
[image9]: ./views_screenshots/AllReviews3.PNG
[image10]: ./views_screenshots/BookDetails1.PNG
[image11]: ./views_screenshots/BookDetails2.PNG
[image12]: ./views_screenshots/BookDetails3.PNG
[image13]: ./views_screenshots/BookReviews1.PNG
[image14]: ./views_screenshots/BookReviews2.PNG
[image15]: ./views_screenshots/NewBook1.PNG
[image16]: ./views_screenshots/NewBook2.PNG
[image17]: ./views_screenshots/NewBook3.PNG
[image18]: ./views_screenshots/PopularBooks.PNG


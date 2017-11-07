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

### Navigation Bar 

When All Books option is hovered over: 

![][image19]

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

+ / - displays the Homepage
+ /AllBooks - displays all books in database
+ /AllBooks/:id/:authorId - detail view of a particular book (:id) and its author (:authorId)
+ /AllBooks/:id/:authorid/BookReviews - displays all reviews for a particular book (:id) 
+ /AllReviews - displays all reviews in database
+ /NewBook - displays the Add Book page 
+ /PopularBooks - displays the top 5 most rated books 

## Extra features

+ Used google fonts.
+ Used NavBar Nav and NavItem from the react-router package to develop a navigation bar.
+ Modified bootstrap style presets by creating a style.css file.
+ Query used in HTTP GET requests which linked up review objects to certain book object.

## Independent learning.

In order to create the navigation bar, I had to research using NavBar from react-bootstrap. There are many ways to use this feature, bt I found using the Nav and NavItem elements within it worked best.

As I chose to use a JSON server, and had only used an example of a GET request before, I researched the other types of requests (DELETE, PATCH, POST) and their uses for a json server. 

When creating the json file to act as the database, I was originally planning on having the reviews as a nested collection within the book objects. However, after researching the use of nested collections and modifying data by update, I found that to implement the Upvote feature on a review, which updates an attribute of the review object in question, I had to remove the reviews as nested collections and create them in a array of their own. This is due to the fact that only one level of children elements can be accessed and modified, so modifying a child's child ( review's upvote attribute) was not possible. 

To link up reviews to book objects, I researched querying with HTTP requests. I found that using the embed query worked to link them, as long as i had a bookId attribute in the review object, which corresponds to a book object id. 


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
[image18]: ./views_screenshots/PopularBooks1.PNG
[image19]: ./views_screenshots/NavBar_Hover.PNG


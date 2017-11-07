# Assignment 1 - ReactJS app.

Name: Ciara Power

## Overview.

This is an app created with the use of React Framework and Node.js (npm). Javascript, HTML and CSS languages are used throughout.

The app itself forms a Book Review application, with the concept of having different data objects (books, authors, reviews) served on a JSON server, and for the user to be able to add reviews and books, and even read about books on the app. 

The JSON server hosts a json file, which contains three json arrays, books/authors/reviews. The web app gets all data from the localhost server running on the local machine. HTTP requests are, as a result, used throughout the project to perform CRUD actions.

The structure of the data in this app is quite simple, a Book object will have an Author ID attribute within, which corresponds to an Author object in the authors data array. Review objects all contain a Book ID - indicating which book the review is for. 

 . . . . . List of user features . . . . 
 
 + Feature 1
 + Feature 2
 + Feature 3
 + etc
 + etc

## Installation requirements.
. . . .  List of software used to develop the app . . . . . . . 

+ ReactJS v15.3.0
+ Bootstrap 3
+ create-react-app tool
+ etc
+ etc 

. . . . . . Also, explain (to a third party) what steps one must take to run your app after cloning it from the repository, e.g. any non-standard software installation; any environment setup; how to start the app; where to view app in browser . . . . . . . At its simplest this may just be: npm install + npm start

## Data Model Design.

. . . . . Diagram of app's data model (see example below) AND/OR a sample of the test data used (JSON or equivalent). Always use meaningful sample data . . . . 

![][image1]

## App Component Design.

 . . . A diagram showing the app's hierarchical component design (see example below) . . . .  

![][image2]

## UI Design.
. . . . . Screenshots of app's views (see example below) with appropriate captions . . . . . . . 

![][image3]

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


[image1]: ./model.png
[image2]: ./design.jpg
[image3]: ./screen.png

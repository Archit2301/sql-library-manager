_______________________________________________________________________________

SQL Library Manager App

A CRUD application using SQL database 

_______________________________________________________________________________

--Description

This is an application for local library to manage collection of books. The web app enables the user
to list, create, update and delete an entry from the books database. The app uses SQL ORM to 
interact with SQLite database.

--Skills and Techniques
HTML, CSS, JavaScript, npm, Node.js, Express, Pug, SQLite and SQL ORM Sequelize.

--Process

Sequelize, sqlite3 and pug dependecies are installed.

config/config.js file contains JSON to point to library.db database.

Book Model created with title, author, genre and year as attributes.

Validation added to title and author fields.


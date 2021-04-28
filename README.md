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

--Steps to use this app

Step 1: Download the project zip file from the github repo.

Step 2: Unzip and extract the file contents.

Step 3: Open the project folder in an editor.

Step 4: Run the terminal and enter the command npm install.

Step 5: After installing all the project dependencies, run the command npm start. 

Step 6: Open any web browser and type localhost:3000 in the url. 

The app will run successfully.
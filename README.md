# Candidate Average
A project is to creat tow table candidate or test_score in the database and find there candidate score average.

# Requirements and Installation
In this project i installed some dependencies.
There are some basic installation commands are:
# Knex
- Knex is a SQL query builder, mainly used for Node.js applications with built in model schema creation, table migrations, connection pooling and seeding.
    ```
    npm install knex --save
  ```
# Express
- Express provides a minimal interface to build our applications. It provides us the tools that are required to build our app.
    ```
    npm install express --save
  ```
# MySQL
- MySQL is the most popular open-source relational database management system. It is fast, easy to use.
    ```
    sudo apt install mysql-server -y
    sudo mysql -u root -p
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sandhya@563';
    INFO- password should be strong. Exa:- Sandhya@563
    ```
# Nodemon
- nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
  ```
    npm install nodemon --save
  ```
# What it does:-
### Candidate information-
- In the dababase candidate table will be creat in that whole candidate information wiil be there
### Test-score information-
-  In the dababase test-score table will be creat in that whole test-score information wiil be there.
- From the test-score table it will give you,score of table and average of score,heighest score.
# I have used:-
- DataBase
- Knex
- Express
- Middleware
- Arrow function
- Promise
- Router
- Export
- Port
- CRUD operation
# How to run:-
 - **server.js** - This is my main connection file. So for running and checking the follow of this project you can run this file without any hasitation.
 - **database.js** - This is my database file. it will create table in the database and store user information.
 - **router.js** - This is my router's file. in that i have created many route's so these route will define url path,also i used CRUD operation to get data,post data,put data,delete data through the **postman**


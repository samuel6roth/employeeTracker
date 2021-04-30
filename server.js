//Install dependencies packages
const consoleTable = require('console.table')
const mysql = require('mysql')
const inquirer = require('inquirer')
//const Sequelize = require('sequelize')
//require('dotenv').config();

//Connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mulesrock',
    database: 'employees_db'
});

// TRY THIS FOR ENV CONNECTION TO HIDE CREDENTIALS
// const Sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );





//Inquirer prompts with functions in then section
//Create mysql table
//Write to mysql table
//Erase from mysql table

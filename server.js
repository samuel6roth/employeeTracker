//Install dependencies packages
//const consoleTable = require('console.table')
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

connection.connect(function(err){
    if (err) throw err;
    start();
});


//Inquirer prompts with functions in then section
function start() {
    inquirer.prompt({
        name: 'main',
        type: 'list',
        message: 'This is our employee database. Please select an option from the list.',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            'Update an employee role',
            'Delete an employee',
            'Exit'
        ]
    }).then(function (answer) {
        switch (answer.main) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Exit':
                exitApplication();
                break;
            default:
                break;
        };
    });
};










//Create mysql table
//Write to mysql table
//Erase from mysql table

//Install dependencies packages
const consoleTable = require('console.table')
const mysql = require('mysql')
const inquirer = require('inquirer');
//module.exports = sequelize;
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

function viewEmployees() {
    let query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        start();
    });
};

function viewDepartments() {
    let query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        start();
    });
};

function viewRoles() {
    let query = 'SELECT * FROM role';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        start();
    });
};

function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input', 
                    message: "What is the employee's fist name? ",
                },
                {
                    name: 'last_name',
                    type: 'input', 
                    message: "What is the employee's last name? "
                },
                {
                    name: 'manager_id',
                    type: 'input', 
                    message: "What is the employee's manager's ID? "
                },
                {
                    name: 'role', 
                    type: 'list',
                    choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                    },
                    message: "What is this employee's role?"
                }
                ]).then(function (answer) {
                    let role_id;
                    for (let a = 0; a < res.length; a++) {
                        if (res[a].title == answer.role) {
                            role_id = res[a].id;
                            console.log(role_id)
                        }                  
                    }  
                    connection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Employee added!');
                        start();
                    })
                });
        });
};


function addDepartment() {
    inquirer.prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                connection.query(query, function(err, res) {
                if(err) throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                start();
                })
            });
};


function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err) throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    start();
                })
        });
    });
};


function exitApplication() {
    connection.end();
};
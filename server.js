const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'PanchoPuma12!',
    database: 'employeesDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`
    ________________________________________________________

    ╔═══╗     ╔╗                ╔═╗╔═╗
    ║╔══╝     ║║                ║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗  ║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣  ║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣  ║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝  ╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
           ║║      ╔═╝║                       ╔═╝║
           ╚╝      ╚══╝                       ╚══╝

    ________________________________________________________`)

    initialQuestions();
});

function initialQuestions() {

    inquirer
        .prompt({
            type: "list",
            name: "Initial Options",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "Update a Role",
                "End"]
        })
        .then(function ({ task }) {
            switch (task) {
                case "View All Departments":
                    viewAllDepartments();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "View All Employees":
                    viewAllEmployees();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add a Role":
                    addRole();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;

                case "Update a Role":
                    updateRole();
                    break;

                case "End":
                    connection.end();
                    break;
            }
        });
}

// functions 

//viewAllDepartments();
function viewAllDepartments() {
    let query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
        FROM employee
        LEFT JOIN role ON (role.id = employee.role_id)
        LEFT JOIN department ON (department.id = role.department_id)`;
    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Result generated");

        initialQuestions();
    });
}

//viewAllRoles();

function viewAllRoles() {
    const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)`;


    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Result generated");

        initialQuestions();
    });

}

//viewAllEmployees();
function viewAllEmployees() {
    console.log("Viewing All Employees");

    let query =
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
    LEFT JOIN role ON (employee.role_id = role.id)
    LEFT JOIN department ON (department.id = role.department_id)
    LEFT JOIN employee manager ON (manager.id = employee.manager_id);`

    connection.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Result generated");

        initialQuestions();
    });

}

addDepartment();

addRole();

addEmployee();

updateRole();

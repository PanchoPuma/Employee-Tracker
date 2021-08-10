const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

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

    firstPrompt();
});

function firstPrompt() {

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
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

    ╔═══╗       ╔╗                 ╔═╗╔═╗
    ║╔══╝       ║║                 ║ ╚╝ ║
    ║╚══╦═╗╔═╦══╣║ ╔══╦╗ ╔╦══╦══╗  ║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣ ╚╝ ║╔╗║║ ║╔╗║║ ║║║═╣║═╣  ║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣ ║║ ║╚╝║╚═╣╚╝║╚═╝║║═╣║═╣  ║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩═╩╩═╣╔═╩══╩══╩═╗╔╩══╩══╝  ╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
             ║║       ╔═╝║                       ╔═╝║
             ╚╝       ╚══╝                       ╚══╝

    ________________________________________________________`)

    initialQuestions();
});

function initialQuestions() {

    inquirer.prompt({
        type: "list",
        name: "Options",
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
        .then(function ({ Options }) {
            switch (Options) {
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
                    console.log ("BYE BYE! :)")
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

//addDepartment();
function addDepartment() {
    inquirer.prompt({
        name: "department_name",
        type: "input",
        message: "What is the department name?",
    })
        .then((answer) => {
            console.log("Adding a new department");
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    department_name: answer.department_name,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log("Result generated");
                    console.table(res);
                    initialQuestions();
                }
            );
        });
}


//addRole();
function addRole() {
    connection.query('SELECT * FROM department', function (err, res) {
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
                message: 'What is the salary of this role?'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function () {
                    let deptArray = [];
                    for (let i = 0; i < res.length; i++) {
                        deptArray.push(res[i].name);
                    }
                    return deptArray;
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
                    if (err) throw err;
                    console.log('Result Generated');
                    console.table(res);
                    initialQuestions();
                })
        })
    })
};


//addEmployee();
function addEmployee() {
    inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
            },
            {
                type: "input",
                name: "roleId",
                message: "What is this employee's role ID?",
            },
            {
                type: "input",
                name: "managerId",
                message: "What is this employee's manager ID?",
            },
        ])
        .then((answer) => {
            console.log("Adding a new employee");
            connection.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleId,
                    manager_id: answer.managerId,
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Result Generated');
                    console.table(res);
                    initialQuestions();
                }
            );
        });
}

//updateRole();
function updateRole() {
    let employeeID = '';

    inquirer.prompt({
            name: "employeeID",
            type: "input",
            message: "Enter the EEID of the person you want to update",
        })
        .then((answer) => {
            employeeID = answer.employeeID;

            inquirer.prompt({
                    type: "input",
                    name: "roleID",
                    message: "Enter the role ID you want the person to have",
                })
                .then((answer) => {
                    connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                role_id: answer.roleID,
                            },
                            {
                                id: employeeID,
                            },
                        ],
                        function (err, res) {
                            if (err) throw err;
                    console.log('Result Generated');
                    console.table(res);
                    initialQuestions();
                        }
                    );
                });
        });
}

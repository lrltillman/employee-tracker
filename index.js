const inquirer = require("inquirer");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const { default: ListPrompt } = require('inquirer/lib/prompts/list');
const { error } = require("console");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the classlist_db database.`)
);

// main menu

const landingQuestion = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        name: "landing"
    }
]

// master app containing the db query functions

function mainMenu() {
    inquirer.prompt(landingQuestion).then(data => {
        let userChoice = data.landing;
        if (userChoice === "View all departments") {
            viewDepts();
            setTimeout(() => {
                stayOrGo();
            }, 1000);

        } if (userChoice === "View all roles") {
            viewRoles();
            setTimeout(() => {
                stayOrGo();
            }, 1000);

        } if (userChoice === "View all employees") {
            viewEmps();
            setTimeout(() => {
                stayOrGo();
            }, 1000);

        } if (userChoice === "Add a department") {
            initNewDept();

        } if (userChoice === "Add a role") {
            initNewRole();

        } if (userChoice === "Add an employee") {
            initAddEmp();

        } if (userChoice === "Update an employee role") {
            initUpdateRole();
        }
    })
}

// call master function to run app

mainMenu();

//function for returning to main menu or exiting app

function stayOrGo() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "confirm",
        choices: ["Return to main menu", "Exit app"]
    }).then(data => {
        let confirm = data.confirm;
        if (confirm === "Return to main menu") {
            mainMenu();
        } else if (confirm === "Exit app") {
            console.log("🅶 🅾 🅾 🅳 🅱 🆈 🅴​")
            process.exit();
        } else {
            console.log("🅶 🅾 🅾 🅳 🅱 🆈 🅴​")
            process.exit();
        }
    })
}

//function for View all departments
function viewDepts() {
    db.query('SELECT * FROM department', function (err, depts) {
        console.table(depts);
    });
};

//function for View all Roles
function viewRoles() {
    db.query('SELECT * FROM role', function (err, roles) {
        console.table(roles);
    });
}

//function for View all employees
function viewEmps() {
    db.query('SELECT * FROM employee', function (err, emps) {
        console.table(emps);
    });
};

//function for Add a department

const newDept = [
    {
        type: "input",
        message: "What is the name of the new department?",
        name: "newDeptName"
    }];

function initNewDept() {
    inquirer.prompt(newDept).then(data => {
        db.query(`INSERT INTO department(name)
        VALUES("${data.newDeptName}")`, function (err) {
            console.log(`New department "${data.newDeptName}" has been created!`);
        });
        setTimeout(() => {
            stayOrGo();
        }, 1000);
    })
}

//function for Add a role

const newRole = [{
    type: "input",
    message: "What is the name of the new role?",
    name: "title"
},
{
    type: "input",
    message: "What is the salary for this new role? (Please do not use commas or spaces)",
    name: "monies"
},
{
    type: "list",
    message: "Which department will this role work in?",
    name: "dept",
    choices: async () => {
        const result = await db.promise().query('SELECT * FROM department')
        const data = result[0]
        return data.map((row) => ({ name: `${row.name}`, value: row.id }))
    }
}]

function initNewRole() {
    inquirer.prompt(newRole).then(data => {
        db.query(`INSERT INTO role(title, salary, department_id)
        VALUES("${data.title}", ${data.monies}, ${data.dept})`, function (err) {
            console.log(`New role "${data.title}" has been created!`);
        });
        setTimeout(() => {
            stayOrGo();
        }, 1000);
    })
}

//function for Add an employee

const addEmp = [
    {
        type: "input",
        message: "What is the new employee's FIRST name?",
        name: "first"
    },
    {
        type: "input",
        message: "What is the new employee's LAST name?",
        name: "last"
    },
    {
        type: "list",
        message: "What is the new employee's ROLE at the company?",
        name: "role",
        choices: async () => {
            const result = await db.promise().query('SELECT * FROM role')
            const data = result[0]
            return data.map((row) => ({ name: `${row.title}`, value: row.id }))
        }
    },
    {
        type: "list",
        message: "Who is the new employee's manager?",
        name: "manager",
        choices: async () => {
            const result = await db.promise().query('SELECT * FROM employee')
            const data = result[0]
            return data.map((row) => ({ name: `${row.first_name} ${row.last_name}`, value: row.id }))
        }
    },]

function initAddEmp() {
    inquirer.prompt(addEmp).then(data => {
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${data.first}", "${data.last}", ${data.role}, ${data.manager})`, function (err) {
            console.log(`New employee "${data.first} ${data.last}" has been created!`);
        });
        setTimeout(() => {
            stayOrGo();
        }, 1000);
    })
}

// function for Update an employee role

const updateRole = [
    {
        type: "list",
        message: "Please select an employee to update their role:",
        name: "employee",
        choices: async () => {
            const result = await db.promise().query('SELECT * FROM employee')
            const data = result[0]
            return data.map((row) => ({ name: `${row.first_name} ${row.last_name}`, value: row.id }))
        }
    },
    {
        type: "list",
        message: "What is this employee's new role?",
        name: "newRole",
        choices: async () => {
            const result = await db.promise().query('SELECT * FROM role')
            const data = result[0]
            return data.map((row) => ({ name: `${row.title}`, value: row.id }))
        }
    }
]

function initUpdateRole() {
    inquirer.prompt(updateRole).then(async (data) => {
        const result = await db.promise().query(`UPDATE employee SET role_id = ${data.newRole} WHERE id = ${data.employee}`);
        console.log(`Employee record has been updated!`)
        setTimeout(() => {
            stayOrGo();
        }, 1000);
    })
}

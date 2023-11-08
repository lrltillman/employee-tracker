const inquirer = require("inquirer");
const { default: ListPrompt } = require('inquirer/lib/prompts/list');

const landingQuestion = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        name: "landing"
    }
]

inquirer.prompt(landingQuestion).then(data => {
    let userChoice = data.landing;
    if (userChoice === "View all departments") {
        console.log("You selected view all depts!")
    } if (userChoice === "View all roles") {
        console.log("You selected view all roles!")
    } if (userChoice === "View all employees") {
        console.log("You selected view all employees!")
    } if (userChoice === "Add a department") {
        initNewDept();
    } if (userChoice === "Add a role") {
        initNewRole();
    } if (userChoice === "Add an employee") {
        initAddEmp();
    } if (userChoice === "Update an employee role") {
        console.log("UPDATE EMPLOYEE ROLE")
    }
})

//function for View all departments
//function to console log all departments

//function for View all Roles
// function to console log all roles

//function for View all employees
//function to console log all employees

//function for Add a department

const newDept = [
    {
        type: "input",
        message: "What is the name of the new department?",
        name: "newDeptName"
    }];

function initNewDept() {
    inquirer.prompt(newDept).then(data => {
        console.log(`YOU NAMED IT '${data.newDeptName}' OMGGGGG!!!`)
    })
}

//function for Add a role

const newRole = [{
    type: "input",
    message: "What is the name of the new role?",
    name: "newRoleName"
},
{
    type: "input",
    message: "What is the salary for this new role?",
    name: "newRoleSal"
},
{
    type: "input",
    message: "Which department will this role work in?",
    name: "newRoleDept"
}]

function initNewRole() {
    inquirer.prompt(newRole).then(data => {
        console.log(`Name is '${data.newRoleName}', salary is '${data.newRoleSal}', dept is '${data.newRoleDept}'`)
    })
}
//function for Add an employee

const addEmp = [
    {
        type: "input",
        message: "What is the new employee's FIRST name?",
        name: "newEmpFirst"
    },
    {
        type: "input",
        message: "What is the new employee's LAST name?",
        name: "newEmpLast"
    },
    {
        type: "input",
        message: "What is the new employee's ROLE at the company?",
        name: "newEmpRole"
    },
    {
        type: "input",
        message: "Who is the new employee's manager?",
        name: "newEmpManager"
    },]

function initAddEmp() {
    inquirer.prompt(addEmp).then(data => {
        console.log(`New employee is ${data.newEmpFirst} ${data.newEmpLast}. They will be employed as ${data.newEmpRole}, and managed by ${data.newEmpManager}.`)
    })
}
//function for Update an employee role

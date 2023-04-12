const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employeeT_db",
});

// this is the list of questions to prompt the user
const Start = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "selection",
        message: "please select a task",
        choices: [
          "list All Employees",
          "Add New Employee",
          "Update Employee Role",
          "list All Roles",
          "Add Role",
          "List All Departments",
          "Add Department",
          "leave",
        ],
      },
    ])
    .then((data) => {
      console.log(data);
      switch (data.selection) {
        case "list All Employees":
          listAllEmployees();
          break;

        case "Add New Employee":
          addNewEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "list All Roles":
          listAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "list All Departments":
          ListAllDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "leave":
          console.log("Goodbye");
          process.exit();
      }
    });
};
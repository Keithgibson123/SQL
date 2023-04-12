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
// this will be questions to add a new epmloyee
const addNewEmployee = () => {
    db.query("SELECT * FROM role", (err, roles) => {
      if (err) console.log(err);
      roles = roles.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "what is the employees first name",
          },
          {
            type: "input",
            name: "last_name",
            message: "what is the employees last name",
          },
          {
            type: "list",
            loop: false,
            message: "What is the employee's role?",
            choices: roles,
            name: "role_id",
          },
          {
            type: "list",
            loop: false,
            message: "Who is the employee's manager?",
            choices: [1,2],
            name: "manager_id",
          },
        ])
        .then(({ first_name, last_name, role_id, manager_id }) => {
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`,
            (err, data) => {
              err ? console.log(err) : console.log("A new Employee has been created");
              Start();
            }
          );
        });
    });
  };
  
  // this will be questions to add new employee role
  const updateEmployeeRole = () => {
    db.query(
      `SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`,
      (err, data) => {
        db.query(
          "SELECT id AS value, title as name FROM role",
          (err, roleData) => {
            inquirer
              .prompt([
                {
                  type: "list",
                  loop: false,
                  message: "Which employee's role do you want to update?",
                  choices: data,
                  name: "employee_id",
                },
                {
                  type: "list",
                  loop: false,
                  message:
                    "Which role do you want to assign the selected employee?",
                  choices: roleData,
                  name: "role_id",
                },
              ])
              .then((data) => {
                let id = data.employee_id;
                let role_id = data.role_id;
                db.query(
                  "UPDATE employee SET role_id = ? WHERE id = ?",
                  [role_id, id],
                  (err, data) => {
                    err ? console.log(err) : console.log("employee role has been updated");
                    Start();
                  }
                );
              });
          }
        );
      }
    );
  };
  
  //A table to list all employees
  const listAllEmployees = () => {
    console.log("list all Employees Selected");
    db.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary`,
      (err, results) => {
        err ? console.log(err) : console.log("\n");
        console.table(results);
        promptUser();
      }
    );
  };
  
  // a table that list all roles
  const listAllRoles = () => {
    db.query(
      "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department on role.department_id = department.id",
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log("\n");
        console.table(results);
        Start();
      }
    );
  };
  
  // a table that will add roles 
  const addRole = () => {
    db.query("SELECT id AS value, name FROM department", (err, data) => {
      if (err) {
        throw err;
      }
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the name of the role?",
            name: "title",
          },
          {
            type: "input",
            message: "What is the salary of the role?",
            name: "salary",
          },
          {
            type: "list",
            loop: false,
            message: "Which department does the role belong to?",
            choices: data,
            name: "department_id",
          },
        ])
        .then(({ title, salary, department_id }) => {
          db.query(
            `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`,
            (err, data) => {
              err ? console.log(err) : console.log("a new role has been created");
              Start();
            }
          );
        });
    });
  };
  // a table tyhat will list all departments
  const ListAllDepartments = () => {
    db.query("SELECT * FROM department", (err, results) => {
      if (err) {
        throw err;
      }
      console.log("\n");
      console.table(results);
      Start();
    });
  };
  
  
  Start();
  
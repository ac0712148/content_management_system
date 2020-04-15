const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "tracker_db"
});
connection.connect(err => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId + "\n");
    start();
});
function start() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What action do you want to perform?",
        choices: [
          "ADD employee",
          "VIEW department, roles, or employees",
          "UPDATE employees",
          "Exit"
        ]
      }
    ])
    .then(answer => {
      switch (answer.action) {
        case "ADD employee":
          return add();
        case "VIEW department, roles, or employees":
          return view();
        case "UPDATE employees":
          return update();
        case "Exit": {
          console.log("Exiting....")
          connection.end();
        }
      }
    }
  );
}
function add() {
  inquirer
    .prompt([
      {
        name: "firstName",
        message: "What is the employee's first name?"
      },{
        name: "lastName",
        message: "What is the employee's last name?"
      },{
        name: "title",
        type: "list",
        message: "What is the employee's role title?",
        choices: [
          "Regional Manager",
          "Sales Representative",
          "Receptionist",
          "Accountant",
          "Senior Accountant",
          "Supply Relations Representative",
          "Customer Service Representative",
          "Human Resources Representative",
          "QA Director"
        ]
      },{
        name: "managerID",
        message: "What is the employee's manager ID?"
      }
    ])
    .then(answer => {
  console.log("Inserting a new Employee...\n");
  connection.query(`SELECT role.title AS Role, role.id AS RoleID, department.dept_name AS Department, department.id
  FROM role
  INNER JOIN department ON role.department_id = department.id
  WHERE role.title = '${answer.title}';`, (err, res) => {
    if (err) {
      throw err;
    }
    connection.query(
    `INSERT INTO employee (first_name, last_name, manager_id, role_id)
    VALUES
    ("${answer.firstName}", "${answer.lastName}", ${answer.managerID}, ${res[0].id})`,
    (err, res) => {
      if (err) {
        throw err;
      }
      start();
    }
  );
  });
  
    });
}
function view() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What VIEW do you want to perform?",
        choices: [
          "View All Employees",
          "VIEW employees by Role",
          "VIEW employees by Department",
          "Exit"
        ]
      }
    ])
    .then(answer => {
      switch (answer.action) {
        case "View All Employees": {
          console.log("Viewing all employees...");
          return readData(`SELECT e.id, e.first_name, e.last_name, r.title, d.dept_name, r.salary, e.manager_id
          FROM department d, role r, employee e
          WHERE d.id = r.department_id AND r.id = e.role_id
          ORDER BY e.id ASC;`);
        }
        case "VIEW employees by Role": {
          console.log("Viewing all employees by Role...");
          return readData(`SELECT r.title AS role, e.id, e.first_name, e.last_name, d.dept_name, r.salary, e.manager_id
          FROM department d, role r, employee e
          WHERE d.id = r.department_id AND r.id = e.role_id
          ORDER BY r.title ASC;`);
        }
        case "VIEW employees by Department":{
          console.log("Viewing all employees by department...");
          return readData(`SELECT d.dept_name, e.id, e.first_name, e.last_name, r.title AS role, r.salary, e.manager_id
          FROM department d, role r, employee e
          WHERE d.id = r.department_id AND r.id = e.role_id
          ORDER BY d.dept_name ASC;`);
        }
        case "Exit": {
          console.log("Exiting....")
          connection.end();
        }
      }
    });
}
function readData(search) {
  connection.query(search, (err, res) => {
    if (err) {
      throw err;
    }
    // Log all results of the SELECT statement
    console.table(res);
    view();
  });
}
// function update() {
//   inquirer
//     .prompt([
//       {
//         name: "startYear",
//         message: "What year do you want to start with?"
//       },
//       {
//         name: "endYear",
//         message: "What year do you want to end with?"
//       }
//     ])
//     .then(answers => {
//       connection.query(
//         `SELECT * FROM top5000 
//         WHERE year
//         BETWEEN ${answers.startYear} AND ${answers.endYear}`,
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           // Log all results of the SELECT statement
//           console.table(res);
//           start();
//         }
//       );
//     });
// }
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
    //   start();
    connection.end();
});
function start() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What do you want to do next?",
        choices: [
          "Search by Song",
          "Search by Artist",
          "Search by Year Range",
          "Exit"
        ]
      }
    ])
    .then(answer => {
      switch (answer.action) {
        case "Search by Song":
          return querySong();
        case "Search by Artist":
          return queryArtist();
        case "Search by Year Range":
          return searchYearRange();
        case "Exit":
          connection.end();
      }
    });
}
function queryArtist() {
  inquirer
    .prompt([
      {
        name: "artist",
        message: "What artist do you want to search?"
      }
    ])
    .then(answer => {
      connection.query(
        "SELECT * FROM top5000 WHERE ?",
        { artist: answer.artist },
        (err, res) => {
          if (err) {
            throw err;
          }
          // Log all results of the SELECT statement
          if (res.length > 0) {
            console.table(res);
          } else {
            console.log("No search results.");
          }
          start();
        }
      );
    });
}
function querySong() {
  inquirer
    .prompt([
      {
        name: "song",
        message: "What song do you want to search?"
      }
    ])
    .then(answer => {
      connection.query(
        `SELECT * FROM top5000 WHERE song='${answer.song}'`,
        (err, res) => {
          if (err) {
            throw err;
          }
          if (res.length > 0) {
            console.table(res);
          } else {
            console.log("No search results.");
          }
          start();
        }
      );
    });
}
function searchYearRange() {
  inquirer
    .prompt([
      {
        name: "startYear",
        message: "What year do you want to start with?"
      },
      {
        name: "endYear",
        message: "What year do you want to end with?"
      }
    ])
    .then(answers => {
      connection.query(
        `SELECT * FROM top5000 
        WHERE year
        BETWEEN ${answers.startYear} AND ${answers.endYear}`,
        (err, res) => {
          if (err) {
            throw err;
          }
          // Log all results of the SELECT statement
          console.table(res);
          start();
        }
      );
    });
}
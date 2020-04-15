# Content Management System
Content Management System (CMS) using CLI, Node.js, and mySQL

## Table of Contents
  
  * [Description](#description)
  * [Files](#files)
  * [Installation and Dependencies](#installation)
  * [Usage](#usage)

## Description

For this project, we design and build a Command Line Interface to allows the user track employees of a company. Using Node JS and mySQL, are able 
to log and display employee information such as first name, last name, title, department, salary, and much more. This interface allows the user to 
add employees, view employee information, or update roles for employees using mySQL queries through Node.

## Files

The files included for this project are as follow:
  * `index.js` - main script file that handles prompting and querying input
  * `tracker_db.sql` - contains schema for our database
  * `seed.sql` - contains test data for our database
  * `package.json` - dependecies for project

## Installation and Dependencies

To run this script, we must install the dependencies for this project. The main dependencies are  `inquirer` and `mySQL` to properly run the script.
 We also added a `console.table` package to render tables properly to the console. Running `npm install` should take care of the dependencies.

## Usage

The purpose of using this project is to utilize mySQL database to store, view or modify data. 

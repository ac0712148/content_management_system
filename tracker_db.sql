-- Drops the tracker_db if it exists currently
DROP DATABASE IF EXISTS tracker_db;
-- Creates the "tracker_db" database
CREATE DATABASE tracker_db;
-- Make it so all of the following code will affect tracker_db
USE tracker_db;
-- Design the following database schema containing three tables:

-- Create table called "department"
-- * "id" that is a INT PRIMARY KEY
-- * "name" that is a VARCHAR(30) to hold department name
CREATE TABLE department (
    name VARCHAR(30) NOT NULL,

    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

-- Create a table called "role"
-- * "id" that is an INT PRIMARY KEY
-- * "title" that is VARCHAR(30) to hold role title
-- * "salary" that is DECIMAL to hold role salary
-- * "department_id" that is INT to hold reference to department role belongs to
CREATE TABLE role (
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,

    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);

-- Create a table called "employee"
-- * "id" INT PRIMARY KEY
-- "first_name" that is VARCHAR(30) to hold employee first name
-- "last_name" that is a VARCHAR(30) to hold employee last name
-- "role_id" that is an INT to hold reference to employee has
-- "manager_id" that is an INT to hold reference to another employee that is manager 
--      of the current employee. May be null if the employee has no manager
CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,

    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id)
);
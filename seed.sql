USE tracker_db;
INSERT INTO department (dept_name)
VALUES
	("Managerial"),
    ("Sales"),
    ("Accounting"),
    ("HR"),
    ("Operations");
    
INSERT INTO role (title, salary, department_id)
VALUES
	("Regional Manager", 75000, 1),
    ("Sales Representative", 45000, 2),
    ("Receptionist", 30000, 5),
    ("Accountant", 50000, 3),
    ("Supply Relations Representative", 37000, 5),
    ("Senior Accountant", 55000, 3),
    ("Customer Service Representative", 29000, 5),
    ("Human Resources Representative", 60000, 4),
    ("QA Director", 43000, 5);
    
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
	("Michael", "Scott", null, 1),
    ("Dwight", "Schrute", 1, 2),
    ("Jim", "Halpert", 1, 2),
    ("Pam", "Beesly", 1, 3),
    ("Ryan", "Howard", 1, 2),
    ("Andy", "Bernard", 1, 2),
    ("Stanley", "Hudson", 1, 2),
    ("Kevin", "Malone", 10, 4),
    ("Meredith", "Palmer", 1, 5),
    ("Angela", "Martin", 1, 6),
    ("Oscar", "Martinez", 10, 4),
    ("Phyllis", "Lapin", 1, 2),
    ("Kelly", "Kapoor", 1, 7),
    ("Toby", "Flenderson", null, 8),
    ("Creed", "Bratton", 1, 9);
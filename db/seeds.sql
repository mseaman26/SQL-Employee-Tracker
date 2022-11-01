

INSERT INTO department(name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role(title, salary, department_id)
VALUES  ("Sales Lead", 60000, 4),
        ("Sales Person", 50000, 4),
        ("Senior Software Engineer", 55000, 1),
        ("Software Engineer", 60000, 1),
        ("Account Manager",70000, 2),
        ("Accountant", 80000, 2),
        ("Legal Team Lead",90000, 3),
        ("Lawyer",100000, 3),
        ("CEO", 120000, null);
     

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Seaman", 9, null),
        ("David", "West", 1, 1),
        ("Tom", "Hanks", 3, 1),
        ("Gery", "Lopez", 5, 1),
        ("Stirling", "Spencer", 7, 1),
        ("Mick", "Fanning", 2, 1),
        ("Jordy", "Smith", 4, 3),
        ("Dane", "Reynolds", 6, 5),
        ("Keith", "Malloy", 8, 7),
        ("Joel", "Parkinson", 8, 7);


-- SELECT employees.first_name, employees.last_name, employees.id FROM employees WHERE employees.manager_id IS null;

-- SELECT employees.first_name, employees.last_name, employees.id, role.title AS Job_Title, department.name AS Department, role.salary, employees.manager_id FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employees.id

-- SELECT employees.first_name, employees.last_name, employees.id, role.title AS Job_Title, department.name AS Department, role.salary, employees.manager_id FROM employees JOIN role ON employees.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employees.id

 SELECT
    employees.id,
    employees.first_name,
    employees.last_name,
    role.title AS title,
    role.salary AS salary,
    department.name,
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employees
    LEFT JOIN role ON employees.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id

-- INSERT INTO department(name) VALUES("Janitorial");
-- SELECT * FROM department;

-- SELECT * FROM employees WHERE manager_id IS null

-- UPDATE employees SET role_id = 8 WHERE id = 1;
-- SELECT * FROM employees;


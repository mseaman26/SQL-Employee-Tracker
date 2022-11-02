

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
        ("David", "West", 1, null),
        ("Tom", "Hanks", 3, null),
        ("Gery", "Lopez", 5, null),
        ("Stirling", "Spencer", 7, null),
        ("Mick", "Fanning", 2, 1),
        ("Jordy", "Smith", 4, 3),
        ("Dane", "Reynolds", 6, 5),
        ("Keith", "Malloy", 8, 7),
        ("Joel", "Parkinson", 8, 7);


INSERT INTO role Values ("hello")
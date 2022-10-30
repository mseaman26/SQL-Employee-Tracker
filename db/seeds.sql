-- INSERT INTO employees(first_name, last_name, role_id, manager_id)
-- VALUES ("ol' gil");

INSERT INTO role(id, title, salary, department_id)
VALUES  (1, "Sales Lead", 50000, 4),
        (2, "Software Engineer", 60000, 1),
        (3, "Account Manager",70000, 2),
        (4, "Accountant", 80000, 2),
        (5, "Legal Team Lead",90000, 3),
        (6, "Lawer",100000, 3),
        (7, "CEO", 120000, null);
     
INSERT INTO department(id, name)
VALUES  (1, "Engineering"),
        (2, "Finance"),
        (3, "Legal"),
        (4, "Sales");
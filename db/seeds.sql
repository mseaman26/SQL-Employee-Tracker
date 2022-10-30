-- INSERT INTO employees(first_name, last_name, role_id, manager_id)
-- VALUES ("ol' gil");

INSERT INTO role(id, title, salary, department_id)
VALUES  (1, "Sales Lead", 60000, 4),
        (2, "Sales Person", 50000, 4),
        (3, "Senior Software Engineer", 55000, 1),
        (4, "Software Engineer", 60000, 1),
        (5, "Account Manager",70000, 2),
        (6, "Accountant", 80000, 2),
        (7, "Legal Team Lead",90000, 3),
        (8, "Lawer",100000, 3),
        (9, "CEO", 120000, null);
     
INSERT INTO department(id, name)
VALUES  (1, "Engineering"),
        (2, "Finance"),
        (3, "Legal"),
        (4, "Sales");

INSERT INTO employees(id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Michael", "Seaman", 7, null),
        (2, "David", "West", 2, 1),
        (3, "Tom", "Hanks", 5, null);
       

USE company_db;

INSERT INTO department (name)
VALUES ("Marketing"),
       ("Finance"),
       ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketer", 70000, 1),
       ("Accountant", 150000, 2),
       ("Representative", 100000, 3),
       ("Actuary", 100000, 2);
       
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Abby", "Smith", 1, null),
       ("Bob", "Johnson", 1, null),
       ("Cody", "Levin", 2, null);
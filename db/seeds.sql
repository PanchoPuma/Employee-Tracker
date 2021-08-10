USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("CX");
INSERT INTO department (name)
VALUES ("Operations");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Francis", "Da Silva", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nora", "Smith", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Camile", "Mendoza", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shane", "Grey", 4, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lucas", "Oliveira", 5, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Johnson", 6, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Riley", "Matthews", 5, 1);



INSERT INTO role (title, salary, department_id)
VALUES ("Sales VP", 200000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Product Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("CX Manager", 55000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Operations Lead Manager", 99000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ("Team Engineer", 120000, 2);


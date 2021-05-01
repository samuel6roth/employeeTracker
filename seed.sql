USE employees_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Tony', 'DePriest', 1, 80),
('Rodney', 'White', 2, 81),
('David', 'Shaw', 3, 82),
('Bruce', 'Crites', 4, 83),
('Wes', 'Lutton', 5, 84),
('Tim', 'Taurone', 6, 85);

INSERT INTO department (name)
VALUES 
('Production'),
('Purchasing'),
('Accounting'),
('Engineering'),
('Quality'),
('Tooling');

INSERT INTO role (title, salary, department_id)
VALUES
('Molding Manager', 10000, 1),
('Procurement Agent', 15000, 2),
('Finance Manager', 20000, 3),
('Project Engineer', 25000, 4),
('Quality Manager', 30000, 5),
('Tool Shop Manager', 35000, 6);


INSERT INTO department (name) 
VALUES ("Finance"),
    ("Research and Development");
	("IT"),


INSERT INTO role (title, salary, department_id) 
VALUES ("Manager", 125000, 1),
	("Data Analyst", 75000, 3),
	("Supervisor", 30000, 2),
    ("Lead ", 90000, 2),
	("Assistant", 80000, 3),
    ("Security", 40000, 2),
    ("Softwear Engineer", 70000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Keith", "Gibson", 1, null),   
    ("Marvin", "Williams", 3, 1),
    ("Qiandre", "Ryan", 1, null), 
    ("Kevin", "Washington", 4, 2), 
    ("Dorien", "Tipton", 4, 3),
    ("Wednesday", "Adams", 2, null), 
    ("scooby", "Doo", 5, 3);

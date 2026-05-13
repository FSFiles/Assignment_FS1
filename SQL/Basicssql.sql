create database college_dbs;
use college_dbs;
create table students (
Stud_id int primary key auto_increment,
Stud_name varchar(20),
Stud_age int ,
Stud_course varchar(50)
);

create table employees (
emp_id int primary key auto_increment UNIQUE,
emp_name varchar(20)NOT NULL,
emp_age int NOT NULL,
emp_salary int NOT NULL default 25000
);

insert into employees (emp_name, emp_age) values
('Arun', 25),
('Kavin', 28),
('Priya', 24),
('Divya', 30),
('Vijay', 27),
('Sneha', 26),
('Rahul', 31),
('Meena', 29),
('Ajith', 32),
('Keerthi', 23);

select * from employees;


rename table students to college_students;

select * from college_students;

alter table college_students
rename column Stud_name to student_name;


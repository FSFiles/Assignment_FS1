CREATE DATABASE CollegeDB;
USE CollegeDB;

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

INSERT INTO students (student_name)
VALUES 
('Leon'),
('Pranesh'),
('Arun'),
('Kavin');

INSERT INTO courses (course_name, student_id)
VALUES
('Java', 1),
('Python', 2);

SELECT student_name,course_name FROM students INNER JOIN courses
ON students.student_id = courses.student_id;

select student_name,course_name from students left join courses
on students.student_id = courses.student_id;

select student_name,course_name from students right join courses
on students.student_id = courses.student_id;

CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100)
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

INSERT INTO departments (dept_name)
VALUES
('HR'),
('IT'),
('Finance');

INSERT INTO employees (emp_name, dept_id)
VALUES
('Leon', 1),
('Pranesh', 2),
('Arun', NULL);

select emp_name,dept_name from departments inner join employees on departments.dept_id = employees.dept_id;

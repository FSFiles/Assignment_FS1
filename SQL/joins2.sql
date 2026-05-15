CREATE DATABASE CollegeDB;
USE CollegeDB;

-- Create students table
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100)
);

-- Create courses table
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100),
    student_id INT,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Insert students
INSERT INTO students (student_name)
VALUES 
('Leon'),
('Pranesh'),
('Arun'),
('Kavin');

-- Insert courses
INSERT INTO courses (course_name, student_id)
VALUES
('Java', 1),
('Python', 2);

-- INNER JOIN
SELECT 
    students.student_name,
    courses.course_name
FROM students
INNER JOIN courses
ON students.student_id = courses.student_id;
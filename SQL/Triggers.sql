CREATE DATABASE College;
USE College;

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100),
    student_age INT
);

CREATE TABLE student_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    message VARCHAR(255)
);

DELIMITER $$

CREATE TRIGGER after_student_insert
AFTER INSERT
ON students
FOR EACH ROW
BEGIN
    INSERT INTO student_logs(message)
    VALUES (
        CONCAT('New student added: ', NEW.student_name)
    );
END$$

DELIMITER ;

INSERT INTO students(student_name, student_age)
VALUES ('Leon', 21);

SELECT * FROM student_logs;
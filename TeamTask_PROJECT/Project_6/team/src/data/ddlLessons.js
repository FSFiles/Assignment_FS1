export const ddlLessons = [
  {
    id: 'ddl-1', title: 'CREATE TABLE', category: 'DDL', difficulty: 'Beginner', icon: '🏗️',
    definition: 'Creates a new table with columns, data types, and constraints.',
    syntax: `CREATE TABLE table_name (
  column1 datatype constraints,
  column2 datatype constraints
);`,
    example: `CREATE TABLE Students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name  VARCHAR(50) NOT NULL,
  email      VARCHAR(100) UNIQUE,
  age        INT CHECK (age >= 18),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    explanation: 'Defines structure before inserting data. Use explicit column lists and constraints for data integrity.',
  },
  {
    id: 'ddl-2', title: 'ALTER TABLE', category: 'DDL', difficulty: 'Beginner', icon: '✏️',
    definition: 'Modifies an existing table — add, change, or drop columns and constraints.',
    syntax: `ALTER TABLE table_name ADD column_name datatype;
ALTER TABLE table_name MODIFY COLUMN col new_type;
ALTER TABLE table_name DROP COLUMN column_name;`,
    example: `ALTER TABLE Students ADD phone VARCHAR(15);
ALTER TABLE Students MODIFY COLUMN email VARCHAR(150);
ALTER TABLE Students DROP COLUMN phone;`,
    explanation: 'Evolve schema without dropping the table. Always backup production data before ALTER operations.',
  },
  {
    id: 'ddl-3', title: 'DROP TABLE', category: 'DDL', difficulty: 'Beginner', icon: '🗑️',
    definition: 'Permanently removes a table and all its data from the database.',
    syntax: `DROP TABLE table_name;
DROP TABLE IF EXISTS table_name;`,
    example: `DROP TABLE IF EXISTS Students_Archive;
DROP TABLE TempData;`,
    explanation: 'Use IF EXISTS to avoid errors. This cannot be undone — all rows and structure are deleted.',
  },
  {
    id: 'ddl-4', title: 'CREATE DATABASE', category: 'DDL', difficulty: 'Beginner', icon: '🗄️',
    definition: 'Creates a new database container to hold tables, views, and other objects.',
    syntax: `CREATE DATABASE database_name;
CREATE DATABASE IF NOT EXISTS db_name
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
    example: `CREATE DATABASE IF NOT EXISTS sql_academy
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sql_academy;`,
    explanation: 'One database can hold many tables. Choose UTF8MB4 for full Unicode support including emojis.',
  },
  {
    id: 'ddl-5', title: 'CREATE INDEX', category: 'DDL', difficulty: 'Intermediate', icon: '⚡',
    definition: 'Builds an index on columns to speed up SELECT queries on large tables.',
    syntax: `CREATE INDEX index_name ON table_name (column1, column2);
CREATE UNIQUE INDEX idx_name ON table_name (column);`,
    example: `CREATE INDEX idx_email ON Students (email);
CREATE INDEX idx_name ON Students (last_name, first_name);`,
    explanation: 'Indexes trade slightly slower writes for much faster reads. Index columns used in WHERE and JOIN.',
  },
  {
    id: 'ddl-6', title: 'TRUNCATE TABLE', category: 'DDL', difficulty: 'Intermediate', icon: '🧹',
    definition: 'Removes all rows instantly and resets auto-increment counters. Table structure remains.',
    syntax: `TRUNCATE TABLE table_name;`,
    example: `TRUNCATE TABLE Students;
-- Table exists, 0 rows, AUTO_INCREMENT resets`,
    explanation: 'Faster than DELETE for clearing entire tables. Usually cannot be rolled back.',
  },
  {
    id: 'ddl-7', title: 'CREATE VIEW', category: 'DDL', difficulty: 'Intermediate', icon: '👁️',
    definition: 'Creates a virtual table based on a SELECT query. Does not store data physically.',
    syntax: `CREATE VIEW view_name AS
SELECT columns FROM table(s) WHERE condition;`,
    example: `CREATE VIEW ActiveStudents AS
SELECT student_id, first_name, last_name, email
FROM Students
WHERE age >= 18;

SELECT * FROM ActiveStudents;`,
    explanation: 'Views simplify complex queries and restrict visible columns for security.',
  },
  {
    id: 'ddl-8', title: 'RENAME TABLE', category: 'DDL', difficulty: 'Beginner', icon: '🏷️',
    definition: 'Changes the name of an existing table without losing data.',
    syntax: `RENAME TABLE old_name TO new_name;
-- MySQL also: ALTER TABLE old RENAME TO new;`,
    example: `RENAME TABLE Students TO Learners;
RENAME TABLE Learners TO Students;`,
    explanation: 'Useful during refactoring. Update application code and foreign keys that reference the old name.',
  },
  {
    id: 'ddl-9', title: 'PRIMARY & FOREIGN KEYS', category: 'DDL', difficulty: 'Intermediate', icon: '🔑',
    definition: 'Primary keys uniquely identify rows. Foreign keys link tables and enforce referential integrity.',
    syntax: `CREATE TABLE child (
  id INT PRIMARY KEY,
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES parent(id)
);`,
    example: `CREATE TABLE Enrollments (
  enrollment_id INT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (student_id) REFERENCES Students(student_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);`,
    explanation: 'Foreign keys prevent orphan records — you cannot delete a parent row if children still reference it.',
  },
  {
    id: 'ddl-10', title: 'CONSTRAINTS', category: 'DDL', difficulty: 'Intermediate', icon: '🛡️',
    definition: 'Rules on columns: NOT NULL, UNIQUE, CHECK, DEFAULT enforce valid data at insert/update time.',
    syntax: `column_name datatype NOT NULL UNIQUE DEFAULT value CHECK (condition)`,
    example: `CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sku VARCHAR(20) UNIQUE NOT NULL,
  price DECIMAL(10,2) CHECK (price > 0),
  stock INT DEFAULT 0
);`,
    explanation: 'Constraints catch bad data early. Combine them with foreign keys for robust database design.',
  },
];

export const dmlLessons = [
  {
    id: 'dml-1', title: 'INSERT INTO', category: 'DML', difficulty: 'Beginner', icon: '➕',
    definition: 'Adds one or more new rows into a table.',
    syntax: `INSERT INTO table_name (col1, col2) VALUES (val1, val2);
INSERT INTO table_name (cols) VALUES (v1,v2), (v3,v4);`,
    example: `INSERT INTO Students (first_name, last_name, email, age)
VALUES ('Alice', 'Johnson', 'alice@email.com', 22);

INSERT INTO Students (first_name, last_name, email, age) VALUES
  ('Bob', 'Smith', 'bob@email.com', 25),
  ('Carol', 'Williams', 'carol@email.com', 21);`,
    explanation: 'Always list columns explicitly. Batch inserts are faster than many single-row inserts.',
  },
  {
    id: 'dml-2', title: 'UPDATE', category: 'DML', difficulty: 'Beginner', icon: '🔄',
    definition: 'Modifies existing column values in rows that match a condition.',
    syntax: `UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;`,
    example: `UPDATE Students SET email = 'alice.new@email.com' WHERE student_id = 1;
UPDATE Students SET status = 'Senior' WHERE age > 22;`,
    explanation: 'Always use WHERE — without it, every row in the table gets updated.',
  },
  {
    id: 'dml-3', title: 'DELETE', category: 'DML', difficulty: 'Beginner', icon: '❌',
    definition: 'Removes rows from a table based on a condition.',
    syntax: `DELETE FROM table_name WHERE condition;
DELETE FROM table_name; -- removes ALL rows`,
    example: `DELETE FROM Students WHERE student_id = 5;
DELETE FROM Students WHERE age > 30;`,
    explanation: 'Run SELECT with the same WHERE first to preview rows. DELETE is permanent unless using transactions.',
  },
  {
    id: 'dml-4', title: 'INSERT FROM SELECT', category: 'DML', difficulty: 'Intermediate', icon: '📥',
    definition: 'Copies rows from one table (or query result) into another table.',
    syntax: `INSERT INTO target_table (col1, col2)
SELECT col1, col2 FROM source_table WHERE condition;`,
    example: `INSERT INTO Students_Archive (first_name, last_name, email, age)
SELECT first_name, last_name, email, age
FROM Students
WHERE age > 30;`,
    explanation: 'Great for archiving, backups, and bulk data migration between tables.',
  },
  {
    id: 'dml-5', title: 'UPDATE WITH JOIN', category: 'DML', difficulty: 'Intermediate', icon: '🔗',
    definition: 'Updates rows using values from related tables via JOIN.',
    syntax: `UPDATE t1
JOIN t2 ON t1.id = t2.t1_id
SET t1.col = t2.col
WHERE condition;`,
    example: `UPDATE Students s
JOIN Enrollments e ON s.student_id = e.student_id
SET s.status = 'Enrolled'
WHERE e.course_id = 101;`,
    explanation: 'Useful when update values depend on another table. Syntax varies slightly by database engine.',
  },
  {
    id: 'dml-6', title: 'DELETE WITH JOIN', category: 'DML', difficulty: 'Intermediate', icon: '🧨',
    definition: 'Deletes rows based on relationships with other tables.',
    syntax: `DELETE t1 FROM t1
JOIN t2 ON t1.id = t2.t1_id
WHERE condition;`,
    example: `DELETE s FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.enrollment_id IS NULL;`,
    explanation: 'Deletes students with no enrollments. LEFT JOIN + IS NULL finds unmatched rows.',
  },
  {
    id: 'dml-7', title: 'REPLACE INTO', category: 'DML', difficulty: 'Intermediate', icon: '🔁',
    definition: 'MySQL-specific: inserts a row or deletes and re-inserts if a unique/primary key conflict occurs.',
    syntax: `REPLACE INTO table_name (col1, col2) VALUES (val1, val2);`,
    example: `REPLACE INTO Students (student_id, first_name, email)
VALUES (1, 'Alice Updated', 'alice.new@email.com');`,
    explanation: 'Acts like UPSERT in MySQL. Prefer INSERT ... ON DUPLICATE KEY UPDATE for finer control.',
  },
  {
    id: 'dml-8', title: 'MERGE (UPSERT)', category: 'DML', difficulty: 'Advanced', icon: '🔀',
    definition: 'Combines INSERT and UPDATE in one statement when source and target rows match.',
    syntax: `MERGE INTO target T USING source S ON T.id = S.id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...`,
    example: `MERGE INTO Students T
USING NewStudents S ON T.email = S.email
WHEN MATCHED THEN UPDATE SET T.age = S.age
WHEN NOT MATCHED THEN INSERT (first_name, email) VALUES (S.first_name, S.email);`,
    explanation: 'Standard in SQL Server, Oracle, PostgreSQL. Ideal for syncing data from staging tables.',
  },
];

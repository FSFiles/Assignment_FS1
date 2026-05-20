export const dqlLessons = [
  {
    id: 'dql-1', title: 'SELECT Basics', category: 'DQL', difficulty: 'Beginner', icon: '🔍',
    definition: 'Retrieves data from one or more tables. The foundation of all querying.',
    syntax: `SELECT column1, column2 FROM table_name;
SELECT * FROM table_name;`,
    example: `SELECT first_name, last_name, email FROM Students;
SELECT * FROM Students LIMIT 10;`,
    explanation: 'Prefer named columns over * in production for clarity and performance.',
  },
  {
    id: 'dql-2', title: 'WHERE Clause', category: 'DQL', difficulty: 'Beginner', icon: '🎯',
    definition: 'Filters rows using conditions with =, <>, >, <, AND, OR, NOT.',
    syntax: `SELECT columns FROM table WHERE condition;
-- AND / OR / NOT for complex filters`,
    example: `SELECT * FROM Students WHERE age >= 21 AND last_name = 'Johnson';
SELECT * FROM Students WHERE email LIKE '%@gmail.com';`,
    explanation: 'WHERE runs before GROUP BY. Use parentheses to control AND/OR precedence.',
  },
  {
    id: 'dql-3', title: 'ORDER BY & LIMIT', category: 'DQL', difficulty: 'Beginner', icon: '📶',
    definition: 'Sorts result rows and limits how many are returned — essential for pagination.',
    syntax: `SELECT columns FROM table
ORDER BY column ASC | DESC
LIMIT offset, count;`,
    example: `SELECT first_name, gpa FROM Students
ORDER BY gpa DESC, last_name ASC
LIMIT 10 OFFSET 20;`,
    explanation: 'LIMIT 10 OFFSET 20 returns rows 21–30. Always pair LIMIT with ORDER BY for consistent pages.',
  },
  {
    id: 'dql-4', title: 'DISTINCT', category: 'DQL', difficulty: 'Beginner', icon: '✨',
    definition: 'Removes duplicate values from the result set.',
    syntax: `SELECT DISTINCT column FROM table_name;
SELECT DISTINCT col1, col2 FROM table;`,
    example: `SELECT DISTINCT department FROM Students;
SELECT DISTINCT age, department FROM Students;`,
    explanation: 'DISTINCT applies to the full row combination when multiple columns are listed.',
  },
  {
    id: 'dql-5', title: 'LIKE & BETWEEN', category: 'DQL', difficulty: 'Beginner', icon: '🔎',
    definition: 'Pattern matching with wildcards and range filtering between two values.',
    syntax: `WHERE column LIKE 'pattern'   -- % any chars, _ one char
WHERE column BETWEEN val1 AND val2
WHERE column IN (val1, val2, val3)`,
    example: `SELECT * FROM Students WHERE first_name LIKE 'A%';
SELECT * FROM Students WHERE age BETWEEN 20 AND 25;
SELECT * FROM Students WHERE department IN ('CS', 'Math');`,
    explanation: 'LIKE with leading % cannot use indexes efficiently. IN is cleaner than many OR conditions.',
  },
  {
    id: 'dql-6', title: 'INNER JOIN', category: 'DQL', difficulty: 'Intermediate', icon: '🔗',
    definition: 'Returns only rows with matching values in both tables.',
    syntax: `SELECT t1.col, t2.col
FROM table1 t1
INNER JOIN table2 t2 ON t1.id = t2.t1_id;`,
    example: `SELECT s.first_name, c.course_name
FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
INNER JOIN Courses c ON e.course_id = c.course_id;`,
    explanation: 'Only matching rows appear. Students without enrollments are excluded.',
  },
  {
    id: 'dql-7', title: 'LEFT & RIGHT JOIN', category: 'DQL', difficulty: 'Intermediate', icon: '↔️',
    definition: 'LEFT JOIN keeps all left rows; RIGHT JOIN keeps all right rows, with NULLs where no match.',
    syntax: `SELECT * FROM t1 LEFT JOIN t2 ON t1.id = t2.t1_id;
SELECT * FROM t1 RIGHT JOIN t2 ON t1.id = t2.t1_id;`,
    example: `SELECT s.first_name, e.course_id
FROM Students s
LEFT JOIN Enrollments e ON s.student_id = e.student_id;
-- Students with no enrollment show NULL course_id`,
    explanation: 'LEFT JOIN is the most common outer join — find records without matches using IS NULL.',
  },
  {
    id: 'dql-8', title: 'Aggregate Functions', category: 'DQL', difficulty: 'Intermediate', icon: '📊',
    definition: 'COUNT, SUM, AVG, MIN, MAX compute summary values over sets of rows.',
    syntax: `SELECT COUNT(*), AVG(col), SUM(col), MIN(col), MAX(col)
FROM table_name WHERE condition;`,
    example: `SELECT COUNT(*) AS total, AVG(age) AS avg_age, MAX(gpa) AS top_gpa
FROM Students
WHERE department = 'Computer Science';`,
    explanation: 'COUNT(*) counts rows; COUNT(column) ignores NULLs. Use aliases for readable output.',
  },
  {
    id: 'dql-9', title: 'GROUP BY & HAVING', category: 'DQL', difficulty: 'Intermediate', icon: '📈',
    definition: 'GROUP BY groups rows; HAVING filters groups (like WHERE filters individual rows).',
    syntax: `SELECT col, COUNT(*) FROM table
GROUP BY col
HAVING COUNT(*) > 1;`,
    example: `SELECT age, COUNT(*) AS cnt, AVG(gpa) AS avg_gpa
FROM Students
GROUP BY age
HAVING COUNT(*) > 2
ORDER BY cnt DESC;`,
    explanation: 'WHERE filters before grouping; HAVING filters after. Every non-aggregated SELECT column must be in GROUP BY.',
  },
  {
    id: 'dql-10', title: 'Subqueries', category: 'DQL', difficulty: 'Advanced', icon: '🪆',
    definition: 'A query nested inside another query — in WHERE, FROM, or SELECT.',
    syntax: `SELECT col FROM t WHERE col = (SELECT col FROM t2 WHERE ...);
SELECT * FROM (SELECT ... ) AS sub;`,
    example: `SELECT first_name, gpa FROM Students
WHERE gpa > (SELECT AVG(gpa) FROM Students);

SELECT course_name FROM Courses
WHERE course_id IN (
  SELECT course_id FROM Enrollments GROUP BY course_id HAVING COUNT(*) >= 10
);`,
    explanation: 'Powerful but can be slow. CTEs (WITH) often improve readability over nested subqueries.',
  },
  {
    id: 'dql-11', title: 'EXISTS & NOT EXISTS', category: 'DQL', difficulty: 'Advanced', icon: '✅',
    definition: 'Tests whether a subquery returns any rows — often faster than IN for large datasets.',
    syntax: `SELECT col FROM t1 WHERE EXISTS (SELECT 1 FROM t2 WHERE t2.id = t1.id);
SELECT col FROM t1 WHERE NOT EXISTS (...);`,
    example: `SELECT first_name FROM Students s
WHERE EXISTS (
  SELECT 1 FROM Enrollments e
  WHERE e.student_id = s.student_id AND e.course_id = 101
);`,
    explanation: 'EXISTS stops at first match. Use NOT EXISTS to find students with zero enrollments.',
  },
  {
    id: 'dql-12', title: 'UNION & UNION ALL', category: 'DQL', difficulty: 'Intermediate', icon: '➕',
    definition: 'Combines result sets from two or more SELECT statements. UNION removes duplicates; UNION ALL keeps them.',
    syntax: `SELECT col FROM t1
UNION
SELECT col FROM t2;

SELECT col FROM t1 UNION ALL SELECT col FROM t2;`,
    example: `SELECT first_name, 'Student' AS role FROM Students
UNION
SELECT instructor_name, 'Teacher' AS role FROM Instructors
ORDER BY first_name;`,
    explanation: 'Both SELECTs must have the same number of columns and compatible types.',
  },
  {
    id: 'dql-13', title: 'CASE Expression', category: 'DQL', difficulty: 'Intermediate', icon: '🔀',
    definition: 'Conditional logic inside SELECT — like if/else for creating computed columns.',
    syntax: `SELECT col,
  CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE default_result
  END AS alias
FROM table;`,
    example: `SELECT first_name, age,
  CASE
    WHEN age < 22 THEN 'Junior'
    WHEN age < 25 THEN 'Senior'
    ELSE 'Graduate'
  END AS level
FROM Students;`,
    explanation: 'CASE is evaluated row by row. Great for categorizing data without changing the table.',
  },
  {
    id: 'dql-14', title: 'CTE (WITH Clause)', category: 'DQL', difficulty: 'Advanced', icon: '📋',
    definition: 'Common Table Expression — a named temporary result set referenced in the main query.',
    syntax: `WITH cte_name AS (
  SELECT ... FROM table
)
SELECT * FROM cte_name WHERE condition;`,
    example: `WITH TopStudents AS (
  SELECT first_name, gpa FROM Students WHERE gpa >= 3.5
)
SELECT first_name, gpa FROM TopStudents ORDER BY gpa DESC;`,
    explanation: 'CTEs improve readability and can be chained. Recursive CTEs handle hierarchical data (org charts).',
  },
  {
    id: 'dql-15', title: 'NULL Handling', category: 'DQL', difficulty: 'Beginner', icon: '∅',
    definition: 'NULL means unknown/missing. Use IS NULL, IS NOT NULL, COALESCE, and IFNULL to handle it.',
    syntax: `WHERE column IS NULL;
WHERE column IS NOT NULL;
SELECT COALESCE(column, 'default') FROM table;`,
    example: `SELECT first_name, COALESCE(phone, 'No phone') AS contact
FROM Students
WHERE email IS NOT NULL;

SELECT COUNT(*) FROM Students WHERE phone IS NULL;`,
    explanation: 'Never use = NULL — always IS NULL. COALESCE returns the first non-NULL argument.',
  },
  {
    id: 'dql-16', title: 'Window Functions', category: 'DQL', difficulty: 'Advanced', icon: '🪟',
    definition: 'Perform calculations across related rows without collapsing them like GROUP BY.',
    syntax: `SELECT col,
  RANK() OVER (PARTITION BY partition_col ORDER BY order_col) AS rank
FROM table;`,
    example: `SELECT first_name, department, gpa,
  RANK() OVER (PARTITION BY department ORDER BY gpa DESC) AS dept_rank,
  AVG(gpa) OVER (PARTITION BY department) AS dept_avg
FROM Students;`,
    explanation: 'Includes RANK, ROW_NUMBER, LAG, LEAD, running totals. Essential for analytics and leaderboards.',
  },
  {
    id: 'dql-17', title: 'SELF JOIN', category: 'DQL', difficulty: 'Advanced', icon: '🔄',
    definition: 'Joins a table to itself — useful for hierarchical or comparative data within one table.',
    syntax: `SELECT a.col, b.col
FROM table a
JOIN table b ON a.id = b.parent_id;`,
    example: `SELECT e.first_name AS employee, m.first_name AS manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.employee_id;`,
    explanation: 'Table aliases are required. Common for employee-manager trees and finding pairs in same table.',
  },
];

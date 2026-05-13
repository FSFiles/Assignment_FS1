CREATE DATABASE Bank;
USE Bank;

CREATE TABLE Customer (
    cust_id INT PRIMARY KEY AUTO_INCREMENT,
    cust_name VARCHAR(100),
    cust_mobile INT,
    cust_email VARCHAR(100),
    cust_address VARCHAR(200)
);

CREATE TABLE Branch (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(100),
    branch_city VARCHAR(100)
);

CREATE TABLE Account (
    acc_id INT PRIMARY KEY AUTO_INCREMENT,
    cust_id INT,
    branch_id INT,
    acc_number BIGINT UNIQUE,
    acc_type VARCHAR(50),
    balance DECIMAL(10,2),

    FOREIGN KEY (cust_id)
    REFERENCES Customer(cust_id),

    FOREIGN KEY (branch_id)
    REFERENCES Branch(branch_id)
);
CREATE TABLE Transactions (
    trans_id INT PRIMARY KEY AUTO_INCREMENT,
    acc_id INT,
    trans_type VARCHAR(50),
    trans_amount DECIMAL(10,2),
    trans_date DATE,

    FOREIGN KEY (acc_id)
    REFERENCES Account(acc_id)
);


INSERT INTO Customer (cust_name, cust_mobile, cust_email, cust_address)
VALUES
('Arun', 9876543210, 'arun@gmail.com', 'Chennai'),
('Vijay', 9876543211, 'vijay@gmail.com', 'Madurai'),
('Surya', 9876543212, 'surya@gmail.com', 'Coimbatore');

INSERT INTO Branch (branch_name, branch_city)
VALUES
('SBI Branch', 'Chennai'),
('ICICI Branch', 'Madurai'),
('HDFC Branch', 'Coimbatore');

INSERT INTO Account (cust_id, branch_id, acc_number, acc_type, balance)
VALUES
(1, 1, 12345678901, 'Savings', 50000),
(2, 2, 12345678902, 'Current', 75000),
(3, 3, 12345678903, 'Savings', 30000);

INSERT INTO Transactions (acc_id, trans_type, trans_amount, trans_date)
VALUES
(1, 'Deposit', 10000, '2026-05-13'),
(2, 'Withdraw', 5000, '2026-05-13'),
(3, 'Deposit', 7000, '2026-05-13');

-- VIEW TABLES

SELECT * FROM Customer;
SELECT * FROM Branch;
SELECT * FROM Account;
SELECT * FROM Transactions;
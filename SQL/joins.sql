create database E_Commerces;
use E_Commerces;
create table Customers_1 (
	cust_id int primary key auto_increment,
    cust_name varchar(200),
    cust_city varchar(200)
);
insert into Customers_1 (cust_name,cust_city) values ("Leon","Chennai"),("Pranesh","Tirunalvelli");

create table orders (
	order_id int primary key auto_increment,
    Prod_name varchar(50),
    Prod_amt int,
    cust_id int
);
insert into orders (Prod_name,Prod_amt) values ("5-Star","30"),("Frooti","50");
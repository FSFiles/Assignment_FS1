CREATE DATABASE election;
use election;

CREATE TABLE constitution (

constitution_id int primary key auto_increment,
district_name varchar(200) not null,
constitution_name varchar(200) not null,
constitution_dis_id varchar(200) not null

);

CREATE TABLE parties (

party_id int primary key auto_increment,
party_symbol varchar(200) not null,
party_name varchar(200) not null,
party_dis_number varchar(200) not null

);


CREATE TABLE candidates (

candidate_id int primary key auto_increment,
candidate_name varchar(200) not null,
candidate_age varchar(200) not null,
candidate_mobile_number varchar(200) not null,
candidate_party_name varchar(200) not null,
candidate_constitution varchar(200) not null


);





-- Insert Data

INSERT INTO constitution (district_name,constitution_name,constitution_dis_id) VALUES ("CHENNAI","VELACHERY","26"),("CHENNAI","VELACHERY","26");

UPDATE constitution SET constitution_name = "Solinganallur",constitution_dis_id="27" where constitution_id = 2;


DELETE FROM constitution WHERE constitution_id = 3;


INSERT INTO parties (party_symbol,party_name,party_dis_number) VALUES ("Whistle","TVK","20"),("Sun","TVK","20");


INSERT INTO candidates (candidate_name,candidate_age,candidate_mobile_number,candidate_party_name,candidate_constitution) VALUES ("C.Vijay","55","1234567890","TVK","Perambur"),("MK.Stalin","69","1234567890","DMK","Kolathur"),("Seeman","58","1234567890","NTK","Karaikudi"),("EPS","70","1234567890","ADMK","Eddapadi");

Delete from candidates WHERE candidate_id = 1;
Delete from candidates WHERE candidate_id = 2;

UPDATE constitution SET  where constitution_id = ;


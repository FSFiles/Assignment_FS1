create database TNVOTEDB;
use TNVOTEDB;
create table Voters ( 
		Voter_Id int primary key auto_increment,
        Voter_Name varchar(20),
        Voter_Age int,
        Voter_Gender varchar(10),
        Voter_District varchar(20),
        constitution varchar(20),
        Party_Name varchar(20),
        Vote_Count int
);



INSERT INTO Voters 
(Voter_Name, Voter_Age, Voter_Gender, Voter_District, constitution, Party_Name, Vote_Count)
VALUES
("Arjun","25","Male","Chennai","Velachery","DMK","3"),
("Priya","30","Female","Madurai","Madurai Central","AIADMK","5"),
("Karthik","22","Male","Coimbatore","Singanallur","BJP","2"),
("Divya","28","Female","Salem","Salem North","DMK","6"),
("Vijay","35","Male","Trichy","Srirangam","AIADMK","4"),
("Sneha","27","Female","Erode","Erode East","TVK","3"),
("Ravi","40","Male","Tirunelveli","Palayamkottai","DMK","7"),
("Meena","23","Female","Vellore","Katpadi","BJP","2"),
("Suresh","45","Male","Thanjavur","Thanjavur","AIADMK","5"),
("Anitha","32","Female","Dindigul","Dindigul","DMK","6"),
("Manoj","29","Male","Kancheepuram","Tambaram","TVK","3"),
("Lakshmi","34","Female","Nagapattinam","Nagapattinam","AIADMK","4"),
("Raj","38","Male","Karur","Karur","DMK","5"),
("Pooja","26","Female","Krishnagiri","Krishnagiri","BJP","2"),
("Hari","31","Male","Cuddalore","Cuddalore","TVK","3"),
("Nisha","24","Female","Thoothukudi","Thoothukudi","DMK","4"),
("Gokul","28","Male","Virudhunagar","Virudhunagar","AIADMK","5"),
("Keerthi","21","Female","Namakkal","Namakkal","BJP","2"),
("Ashok","36","Male","Perambalur","Perambalur","DMK","6"),
("Revathi","33","Female","Ariyalur","Ariyalur","TVK","3");

select * from Voters;
select Voter_Name,Voter_District,Party_Name from Voters;
select * from Voters where Voter_Age > 30 ;
select * from Voters where  Voter_District = "Chennai" ;
select * from Voters where Party_Name = "DMK" ;
select * from Voters where Voter_Gender = "Female" AND Voter_District = "Madurai";
select * from Voters  order by Voter_Age ASC  ;
select * from Voters order by Voter_District ASC ;
select count(*) from Voters;
select Party_Name,sum(Vote_Count) from Voters group by Party_Name;
select Voter_District,avg(Voter_Age) from Voters group by Voter_District;
select Party_Name,sum(Vote_Count) from Voters group by Party_Name having sum(Vote_Count) > 50;
select Voter_District , max(Voter_Age) from Voters group by Voter_District;
select Voter_District,avg(Voter_Age) from Voters group by Voter_District having avg(Voter_Age) > 28;






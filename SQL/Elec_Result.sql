create database Result;
use Result;


create table Constitution (
		const_id int primary key auto_increment,
        const_Name varchar(200)
        
);

create table District (
        dist_id int primary key auto_increment,
        const_id int,
        dist_Name varchar(20),
        
        FOREIGN KEY (const_id)
        REFERENCES Constitution(const_id)
        
);
create table Party(
		party_id int primary key auto_increment,
        party_symbol varchar(200),
        party_name varchar(200)
);
create table candidate(
		cand_id int primary key auto_increment,
		cand_name varchar(50),
        cand_mob varchar(200),
        cand_email varchar(200)
);

create table Results(
		result_id int primary key auto_increment,
        dist_id int,
        const_id int,
        cand_id int,
        party_id int,
        vote_count int,
        
	FOREIGN KEY (dist_id)
    REFERENCES District(dist_id),

    FOREIGN KEY (const_id)
    REFERENCES Constitution(const_id),

    FOREIGN KEY (cand_id)
    REFERENCES Candidate(cand_id),

    FOREIGN KEY (party_id)
    REFERENCES Party(party_id)
);


INSERT INTO Constitution (const_Name)
VALUES
('Chennai'),
('Madurai'),
('Coimbatore');

INSERT INTO District (const_id, dist_Name)
VALUES
(1, 'Anna Nagar'),
(2, 'Thiruparankundram'),
(3, 'Gandhipuram');

INSERT INTO Party (party_symbol, party_name)
VALUES
('Rising Sun', 'DMK'),
('Two Leaves', 'ADMK'),
('Seeman Symbol', 'NTK');


INSERT INTO Results (
    dist_id,
    const_id,
    cand_id,
    party_id,
    vote_count
)
VALUES
(1, 1, 1, 1, 50000),
(2, 2, 2, 2, 45000),
(3, 3, 3, 3, 30000);


select 




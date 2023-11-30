begin;
CREATE TABLE IF NOT EXISTS affiliation
(
    code VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

INSERT INTO affiliation (code,description) VALUES ('0','PENDING'),
('1','UNKNOWN'),
('2','ASSUMED FRIEND'),
('3','FRIEND'),
('4','NEUTRAL'),
('5','SUSPECT JOKER'),
('6','HOSTILE FAKER');
commit;
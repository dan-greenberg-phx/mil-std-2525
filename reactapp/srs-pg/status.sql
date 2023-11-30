begin;

CREATE TABLE IF NOT EXISTS status
(
    status VARCHAR NOT NULL,
    description VARCHAR
);
INSERT INTO STATUS (status,description) VALUES ('0','PRESENT'),
('1','PLANNED'),
('2','FULLY CAPABLE'),
('3','DAMAGED'),
('4','DESTROYED'),
('5','FULL TO CAPACITY');
commit;

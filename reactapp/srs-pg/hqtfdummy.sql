begin;
CREATE TABLE IF NOT EXISTS hqtfdummy
(
    code VARCHAR NOT NULL,
    description VARCHAR,
    symbolset VARCHAR NOT NULL
);
INSERT INTO hqtfdummy (symbolset,code,description) VALUES ('10','0','NOT APPLICABLE'),
('10','1','FEINT/DUMMY'),
('10','2','HEADQUARTERS'),
('10','3','FEINT/DUMMY HEADQUARTERS'),
('10','4','TASK FORCE'),
('10','5','FEINT/DUMMY TASK FORCE'),
('10','6','TASK FORCE HEADQUARTERS'),
('10','7','FEINT/DUMMY TASK FORCE HEADQUARTERS');
commit;
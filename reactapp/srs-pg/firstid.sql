begin;

CREATE TABLE IF NOT EXISTS firstid
(
    code varchar not null,
    description varchar
);

INSERT INTO firstid(code,description) VALUES ('0','REALITY'),
('1','EXERCISE'),
('2','SIMULATION');
commit;
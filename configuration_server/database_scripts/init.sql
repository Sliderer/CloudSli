CREATE TABLE directories (
    id SERIAL PRIMARY KEY, 
    name varchar(1024) NOT NULL
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY, 
    name varchar(1024) NOT NULL 
);

CREATE INDEX directories_index ON directories(name);
CREATE INDEX files_index ON files(name);

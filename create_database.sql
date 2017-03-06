-- Database name
treats
-- Document your create tables SQL here
CREATE TABLE treats (
id SERIAL PRIMARY KEY,
treat_name VARCHAR(80) NOT NULL,
description VARCHAR(240) NOT NULL,
pic VARCHAR(80) NOT NULL
);

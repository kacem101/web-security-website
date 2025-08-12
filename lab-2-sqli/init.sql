CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;
CREATE TABLE IF NOT EXISTS users (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
INSERT INTO users (name) VALUES ('Alice');
INSERT INTO users (name) VALUES ('Bob');
INSERT INTO users (name) VALUES ('Charlie');

-- Create a separate table for the flag
CREATE TABLE IF NOT EXISTS flags (
    flag_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flag_value VARCHAR(100) NOT NULL
);
INSERT INTO flags (flag_value) VALUES ('FLAG{SQLI_CHALLENGE_f78a2d1b}');
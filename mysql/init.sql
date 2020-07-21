CREATE DATABASE development;
CREATE DATABASE test;

CREATE USER 'user'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON development.* TO 'user'@'%';
GRANT ALL PRIVILEGES ON test.* TO 'user'@'%';
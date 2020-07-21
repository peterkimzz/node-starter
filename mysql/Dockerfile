FROM mysql:8.0.21

ENV MYSQL_RANDOM_ROOT_PASSWORD=yes

COPY custom.cnf /etc/mysql/conf.d/custom.cnf
COPY init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 3306
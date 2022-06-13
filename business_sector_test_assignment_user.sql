create table user
(
    id         int auto_increment
        primary key,
    name       varchar(100)                        not null,
    surname    varchar(100)                        null,
    email      varchar(100)                        not null,
    password   varchar(500)                        not null,
    sex        smallint                            null,
    image      varchar(100)                        null,
    created_at timestamp default CURRENT_TIMESTAMP null,
    jwt_token  varchar(500)                        null,
    constraint user_email_uindex
        unique (email),
    check ((`sex` = 1) or (`sex` = 2))
);

INSERT INTO business_sector_test_assignment.user (id, name, surname, email, password, sex, image, created_at, jwt_token) VALUES (1, 'Faz', null, 'asd', 'asd', null, '/images/mai', '2022-06-13 19:52:39', null);
INSERT INTO business_sector_test_assignment.user (id, name, surname, email, password, sex, image, created_at, jwt_token) VALUES (2, 'Fazliddin', 'Sharafiddinov', 'sharafiddinovfazliddin@gmail.com', '$2b$10$7/OmenI2n12oa0rTNOjPXeTXVRoTsTO72m0hpbhaX5DMTrlkeiwtS', 1, '1655136544486_34cb2f9681ab260b946062840f3665dd.png', '2022-06-13 20:29:16', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NTUxMzQ5ODB9.wk4bC7RlZTzAX6Qi_d0jqgL5uzv1DVeQyuMXuJKT0Ek');

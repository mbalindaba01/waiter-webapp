create table days (
    day_id serial not null primary key, 
    day varchar not null
);

create table waiters (
    waiter_id serial not null primary key, 
    waiter_name varchar not null, 
    days varchar not null
);

insert into days(day) values ('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday'), ('Sunday');


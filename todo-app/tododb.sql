use tododb;

-- drop table task;

CREATE TABLE task (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- AUTO_INCREMENT added here
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    task_status VARCHAR(255)
    
);


create table users(
	id bigint auto_increment primary key,
    email varchar(255) not null unique,
    password varchar(255) not null,
    full_name varchar(255),
    is_enabled boolean default true,
    created_at timestamp default current_timestamp,
    role varchar(20) not null
);

CREATE TABLE tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255),
    token_type VARCHAR(20) DEFAULT 'BEARER',
    revoked BOOLEAN DEFAULT FALSE,
    expired BOOLEAN DEFAULT FALSE,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE task
ADD user_id BIGINT;  -- Thêm cột user_id

ALTER TABLE task
ADD CONSTRAINT fk_task_user
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
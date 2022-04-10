CREATE TABLE users (
    document INT4 NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status INT2 NOT NULL,
    CONSTRAINT PK_USERS PRIMARY KEY (document)
);

ALTER TABLE users OWNER TO carlos_paezf;
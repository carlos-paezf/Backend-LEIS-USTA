/* --------------------------------------- */
/* Table: Roles */
/* --------------------------------------- */
CREATE TABLE roles (
    role_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_ROLES PRIMARY KEY (role_id)
);
/* --------------------------------------- */
/* Table: Operations */
/* --------------------------------------- */
CREATE TABLE operations (
    operation_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_OPERATIONS PRIMARY KEY (operation_id)
);
/* --------------------------------------- */
/* Table: Modules */
/* --------------------------------------- */
CREATE TABLE modules (
    module_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_MODULES PRIMARY KEY (module_id)
);
/* --------------------------------------- */
/* Table: Module-Operation */
/* --------------------------------------- */
CREATE TABLE module_operation (
    module_operation_id SERIAL NOT NULL,
    module_id INT NOT NULL,
    operation_id INT NOT NULL,
    CONSTRAINT PK_MODULE_OPERATION PRIMARY KEY (module_operation_id),
    CONSTRAINT FK_MODULE_OPERATION_MODULES FOREIGN KEY (module_id) REFERENCES modules (module_id),
    CONSTRAINT FK_MODULE_OPERATION_OPERATIONS FOREIGN KEY (operation_id) REFERENCES operations (operation_id)
);
/* --------------------------------------- */
/* Table: Role-Module-Operation */
/* --------------------------------------- */
CREATE TABLE role_module_operation (
    role_id INT NOT NULL,
    module_operation_id INT NOT NULL,
    CONSTRAINT PK_ROLE_MODULE_OPERATION PRIMARY KEY (role_id, module_operation_id),
    CONSTRAINT FK_ROLE_MODULE_OPERATION_ROLES FOREIGN KEY (role_id) REFERENCES roles (role_id),
    CONSTRAINT FK_ROLE_MODULE_OPERATION_MODULE_OPERATION FOREIGN KEY (module_operation_id) REFERENCES module_operation (module_operation_id)
);
/* --------------------------------------- */
/* Table: Status */
/* --------------------------------------- */
CREATE TABLE status (
    status_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_STATUS PRIMARY KEY (status_id)
);
/* --------------------------------------- */
/* Table: Users */
/* --------------------------------------- */
CREATE TABLE users (
    document INT4 NOT NULL,
    role_id INT4 NOT NULL,
    status_id INT4 NOT NULL,
    type_document VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_USERS PRIMARY KEY (document),
    CONSTRAINT FK_USERS_ROLES FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_USERS_STATUS FOREIGN KEY (status_id) REFERENCES status (status_id) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* --------------------------------------- */
/* ALTERS */
/* --------------------------------------- */
CREATE UNIQUE INDEX users_document_uindex ON users (document);
CREATE UNIQUE INDEX users_username_uindex ON users (username);
CREATE UNIQUE INDEX users_email_uindex ON users (email);

CREATE UNIQUE INDEX roles_name_uindex ON roles (name);

CREATE UNIQUE INDEX status_name_uindex ON status (name);
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
/* Table: Permissions */
/* --------------------------------------- */
CREATE TABLE permissions (
    permission_id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_PERMISSIONS PRIMARY KEY (permission_id)
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
/* Table: Role-Module-Permission */
/* --------------------------------------- */
CREATE TABLE role_module_permission (
    role_id INT4 NOT NULL,
    module_id INT4 NOT NULL,
    permission_id INT4 NOT NULL,
    CONSTRAINT PK_ROLE_MODULE_PERMISSION PRIMARY KEY (role_id, module_id, permission_id),
    CONSTRAINT FK_ROLE_MODULE_PERMISSION_ROLES FOREIGN KEY (role_id) REFERENCES roles (role_id),
    CONSTRAINT FK_ROLE_MODULE_PERMISSION_MODULE FOREIGN KEY (module_id) REFERENCES modules (module_id),
    CONSTRAINT FK_ROLE_MODULE_PERMISSION_PERMISSION FOREIGN KEY (permission_id) REFERENCES permissions (permission_id)
);
/* --------------------------------------- */
/* Table: Users */
/* --------------------------------------- */
CREATE TABLE users (
    document INT4 NOT NULL,
    role_id INT4 NOT NULL,
    type_document VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status INT2 NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_USERS PRIMARY KEY (document),
    CONSTRAINT FK_USERS_ROLES FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* --------------------------------------- */
/* ALTERS */
/* --------------------------------------- */
CREATE UNIQUE INDEX users_document_uindex ON users (document);
CREATE UNIQUE INDEX users_username_uindex ON users (username);
CREATE UNIQUE INDEX users_email_uindex ON users (email);

CREATE UNIQUE INDEX roles_name_uindex ON roles (name);
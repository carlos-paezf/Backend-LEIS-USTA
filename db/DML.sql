INSERT INTO roles (name, description, created_at, updated_at) VALUES ('super-admin', 'Rol con todos los privilegios - Designado para el programador', '2022-04-11', '2022-04-11');
INSERT INTO roles (name, description, created_at, updated_at) VALUES ('Director(a) de laboratorios', 'Rol con todos los privilegios - Designado para el director(a) de todos los labotorios', '2022-04-11', '2022-04-11');
INSERT INTO roles (name, description, created_at, updated_at) VALUES ('laboratorista', 'Rol con la mayoría de privilegios', '2022-04-11', '2022-04-11');


INSERT INTO users (document, role_id, type_document, first_name, last_name, username, email, contact_number, password, status, enabled, created_at, updated_at) VALUES ('1', 1, 'Programador', 'Carlos David', 'Páez Ferreira', 'carlos-paezf', 'carlos.paezf@usantoto.edu.co', 'carlos.paezf@usantoto.edu.co', 'admin_password', 1, 1, '2022-04-13', '2022-04-13');

-- Status 1: Al día
-- Status 2: En mora
-- Status 3: En préstamo
-- Status 4: A paz y Salvo


INSERT INTO permissions (name, description, created_at, updated_at) VALUES ('Crear', 'Permite la inserción de datos', '2022-04-13', '2022-04-13');
INSERT INTO permissions (name, description, created_at, updated_at) VALUES ('Listar', 'Permite listar datos', '2022-04-13', '2022-04-13');
INSERT INTO permissions (name, description, created_at, updated_at) VALUES ('Editar', 'Permite la actualización de datos', '2022-04-13', '2022-04-13');
INSERT INTO permissions (name, description, created_at, updated_at) VALUES ('Eliminar', 'Permite la eliminación de datos', '2022-04-13', '2022-04-13');


INSERT INTO modules (name, description, created_at, updated_at) VALUES ('Usuarios', 'Módulo para la gestión de usuarios', '2022-04-13', '2022-04-13');
INSERT INTO modules (name, description, created_at, updated_at) VALUES ('Laboratorios', 'Módulo para la gestión de laboratorios', '2022-04-13', '2022-04-13');
INSERT INTO modules (name, description, created_at, updated_at) VALUES ('Equipos', 'Módulo para la gestión de equipos', '2022-04-13', '2022-04-13');
INSERT INTO modules (name, description, created_at, updated_at) VALUES ('Herramientas y experimentos', 'Módulo para la gestión de herramientas', '2022-04-13', '2022-04-13');
INSERT INTO modules (name, description, created_at, updated_at) VALUES ('Prestamos', 'Módulo para la gestión de prestamos', '2022-04-13', '2022-04-13');
INSERT INTO modules (name, description, created_at, updated_at) VALUES ('Reportes', 'Módulo para la gestión de reportes', '2022-04-13', '2022-04-13');


-- Super Admin
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 1, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 1, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 1, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 1, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 2, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 2, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 2, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 2, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 3, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 3, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 3, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 3, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 4, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 4, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 4, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 4, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 5, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 5, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 5, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 5, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 6, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 6, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 6, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (1, 6, 4);

-- Director(a) de laboratorios
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 1, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 1, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 1, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 1, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 2, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 2, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 2, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 2, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 3, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 3, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 3, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 3, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 4, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 4, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 4, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 4, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 5, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 5, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 5, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 5, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 6, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 6, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 6, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (2, 6, 4);

-- Laboratorista
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 1, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 1, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 2, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 2, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 3, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 3, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 3, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 3, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 4, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 4, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 4, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 4, 4);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 5, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 5, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 5, 3);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 6, 1);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 6, 2);
INSERT INTO role_module_permission (role_id, module_id, permission_id) VALUES (3, 6, 3);

INSERT INTO roles (rol_nombre, rol_descripcion, status, created_at, updated_at) VALUES ('super-admin', 'Rol con todos los privilegios - Designado para el programador', TRUE, '2022-04-11', '2022-04-11');
INSERT INTO roles (rol_nombre, rol_descripcion, status, created_at, updated_at) VALUES ('Director(a) de laboratorios', 'Rol con todos los privilegios - Designado para el director(a) de todos los labotorios', TRUE, '2022-04-11', '2022-04-11');
INSERT INTO roles (rol_nombre, rol_descripcion, status, created_at, updated_at) VALUES ('laboratorista', 'Rol con la mayoría de privilegios', TRUE, '2022-04-11', '2022-04-11');


INSERT INTO usuarios (documento, id_rol, tipo_documento, nombres, apellidos, username, email, numero_contacto, password, status, enabled, created_at, updated_at) VALUES (1, 1, 'Programador', 'Carlos David', 'Páez Ferreira', 'carlos-paezf', 'carlos.paezf@usantoto.edu.co', 'carlos.paezf@usantoto.edu.co', 'admin_password', 1, TRUE, '2022-05-04', '2022-05-04');
INSERT INTO usuarios (documento, id_rol, tipo_documento, nombres, apellidos, username, email, numero_contacto, password, status, enabled, created_at, updated_at) VALUES (2, 3, 'Test', 'Lab Test', 'Prueba', 'lab-test', 'test@test.com', '1234567', 'test_password', 1, TRUE, '2022-05-04', '2022-05-04');

-- Status 1: Al día
-- Status 2: En mora
-- Status 3: En préstamo
-- Status 4: A paz y Salvo


INSERT INTO permisos (permiso_nombre, permiso_descripcion, status, created_at, updated_at) VALUES ('Crear', 'Permite la inserción de datos', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO permisos (permiso_nombre, permiso_descripcion, status, created_at, updated_at) VALUES ('Listar', 'Permite listar datos', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO permisos (permiso_nombre, permiso_descripcion, status, created_at, updated_at) VALUES ('Editar', 'Permite la actualización de datos', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO permisos (permiso_nombre, permiso_descripcion, status, created_at, updated_at) VALUES ('Eliminar', 'Permite la eliminación de datos', TRUE, '2022-04-13', '2022-04-13');


INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Usuarios', 'Módulo para la gestión de usuarios', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Laboratorios', 'Módulo para la gestión de laboratorios', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Equipos', 'Módulo para la gestión de equipos', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Herramientas y experimentos', 'Módulo para la gestión de herramientas', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Prestamos', 'Módulo para la gestión de prestamos', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Reportes', 'Módulo para la gestión de reportes', TRUE, '2022-04-13', '2022-04-13');
INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Roles', 'Módulo para la gestión de roles', TRUE, '2022-04-14', '2022-04-14');
INSERT INTO modulos (modulo_nombre, modulo_descripcion, status, created_at, updated_at) VALUES ('Facultad-Dependencia', 'Módulo para la gestión de Facultades o Dependencias', TRUE, '2022-05-06', '2022-05-06');


-- Super Admin
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 1, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 1, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 1, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 1, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 2, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 2, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 2, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 2, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 3, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 3, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 3, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 3, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 4, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 4, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 4, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 4, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 5, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 5, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 5, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 5, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 6, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 6, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 6, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 6, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 7, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 7, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 7, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 7, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 8, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 8, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 8, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (1, 8, 4, TRUE, '2022-05-10', '2022-05-10');

-- Director(a) de laboratorios
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 1, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 1, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 1, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 1, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 2, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 2, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 2, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 2, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 3, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 3, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 3, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 3, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 4, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 4, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 4, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 4, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 5, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 5, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 5, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 5, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 6, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 6, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 6, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 6, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 7, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 7, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 7, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 7, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 8, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 8, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 8, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (2, 8, 4, TRUE, '2022-05-10', '2022-05-10');

-- Laboratorista
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 1, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 1, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 2, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 2, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 3, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 3, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 3, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 3, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 4, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 4, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 4, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 4, 4, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 5, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 5, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 5, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 6, 1, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 6, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 6, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 8, 2, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 8, 3, TRUE, '2022-05-10', '2022-05-10');
INSERT INTO roles_modulos_permisos (id_rol, id_modulo, id_permiso, status, created_at, updated_at) VALUES (3, 8, 4, TRUE, '2022-05-10', '2022-05-10');

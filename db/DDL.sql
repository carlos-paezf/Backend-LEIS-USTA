/* ---------------------------------------------------------- */
/* Tabla: Módulos */
/* ---------------------------------------------------------- */
CREATE TABLE modulos (
    id_modulo SERIAL NOT NULL,
    modulo_nombre VARCHAR(45) NOT NULL,
    modulo_descripcion TEXT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_MODULOS PRIMARY KEY (id_modulo)
);
CREATE UNIQUE INDEX idx_modulos_modulo_nombre ON modulos (modulo_nombre);
/* ---------------------------------------------------------- */
/* Tabla: Permisos */
/* ---------------------------------------------------------- */
CREATE TABLE permisos (
    id_permiso SERIAL NOT NULL,
    permiso_nombre VARCHAR(45) NOT NULL,
    permiso_descripcion text NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_PERMISOS PRIMARY KEY (id_permiso)
);
CREATE UNIQUE INDEX idx_permisos_permiso_nombre ON permisos (permiso_nombre);
/* ---------------------------------------------------------- */
/* Tabla: Roles */
/* ---------------------------------------------------------- */
CREATE TABLE roles (
    id_rol SERIAL NOT NULL,
    rol_nombre VARCHAR(45) NOT NULL,
    rol_descripcion text NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_ROLES PRIMARY KEY (id_rol)
);
CREATE UNIQUE INDEX idx_roles_rol_nombre ON roles (rol_nombre);
/* ---------------------------------------------------------- */
/* Tabla: Roles-Módulos-Permisos */
/* ---------------------------------------------------------- */
CREATE TABLE roles_modulos_permisos (
    id_rol INT2 NOT NULL,
    id_modulo INT2 NOT NULL,
    id_permiso INT2 NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_ROLES_MODULOS_PERMISOS PRIMARY KEY (id_rol, id_modulo, id_permiso),
    CONSTRAINT FK_ROLES_MODULOS_PERMISOS_ROLES FOREIGN KEY (id_rol) REFERENCES roles (id_rol) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_ROLES_MODULOS_PERMISOS_MODULOS FOREIGN KEY (id_modulo) REFERENCES modulos (id_modulo) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_ROLES_MODULOS_PERMISOS_PERMISOS FOREIGN KEY (id_permiso) REFERENCES permisos (id_permiso) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Usuarios */
/* ---------------------------------------------------------- */
CREATE TABLE usuarios (
    documento INT NOT NULL,
    id_rol INT NOT NULL,
    tipo_documento VARCHAR(255) NOT NULL,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    numero_contacto VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    status INT NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_USUARIOS PRIMARY KEY (documento),
    CONSTRAINT FK_USUARIOS_ROLES FOREIGN KEY (id_rol) REFERENCES roles (id_rol) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX idx_usuarios_documento ON usuarios (documento);
CREATE UNIQUE INDEX idx_usuarios_username ON usuarios (username);
CREATE UNIQUE INDEX idx_usuarios_email ON usuarios (email);
/* ---------------------------------------------------------- */
/* Tabla: Facultad-Dependencia */
/* ---------------------------------------------------------- */
CREATE TABLE facultad_dependencia (
    id_facultad_dependencia SERIAL NOT NULL,
    nombre_facultad_dependencia VARCHAR(45) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_FACULTAD_DEPENDENCIA PRIMARY KEY (id_facultad_dependencia)
);
CREATE UNIQUE INDEX idx_facultad_dependencia_nombre_facultad_dependencia ON facultad_dependencia (nombre_facultad_dependencia);
/* ---------------------------------------------------------- */
/* Tabla: Facultad-Usuarios */
/* ---------------------------------------------------------- */
CREATE TABLE facultad_usuarios (
    id_facultad_usuario SERIAL NOT NULL,
    documento_usuario INT NOT NULL,
    id_facultad INT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_FACULTAD_USUARIOS PRIMARY KEY (id_facultad_usuario),
    CONSTRAINT FK_FACULTAD_USUARIOS_USUARIOS FOREIGN KEY (documento_usuario) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_FACULTAD_USUARIOS_FACULTAD FOREIGN KEY (id_facultad) REFERENCES facultad_dependencia (id_facultad_dependencia) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Multas */
/* ---------------------------------------------------------- */
CREATE TABLE multas (
    id_multa SERIAL NOT NULL,
    nombre_multa VARCHAR(45) NOT NULL,
    precio_multa DECIMAL(13, 2) NOT NULL,
    creacion_multa DATE NOT NULL,
    vencimiento_multa DATE NOT NULL,
    descripcion_multa TEXT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_MULTAS PRIMARY KEY (id_multa)
);
/* ---------------------------------------------------------- */
/* Tabla: Multas-Usuarios */
/* ---------------------------------------------------------- */
CREATE TABLE multas_usuarios (
    id_multas_usuarios SERIAL NOT NULL,
    documento_usuario INT NOT NULL,
    id_multa INT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_MULTAS_USUARIOS PRIMARY KEY (id_multas_usuarios),
    CONSTRAINT FK_MULTAS_USUARIOS_USUARIOS FOREIGN KEY (documento_usuario) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_MULTAS_USUARIOS_MULTAS FOREIGN KEY (id_multa) REFERENCES multas (id_multa) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Tipo de Mantenimiento */
/* ---------------------------------------------------------- */
CREATE TABLE tipo_mantenimiento (
    id_tipo_mantenimiento SERIAL NOT NULL,
    nombre_tipo_mantenimiento VARCHAR(45) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_TIPO_MANTENIMIENTO PRIMARY KEY (id_tipo_mantenimiento)
);
/* ---------------------------------------------------------- */
/* Tabla: Historial-Mantenimientos */
/* ---------------------------------------------------------- */
CREATE TABLE historial_mantenimientos (
    id_historial_mantenimiento SERIAL NOT NULL,
    fecha DATE NOT NULL,
    descripcion_falla text NOT NULL,
    descripcion_mantenimiento text NOT NULL,
    costo DECIMAL(13, 2) NOT NULL,
    n_reporte INT NOT NULL,
    documento_usuario INT NOT NULL,
    tipo_mantenimiento INT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_HISTORIAL_MANTENIMIENTOS PRIMARY KEY (id_historial_mantenimiento),
    CONSTRAINT FK_HISTORIAL_MANTENIMIENTOS_USUARIOS FOREIGN KEY (documento_usuario) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_HISTORIAL_MANTENIMIENTOS_TIPO_MANTENIMIENTO FOREIGN KEY (tipo_mantenimiento) REFERENCES tipo_mantenimiento (id_tipo_mantenimiento) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Documentación Técnica */
/* ---------------------------------------------------------- */
CREATE TABLE documentacion_tecnica (
    id_tipo_manual SERIAL NOT NULL,
    tipo_manual VARCHAR(45) NOT NULL,
    manual VARCHAR(250) NOT NULL,
    codigo VARCHAR(45),
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_DOCUMENTACION_TECNICA PRIMARY KEY (id_tipo_manual)
);
/* ---------------------------------------------------------- */
/* Tabla: Software en Funcionamiento */
/* ---------------------------------------------------------- */
CREATE TABLE software_funcionamiento (
    id_software SERIAL NOT NULL,
    nombre_software VARCHAR(45) NOT NULL,
    n_licencia VARCHAR(45) NOT NULL,
    version VARCHAR(45) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    descripcion_software TEXT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_SOFTWARE_FUNCIONAMIENTO PRIMARY KEY (id_software)
);
/* ---------------------------------------------------------- */
/* Tabla: Partes Moviles Accesorios */
/* ---------------------------------------------------------- */
CREATE TABLE partes_moviles_accesorios (
    id_partes_moviles_accesorios SERIAL NOT NULL,
    nombre_partes VARCHAR(45) NOT NULL,
    cantidad INT NOT NULL,
    marca VARCHAR(45) NOT NULL,
    n_inventario VARCHAR(45) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_PARTES_MOVILES_ACCESORIOS PRIMARY KEY (id_partes_moviles_accesorios)
);
/* ---------------------------------------------------------- */
/* Tabla: Caracteristicas Técnicas */
/* ---------------------------------------------------------- */
CREATE TABLE caracteristicas_tecnicas (
    id_caracteristicas_tecnicas SERIAL NOT NULL,
    frecuencia_hz VARCHAR(45) NOT NULL,
    voltaje_v VARCHAR(45) NOT NULL,
    corriente_ac VARCHAR(45) NOT NULL,
    corriente_dc VARCHAR(45) NOT NULL,
    potencia_vatios VARCHAR(45) NOT NULL,
    capacidad VARCHAR(45) NOT NULL,
    presion_psi VARCHAR(45) NOT NULL,
    temperatura_c VARCHAR(45) NOT NULL,
    peso_kg VARCHAR(45) NOT NULL,
    velocidad_rpm VARCHAR(45) NOT NULL,
    tecnologia_predominante INT NOT NULL,
    fuente_alimentacion INT NOT NULL,
    id_tipo_manual INT,
    id_software_funcionamiento INT,
    id_partes_moviles_accesorios INT,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_CARACTERISTICAS_TECNICAS PRIMARY KEY (id_caracteristicas_tecnicas),
    CONSTRAINT FK_CARACTERISTICAS_TECNICAS_TIPO_MANUAL FOREIGN KEY (id_tipo_manual) REFERENCES documentacion_tecnica (id_tipo_manual) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_CARACTERISTICAS_TECNICAS_SOFTWARE_FUNCIONAMIENTO FOREIGN KEY (id_software_funcionamiento) REFERENCES software_funcionamiento (id_software) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_CARACTERISTICAS_TECNICAS_PARTES_MOVILES_ACCESORIOS FOREIGN KEY (id_partes_moviles_accesorios) REFERENCES partes_moviles_accesorios (id_partes_moviles_accesorios) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Ubicaciones */
/* ---------------------------------------------------------- */
CREATE TABLE ubicaciones (
    id_ubicacion SERIAL NOT NULL,
    nombre_direccion VARCHAR(250) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_UBICACIONES PRIMARY KEY (id_ubicacion)
);
/* ---------------------------------------------------------- */
/* Tabla: Laboratorios */
/* ---------------------------------------------------------- */
CREATE TABLE laboratorios (
    id_laboratorio SERIAL NOT NULL,
    nombre_laboratorio VARCHAR(45) NOT NULL,
    aforo INT NOT NULL,
    cantidad_equipos INT NOT NULL,
    descripcion TEXT NOT NULL,
    id_ubicacion INT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_LABORATORIOS PRIMARY KEY (id_laboratorio),
    CONSTRAINT FK_LABORATORIOS_UBICACION FOREIGN KEY (id_ubicacion) REFERENCES ubicaciones (id_ubicacion) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Requerimiento Mantenimiento */
/* ---------------------------------------------------------- */
CREATE TABLE requerimiento_mantenimiento (
    id_requerimiento_mantenimiento SERIAL NOT NULL,
    periodo DATE NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_REQUERIMIENTO_MANTENIMIENTO PRIMARY KEY (id_requerimiento_mantenimiento)
);
/* ---------------------------------------------------------- */
/* Tabla: Proveedores */
/* ---------------------------------------------------------- */
CREATE TABLE proveedores (
    id_proveedor SERIAL NOT NULL,
    nombre VARCHAR(250) NOT NULL,
    telefono VARCHAR(45) NOT NULL,
    email VARCHAR(250),
    ciudad VARCHAR(100) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_PROVEEDORES PRIMARY KEY (id_proveedor)
);
/* ---------------------------------------------------------- */
/* Tabla: Tipo de Equipo */
/* ---------------------------------------------------------- */
CREATE TABLE tipo_equipo (
    id_tipo_equipo SERIAL NOT NULL,
    tipo VARCHAR(45) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_TIPO_EQUIPO PRIMARY KEY (id_tipo_equipo)
);
/* ---------------------------------------------------------- */
/* Tabla: Equipos */
/* ---------------------------------------------------------- */
CREATE TABLE equipos (
    n_inventario_equipo SERIAL NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    costo DECIMAL(13, 2) NOT NULL,
    fecha_compra DATE NOT NULL,
    serial VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    marca VARCHAR(45) NOT NULL,
    estado_uso INT NOT NULL,
    ficha_tecnica TEXT NOT NULL,
    tipo_adquisicion INT NOT NULL,
    vencimiento_garantia DATE,
    pais_procedencia VARCHAR(45),
    n_acta VARCHAR(45) NOT NULL,
    vida_util VARCHAR(45),
    manual VARCHAR(45),
    id_requerimiento_mantenimiento INT NOT NULL,
    id_proveedor INT,
    id_tipo_equipo INT,
    id_historial_mantenimiento INT,
    id_caracteristicas_tecnicas INT NOT NULL,
    id_laboratorio INT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_EQUIPOS PRIMARY KEY (n_inventario_equipo),
    CONSTRAINT FK_EQUIPOS_REQUERIMIENTO_MANTENIMIENTO FOREIGN KEY (id_requerimiento_mantenimiento) REFERENCES requerimiento_mantenimiento (id_requerimiento_mantenimiento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_EQUIPOS_PROVEEDOR FOREIGN KEY (id_proveedor) REFERENCES proveedores (id_proveedor) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_EQUIPOS_TIPO_EQUIPO FOREIGN KEY (id_tipo_equipo) REFERENCES tipo_equipo (id_tipo_equipo) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_EQUIPOS_HISTORIAL_MANTENIMIENTO FOREIGN KEY (id_historial_mantenimiento) REFERENCES historial_mantenimientos (id_historial_mantenimiento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_EQUIPOS_CARACTERISTICAS_TECNICAS FOREIGN KEY (id_caracteristicas_tecnicas) REFERENCES caracteristicas_tecnicas (id_caracteristicas_tecnicas) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_EQUIPOS_LABORATORIO FOREIGN KEY (id_laboratorio) REFERENCES laboratorios (id_laboratorio) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Uso de laboratorio */
/* ---------------------------------------------------------- */
CREATE TABLE uso_laboratorio (
    id_uso_laboratorio SERIAL NOT NULL,
    fecha_uso DATE NOT NULL,
    hora_inicial time NOT NULL,
    hora_final time NOT NULL,
    tiempo_uso VARCHAR(45) NOT NULL,
    motivo_utilizacion TEXT NOT NULL,
    limpio BOOLEAN NOT NULL,
    correcto_funcionamiento BOOLEAN NOT NULL,
    observaciones TEXT NOT NULL,
    documento_laboratorista INT NOT NULL,
    documento_solicitante INT NOT NULL,
    n_inventario_equipo INT NOT NULL,
    cantidad INT,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_USO_LABORATORIO PRIMARY KEY (id_uso_laboratorio),
    CONSTRAINT FK_USO_LABORATORIO_DOCUMENTO_LABORATORISTA FOREIGN KEY (documento_laboratorista) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_USO_LABORATORIO_DOCUMENTO_SOLICITANTE FOREIGN KEY (documento_solicitante) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_USO_LABORATORIO_EQUIPO FOREIGN KEY (n_inventario_equipo) REFERENCES equipos (n_inventario_equipo) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Préstamos de Equipo */
/* ---------------------------------------------------------- */
CREATE TABLE prestamos_equipo (
    id_prestamo SERIAL NOT NULL,
    fecha_prestamo timestamp NOT NULL,
    estado_entrega INT NOT NULL,
    lugar_destino VARCHAR(45),
    cantidad VARCHAR(45),
    estado_devolucion INT,
    fecha_devolucion timestamp,
    externo_interno INT NOT NULL,
    n_inventario_equipo INT NOT NULL,
    documento_laboratorista INT NOT NULL,
    documento_solicitante INT NOT NULL,
    devuelto BOOLEAN NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_PRESTAMOS_EQUIPO PRIMARY KEY (id_prestamo),
    CONSTRAINT FK_PRESTAMOS_EQUIPO_EQUIPO FOREIGN KEY (n_inventario_equipo) REFERENCES equipos (n_inventario_equipo) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_PRESTAMOS_EQUIPO_DOCUMENTO_LABORATORISTA FOREIGN KEY (documento_laboratorista) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_PRESTAMOS_EQUIPO_DOCUMENTO_SOLICITANTE FOREIGN KEY (documento_solicitante) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Instrumentos */
/* ---------------------------------------------------------- */
CREATE TABLE instrumentos (
    n_inventario_instrumento SERIAL NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    marca VARCHAR(45) NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_INSTRUMENTOS PRIMARY KEY (n_inventario_instrumento)
);
/* ---------------------------------------------------------- */
/* Tabla: Herramientas - Experimento */
/* ---------------------------------------------------------- */
CREATE TABLE herramientas_experimento (
    n_inventario SERIAL NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    referencia VARCHAR(45),
    marca VARCHAR(45),
    n_acta VARCHAR(45),
    manual VARCHAR(45),
    fecha_compra DATE NOT NULL,
    costo DECIMAL(13, 2) NOT NULL,
    id_laboratorio INT NOT NULL,
    id_proveedor INT NOT NULL,
    tipo INT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_HERRAMIENTAS_EXPERIMENTO PRIMARY KEY (n_inventario),
    CONSTRAINT FK_HERRAMIENTAS_EXPERIMENTO_LABORATORIO FOREIGN KEY (id_laboratorio) REFERENCES laboratorios (id_laboratorio) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_HERRAMIENTAS_EXPERIMENTO_PROVEEDOR FOREIGN KEY (id_proveedor) REFERENCES proveedores (id_proveedor) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Instrumentos * Experimento */
/* ---------------------------------------------------------- */
CREATE TABLE instrumentos_x_experimento (
    id_instrumentos_x_experimento SERIAL NOT NULL,
    n_inventario INT NOT NULL,
    n_inventario_instrumento INT NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_INSTRUMENTOS_X_EXPERIMENTO PRIMARY KEY (id_instrumentos_x_experimento),
    CONSTRAINT FK_INSTRUMENTOS_X_EXPERIMENTO_INSTRUMENTO FOREIGN KEY (n_inventario_instrumento) REFERENCES instrumentos (n_inventario_instrumento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_INSTRUMENTOS_X_EXPERIMENTO_EXPERIMENTO FOREIGN KEY (n_inventario) REFERENCES herramientas_experimento (n_inventario) ON DELETE RESTRICT ON UPDATE CASCADE
);
/* ---------------------------------------------------------- */
/* Tabla: Préstamos Experimento Herramienta */
/* ---------------------------------------------------------- */
CREATE TABLE prestamos_exp_herr (
    id_prestamo SERIAL NOT NULL,
    fecha_prestamo timestamp NOT NULL,
    estado_entrega INT NOT NULL,
    lugar_destino VARCHAR(45),
    cantidad VARCHAR(45),
    estado_devolucion INT,
    fecha_devolucion timestamp,
    externo_interno INT NOT NULL,
    n_inventario INT NOT NULL,
    documento_laboratorista INT NOT NULL,
    documento_solicitante INT NOT NULL,
    devuelto BOOLEAN NOT NULL,
    status BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    CONSTRAINT PK_PRESTAMOS_EXPERIMENTO_HERRAMIENTA PRIMARY KEY (id_prestamo),
    CONSTRAINT FK_PRESTAMOS_EXPERIMENTO_HERRAMIENTA_HERRAMIENTA_EXPERIMENTO FOREIGN KEY (n_inventario) REFERENCES herramientas_experimento (n_inventario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_PRESTAMOS_EXPERIMENTO_HERRAMIENTA_DOCUMENTO_LABORATORISTA FOREIGN KEY (documento_laboratorista) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT FK_PRESTAMOS_EXPERIMENTO_HERRAMIENTA_DOCUMENTO_SOLICITANTE FOREIGN KEY (documento_solicitante) REFERENCES usuarios (documento) ON DELETE RESTRICT ON UPDATE CASCADE
);
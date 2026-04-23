-- Base de datos: db_caplogcs (PostgreSQL)
-- Estructura inicial para limpieza, áreas, integrantes, módulos y permisos

-- Tabla de integrantes
CREATE TABLE integrantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido1 VARCHAR(100) NOT NULL,
    apellido2 VARCHAR(100),
    semestre VARCHAR(20),
    carrera VARCHAR(100),
    celular VARCHAR(20),
    correo VARCHAR(120),
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(120) NOT NULL
);

-- Tabla de áreas
CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    encargado_id INTEGER REFERENCES integrantes(id),
    descripcion TEXT
);

-- Tabla de módulos (limpieza, eventos, panel, etc)
CREATE TABLE modulos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla de permisos: qué área puede acceder a qué módulo
CREATE TABLE permisos_area_modulo (
    id SERIAL PRIMARY KEY,
    area_id INTEGER NOT NULL REFERENCES areas(id) ON DELETE CASCADE,
    modulo_id INTEGER NOT NULL REFERENCES modulos(id) ON DELETE CASCADE,
    UNIQUE(area_id, modulo_id)
);

-- Tabla de actividades de limpieza
CREATE TABLE actividades_limpieza (
    id SERIAL PRIMARY KEY,
    area_id INTEGER NOT NULL REFERENCES areas(id) ON DELETE CASCADE,
    encargado_id INTEGER REFERENCES integrantes(id),
    descripcion TEXT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
);

-- Ejemplo de inserts para módulos
INSERT INTO modulos (nombre) VALUES ('limpieza'), ('eventos'), ('panel');

-- Usuario administrador: Romina Bautista Sanchez (contraseña en texto plano para pruebas)
INSERT INTO integrantes (
    nombre, apellido1, apellido2, semestre, carrera, celular, correo, usuario, contrasena
) VALUES (
    'Romina', 'Bautista', 'Sanchez', '8°', 'IPGI', '2761187303', 'romina.bautista@alumno.buap.mx', 'Romina',
    'EOR1107'
);
-- Reemplaza el hash por uno real en producción.

-- Eliminar usuario administrador de ejemplo si existe
SELECT * FROM integrantes WHERE usuario = 'Romina' AND contrasena = 'EOR1107';

SELECT * FROM areas;
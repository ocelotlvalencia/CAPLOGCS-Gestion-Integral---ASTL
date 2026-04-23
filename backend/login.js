

// backend/login.js
// Inicialización y configuración
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
app.use(cors());
app.use(express.json());

// --- ÁREAS: CRUD ---
app.get('/areas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM areas ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/areas', async (req, res) => {
  const { nombre, encargado_id, descripcion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO areas (nombre, encargado_id, descripcion) VALUES ($1, $2, $3) RETURNING *',
      [nombre, encargado_id, descripcion]
    );
    res.json({ success: true, area: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- LOGIN ---
app.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM integrantes WHERE usuario = $1 AND contrasena = $2',
      [usuario, contrasena]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- INTEGRANTES: CRUD ---
app.post('/integrantes', async (req, res) => {
  const { nombre, apellido1, apellido2, semestre, carrera, celular, correo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO integrantes (nombre, apellido1, apellido2, semestre, carrera, celular, correo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, apellido1, apellido2, semestre, carrera, celular, correo]
    );
    res.json({ success: true, integrante: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/integrantes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM integrantes ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/integrantes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM integrantes WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/integrantes/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido1, apellido2, semestre, carrera, celular, correo } = req.body;
  try {
    await pool.query(
      'UPDATE integrantes SET nombre = $1, apellido1 = $2, apellido2 = $3, semestre = $4, carrera = $5, celular = $6, correo = $7 WHERE id = $8',
      [nombre, apellido1, apellido2, semestre, carrera, celular, correo, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

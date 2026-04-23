// backend/db.js
// Conexión básica a PostgreSQL usando 'pg'

const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'caplogcs_user',
  password: 'caplogcs_pass',
  database: 'db_caplogcs',
});

module.exports = pool;

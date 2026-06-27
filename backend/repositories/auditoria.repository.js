import { pool } from '../config/db.js';

export const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM auditoria ORDER BY fecha_hora DESC'
  );
  return rows;
};

export const insert = (accion, id_usuario = null) => {
  pool.query(
    'INSERT INTO auditoria (accion, id_usuario) VALUES (?, ?)',
    [accion, id_usuario]
  ).catch((err) => console.error('[AUDITORIA ERROR]', err.message));
};

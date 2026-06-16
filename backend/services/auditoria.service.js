import { pool } from '../config/db.js';

export const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM auditoria ORDER BY fecha_hora DESC'
  );
  return rows;
};

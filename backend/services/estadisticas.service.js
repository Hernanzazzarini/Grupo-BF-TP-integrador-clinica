import { pool } from '../config/db.js';

export const getEstadisticas = async () => {
  const [rows] = await pool.query('CALL sp_estadisticas_atenciones()');
  return rows[0];
};

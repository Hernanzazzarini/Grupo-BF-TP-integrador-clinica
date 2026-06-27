import { pool } from '../config/db.js';

export const callEstadisticas = async () => {
  const [rows] = await pool.query('CALL sp_estadisticas_atenciones()');
  return rows[0];
};

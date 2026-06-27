import { pool } from '../config/db.js';

export const obtenerTurnosReporte = async () => {
  const [rows] = await pool.query('CALL sp_reporte_turnos()');
  return rows[0];
};

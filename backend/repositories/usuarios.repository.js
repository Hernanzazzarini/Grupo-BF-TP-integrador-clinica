import { pool } from '../config/db.js';

export const deactivate = async (id_usuario) => {
  await pool.query('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [id_usuario]);
};

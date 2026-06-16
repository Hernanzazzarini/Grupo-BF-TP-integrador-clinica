import { pool } from '../config/db.js';

export const registrarAccion = async (accion, id_usuario = null) => {
  await pool.query(
    'INSERT INTO auditoria (accion, id_usuario) VALUES (?, ?)',
    [accion, id_usuario]
  );
};

import { pool } from '../config/db.js';

export const registrarAccion = (accion, id_usuario = null) => {
  pool.query(
    'INSERT INTO auditoria (accion, id_usuario) VALUES (?, ?)',
    [accion, id_usuario]
  ).catch((err) => console.error('[AUDITORIA ERROR]', err.message));
};

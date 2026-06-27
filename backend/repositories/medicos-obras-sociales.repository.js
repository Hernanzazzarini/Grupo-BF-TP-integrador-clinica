import { pool } from '../config/db.js';

export const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM medicos_obras_sociales WHERE activo = 1');
  return rows;
};

export const insert = async ({ id_medico, id_obra_social }) => {
  const [result] = await pool.query(
    'INSERT INTO medicos_obras_sociales (id_medico, id_obra_social) VALUES (?,?)',
    [id_medico, id_obra_social]
  );
  return result.insertId;
};

export const updateById = async (id, { id_medico, id_obra_social }) => {
  const [result] = await pool.query(
    `UPDATE medicos_obras_sociales
     SET id_medico = ?, id_obra_social = ?
     WHERE id_medico_obra_social = ?`,
    [id_medico, id_obra_social, id]
  );
  return result.affectedRows;
};

export const deactivate = async (id) => {
  const [result] = await pool.query(
    'UPDATE medicos_obras_sociales SET activo = 0 WHERE id_medico_obra_social = ?',
    [id]
  );
  return result.affectedRows;
};

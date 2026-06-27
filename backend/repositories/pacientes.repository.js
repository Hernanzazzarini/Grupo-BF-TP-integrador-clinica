import { pool } from '../config/db.js';

export const findAll = async () => {
  const [rows] = await pool.query(`
    SELECT p.*
    FROM pacientes p
    JOIN usuarios u ON p.id_usuario = u.id_usuario
    WHERE u.activo = 1
  `);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query(`
    SELECT p.*
    FROM pacientes p
    JOIN usuarios u ON p.id_usuario = u.id_usuario
    WHERE p.id_paciente = ? AND u.activo = 1
  `, [id]);
  return rows[0] ?? null;
};

export const findByUsuario = async (id_usuario) => {
  const [rows] = await pool.query(
    'SELECT id_paciente, id_obra_social FROM pacientes WHERE id_usuario = ?',
    [id_usuario]
  );
  return rows[0] ?? null;
};

export const findObraSocialByPaciente = async (id_paciente) => {
  const [rows] = await pool.query(
    'SELECT id_obra_social FROM pacientes WHERE id_paciente = ?',
    [id_paciente]
  );
  return rows[0] ?? null;
};

export const insert = async ({ id_usuario, id_obra_social }) => {
  const [result] = await pool.query(
    'INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?,?)',
    [id_usuario, id_obra_social]
  );
  return result.insertId;
};

export const updateById = async (id, { id_usuario, id_obra_social }) => {
  const [result] = await pool.query(
    `UPDATE pacientes SET id_usuario = ?, id_obra_social = ? WHERE id_paciente = ?`,
    [id_usuario, id_obra_social, id]
  );
  return result.affectedRows;
};

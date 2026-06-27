import { pool } from '../config/db.js';

export const findAll = async () => {
  const [rows] = await pool.query(`
    SELECT m.*
    FROM medicos m
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    WHERE u.activo = 1
  `);
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query(`
    SELECT m.*
    FROM medicos m
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    WHERE m.id_medico = ? AND u.activo = 1
  `, [id]);
  return rows[0] ?? null;
};

export const findByEspecialidad = async (id_especialidad) => {
  const [rows] = await pool.query(`
    SELECT m.*
    FROM medicos m
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    WHERE m.id_especialidad = ? AND u.activo = 1
  `, [id_especialidad]);
  return rows;
};

export const insert = async ({ id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) => {
  const [result] = await pool.query(`
    INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
    VALUES (?,?,?,?,?)
  `, [id_usuario, id_especialidad, matricula, descripcion, valor_consulta]);
  return result.insertId;
};

export const updateById = async (id, { id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) => {
  const [result] = await pool.query(`
    UPDATE medicos
    SET id_usuario=?, id_especialidad=?, matricula=?, descripcion=?, valor_consulta=?
    WHERE id_medico=?
  `, [id_usuario, id_especialidad, matricula, descripcion, valor_consulta, id]);
  return result.affectedRows;
};

export const findUsuarioByMedico = async (id) => {
  const [rows] = await pool.query('SELECT id_usuario FROM medicos WHERE id_medico = ?', [id]);
  return rows[0] ?? null;
};

export const findValorConsulta = async (id_medico) => {
  const [rows] = await pool.query('SELECT valor_consulta FROM medicos WHERE id_medico = ?', [id_medico]);
  return rows[0] ?? null;
};

export const findIdByUsuario = async (id_usuario) => {
  const [rows] = await pool.query('SELECT id_medico FROM medicos WHERE id_usuario = ?', [id_usuario]);
  return rows[0] ?? null;
};

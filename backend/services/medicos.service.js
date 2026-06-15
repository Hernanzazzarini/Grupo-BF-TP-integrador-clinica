import { pool } from '../config/db.js';

export const getAll = async () => {
  const [rows] = await pool.query(`
    SELECT m.*
    FROM medicos m
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    WHERE u.activo = 1
  `);
  return rows;
};

export const getById = async (id) => {
  const [rows] = await pool.query(`
    SELECT m.*
    FROM medicos m
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    WHERE m.id_medico = ? AND u.activo = 1
  `, [id]);
  return rows[0] ?? null;
};

export const getByEspecialidad = async (id_especialidad) => {
  const [esp] = await pool.query(
    'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1',
    [id_especialidad]
  );
  if (esp.length === 0) return null;

  const [rows] = await pool.query(`
    SELECT m.*
    FROM medicos m
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    WHERE m.id_especialidad = ? AND u.activo = 1
  `, [id_especialidad]);
  return rows;
};

export const create = async ({ id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) => {
  const [result] = await pool.query(`
    INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
    VALUES (?,?,?,?,?)
  `, [id_usuario, id_especialidad, matricula, descripcion, valor_consulta]);
  return result.insertId;
};

export const update = async (id, { id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) => {
  const [result] = await pool.query(`
    UPDATE medicos
    SET id_usuario=?, id_especialidad=?, matricula=?, descripcion=?, valor_consulta=?
    WHERE id_medico=?
  `, [id_usuario, id_especialidad, matricula, descripcion, valor_consulta, id]);
  return result.affectedRows;
};

export const remove = async (id) => {
  const [medico] = await pool.query('SELECT id_usuario FROM medicos WHERE id_medico = ?', [id]);
  if (medico.length === 0) return false;
  await pool.query('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [medico[0].id_usuario]);
  return true;
};

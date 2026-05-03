//CRUD ESPECIALIDADES
//Usa poo.query()para consultar BD
//soft delete,No borra,solo activo=0,Cuando se realizan las consultas desde posman no aparece,pero desde la bd MYSQL existe pero como inactivo=0

import { pool } from '../config/db.js';


// LISTAR
export const getEspecialidades = async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM especialidades WHERE activo = 1'
  );
  res.json(rows);
};

// ✔ OBTENER UNA
export const getEspecialidad = async (req, res) => {
  const { id } = req.params;

  const [rows] = await pool.query(
    'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1',
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: 'No encontrada' });
  }

  res.json(rows[0]);
};


// CREAR
export const createEspecialidad = async (req, res) => {
  const { nombre } = req.body;

  const [result] = await pool.query(
    'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)',
    [nombre]
  );

  res.json({
    id: result.insertId,
    nombre
  });
};


// EDITAR
export const updateEspecialidad = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const [result] = await pool.query(
    'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?',
    [nombre, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'No encontrada' });
  }

  res.json({ message: 'Actualizada' });
};


// ✔ DELETE 
export const deleteEspecialidad = async (req, res) => {
  const { id } = req.params;

  const [result] = await pool.query(
    'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?',
    [id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'No encontrada' });
  }

  res.json({ message: 'Eliminada' });
};
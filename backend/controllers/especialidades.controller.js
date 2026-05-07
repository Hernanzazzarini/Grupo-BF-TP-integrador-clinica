import { pool } from '../config/db.js';

// BROWSE - LISTAR TODAS
export const getEspecialidades = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM especialidades WHERE activo = 1');
    res.status(200).json({ ok: true, data: rows });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener las especialidades' });
  }
};

// READ - OBTENER UNA
export const getEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Especialidad no encontrada' });
    }
    res.status(200).json({ ok: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al obtener la especialidad' });
  }
};

// ADD - CREAR
export const createEspecialidad = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query(
      'INSERT INTO especialidades (nombre, activo) VALUES (?, 1)',
      [nombre]
    );
    res.status(201).json({
      ok: true,
      data: { id: result.insertId, nombre },
      mensaje: 'Especialidad creada'
    });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al crear la especialidad' });
  }
};

// EDIT - ACTUALIZAR
export const updateEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const [result] = await pool.query(
      'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1',
      [nombre, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Especialidad no encontrada' });
    }
    res.status(200).json({ ok: true, mensaje: 'Especialidad actualizada' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar la especialidad' });
  }
};

// DELETE - BAJA LÓGICA
export const deleteEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Especialidad no encontrada' });
    }
    res.status(200).json({ ok: true, mensaje: 'Especialidad eliminada' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar la especialidad' });
  }
};

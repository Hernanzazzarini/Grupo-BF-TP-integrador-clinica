import { pool } from '../config/db.js';

export const getMedicosObrasSociales = async (req, res) => {

  const [rows] = await pool.query(`
    SELECT *
    FROM medicos_obras_sociales
    WHERE activo = 1
  `);

  res.json(rows);

};

export const createMedicoObraSocial = async (req, res) => {

  try {

    const {
      id_medico,
      id_obra_social
    } = req.body;

    const [result] = await pool.query(`
      INSERT INTO medicos_obras_sociales
      (
        id_medico,
        id_obra_social
      )
      VALUES (?,?)
    `,
    [
      id_medico,
      id_obra_social
    ]);

    res.status(201).json({
      id: result.insertId,
      message: 'Asociación creada correctamente'
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'La asociación ya existe'
      });
    }

    console.error(error);

    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

export const updateMedicoObraSocial = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      id_medico,
      id_obra_social
    } = req.body;

    const [result] = await pool.query(`
      UPDATE medicos_obras_sociales
      SET
        id_medico = ?,
        id_obra_social = ?
      WHERE id_medico_obra_social = ?
    `,
    [
      id_medico,
      id_obra_social,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Asociación no encontrada'
      });
    }

    res.json({
      message: 'Asociación actualizada correctamente'
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'La asociación ya existe'
      });
    }

    console.error(error);

    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

export const deleteMedicoObraSocial = async (req, res) => {

  const { id } = req.params;

  await pool.query(`
    UPDATE medicos_obras_sociales
    SET activo = 0
    WHERE id_medico_obra_social = ?
  `,[id]);

  res.json({
    message: 'Asociación eliminada correctamente'
  });

};
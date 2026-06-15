import { pool } from '../config/db.js';

export const getPacientes = async (req, res) => {

  const [rows] = await pool.query(`
    SELECT *
    FROM pacientes
  `);

  res.json(rows);
};

export const getPaciente = async (req, res) => {

  const { id } = req.params;

  const [rows] = await pool.query(`
    SELECT *
    FROM pacientes
    WHERE id_paciente = ?
  `,[id]);

  if(rows.length === 0){
    return res.status(404).json({
      message:'Paciente no encontrado'
    });
  }

  res.json(rows[0]);
};

export const createPaciente = async (req, res) => {

  try {

    const {
      id_usuario,
      id_obra_social
    } = req.body;

    const [result] = await pool.query(`
      INSERT INTO pacientes
      (
        id_usuario,
        id_obra_social
      )
      VALUES (?,?)
    `,
    [
      id_usuario,
      id_obra_social
    ]);

    res.status(201).json({
      id: result.insertId,
      message: 'Paciente creado correctamente'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:'Error interno del servidor'
    });
  }
};

export const updatePaciente = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      id_usuario,
      id_obra_social
    } = req.body;

    const [result] = await pool.query(`
      UPDATE pacientes
      SET
        id_usuario = ?,
        id_obra_social = ?
      WHERE id_paciente = ?
    `,
    [
      id_usuario,
      id_obra_social,
      id
    ]);

    if(result.affectedRows === 0){
      return res.status(404).json({
        message:'Paciente no encontrado'
      });
    }

    res.json({
      message:'Paciente actualizado correctamente'
    });

  } catch(error){

    console.error(error);

    res.status(500).json({
      message:'Error interno del servidor'
    });
  }
};
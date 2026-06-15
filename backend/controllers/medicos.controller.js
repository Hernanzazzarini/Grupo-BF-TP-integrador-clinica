import { pool } from '../config/db.js';

export const getMedicos = async (req, res) => {

  const [rows] = await pool.query(`
    SELECT *
    FROM medicos
  `);

  res.json(rows);

};

export const getMedico = async (req, res) => {

  const { id } = req.params;

  const [rows] = await pool.query(`
    SELECT *
    FROM medicos
    WHERE id_medico = ?
  `,[id]);

  if(rows.length === 0){
    return res.status(404).json({
      message:'Médico no encontrado'
    });
  }

  res.json(rows[0]);

};

export const createMedico = async (req, res) => {

  try {

    const {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    } = req.body;

    const [result] = await pool.query(`
      INSERT INTO medicos
      (
        id_usuario,
        id_especialidad,
        matricula,
        descripcion,
        valor_consulta
      )
      VALUES (?,?,?,?,?)
    `,
    [
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    ]);

    res.status(201).json({
      id: result.insertId,
      message: 'Médico creado correctamente'
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'La matrícula ya existe'
      });
    }

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: 'El usuario o la especialidad no existen'
      });
    }

    console.error(error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};



export const updateMedico = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta
    } = req.body;

    const [result] = await pool.query(`
      UPDATE medicos
      SET
        id_usuario=?,
        id_especialidad=?,
        matricula=?,
        descripcion=?,
        valor_consulta=?
      WHERE id_medico=?
    `,
    [
      id_usuario,
      id_especialidad,
      matricula,
      descripcion,
      valor_consulta,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Médico no encontrado'
      });
    }

    res.json({
      message: 'Médico actualizado correctamente'
    });

  } catch (error) {

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        message: 'La matrícula ya existe'
      });
    }

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: 'El usuario o la especialidad no existen'
      });
    }

    console.error(error);

    return res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};

export const deleteMedico = async (req,res) => {

  const { id } = req.params;

  await pool.query(`
    DELETE FROM medicos
    WHERE id_medico = ?
  `,[id]);

  res.json({
    message:'Médico eliminado correctamente'
  });

};

export const getMedicosPorEspecialidad = async (req, res) => {

  const { id } = req.params;

  const [especialidad] = await pool.query(`
    SELECT *
    FROM especialidades
    WHERE id_especialidad = ?
      AND activo = 1
  `,[id]);

  if (especialidad.length === 0) {
    return res.status(404).json({
      message: 'Especialidad no encontrada'
    });
  }

  const [medicos] = await pool.query(`
    SELECT *
    FROM medicos
    WHERE id_especialidad = ?
  `,[id]);

  if (medicos.length === 0) {
    return res.status(404).json({
      message: 'No existen médicos asociados a esta especialidad'
    });
  }

  res.json(medicos);

};
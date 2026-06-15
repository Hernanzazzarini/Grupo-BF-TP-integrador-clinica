import { pool } from '../config/db.js';

export const getTurnos = async (req, res) => {

  const [rows] = await pool.query(`
    SELECT *
    FROM turnos_reservas
    WHERE activo = 1
  `);

  res.json(rows);

};

export const createTurno = async (req, res) => {

  try {

    const {
      id_medico,
      id_paciente,
      fecha_hora
    } = req.body;

    // Obtener obra social del paciente

    const [paciente] = await pool.query(`
      SELECT id_obra_social
      FROM pacientes
      WHERE id_paciente = ?
    `,[id_paciente]);

    if (paciente.length === 0) {
      return res.status(404).json({
        message:'Paciente no encontrado'
      });
    }

    const id_obra_social = paciente[0].id_obra_social;

    // Obtener valor consulta

    const [medico] = await pool.query(`
      SELECT valor_consulta
      FROM medicos
      WHERE id_medico = ?
    `,[id_medico]);

    if (medico.length === 0) {
      return res.status(404).json({
        message:'Médico no encontrado'
      });
    }

    const valorConsulta = medico[0].valor_consulta;

    // Obtener descuento

    const [obra] = await pool.query(`
      SELECT
        porcentaje_descuento,
        es_particular
      FROM obras_sociales
      WHERE id_obra_social = ?
    `,[id_obra_social]);

    const porcentaje = obra[0].porcentaje_descuento;
    const esParticular = obra[0].es_particular;

    let valorTotal;

    if (esParticular === 1) {

      valorTotal = valorConsulta;

    } else {

      valorTotal =
        valorConsulta -
        ((porcentaje / 100) * valorConsulta);

    }

    const [result] = await pool.query(`
      INSERT INTO turnos_reservas
      (
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido
      )
      VALUES (?,?,?,?,?,0)
    `,
    [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valorTotal
    ]);

    res.status(201).json({
      id: result.insertId,
      valor_total: valorTotal,
      message:'Turno registrado correctamente'
    });

  } catch(error){

    console.error(error);

    res.status(500).json({
      message:'Error interno del servidor'
    });
  }
};


export const getMisTurnosMedico = async (req, res) => {

  try {

    const id_usuario = req.usuario.id_usuario;

    const [medico] = await pool.query(`
      SELECT id_medico
      FROM medicos
      WHERE id_usuario = ?
    `,[id_usuario]);

    if (medico.length === 0) {
      return res.status(404).json({
        message: 'Médico no encontrado'
      });
    }

    const [turnos] = await pool.query(`
      SELECT *
      FROM turnos_reservas
      WHERE id_medico = ?
      AND activo = 1
    `,[medico[0].id_medico]);

    res.json(turnos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:'Error interno del servidor'
    });
  }
};

export const marcarAtendido = async (req, res) => {

  const { id } = req.params;

  const [result] = await pool.query(`
    UPDATE turnos_reservas
    SET atentido = 1
    WHERE id_turno_reserva = ?
      AND activo = 1
  `,[id]);

  if(result.affectedRows === 0){
    return res.status(404).json({
      message:'Turno no encontrado'
    });
  }

  res.json({
    message:'Turno marcado como atendido'
  });

};

export const getMisTurnosPaciente = async (req, res) => {

  try {

    const id_usuario = req.usuario.id_usuario;

    const [paciente] = await pool.query(`
      SELECT id_paciente
      FROM pacientes
      WHERE id_usuario = ?
    `,[id_usuario]);

    if (paciente.length === 0) {
      return res.status(404).json({
        message: 'Paciente no encontrado'
      });
    }

    const [turnos] = await pool.query(`
      SELECT *
      FROM turnos_reservas
      WHERE id_paciente = ?
      AND activo = 1
    `,[paciente[0].id_paciente]);

    res.json(turnos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:'Error interno del servidor'
    });
  }
};
export const reservarTurnoPaciente = async (req, res) => {

  try {

    const { id_medico, fecha_hora } = req.body;

    const id_usuario = req.usuario.id_usuario;

    const [paciente] = await pool.query(`
      SELECT
        id_paciente,
        id_obra_social
      FROM pacientes
      WHERE id_usuario = ?
    `,[id_usuario]);

    if (paciente.length === 0) {
      return res.status(404).json({
        message: 'Paciente no encontrado'
      });
    }

    const id_paciente = paciente[0].id_paciente;
    const id_obra_social = paciente[0].id_obra_social;

    const [medico] = await pool.query(`
      SELECT valor_consulta
      FROM medicos
      WHERE id_medico = ?
    `,[id_medico]);

    if (medico.length === 0) {
      return res.status(404).json({
        message: 'Médico no encontrado'
      });
    }

    const valorConsulta = medico[0].valor_consulta;

    const [obra] = await pool.query(`
      SELECT
        porcentaje_descuento,
        es_particular
      FROM obras_sociales
      WHERE id_obra_social = ?
    `,[id_obra_social]);

    let valorTotal;

    if (obra[0].es_particular === 1) {

      valorTotal = valorConsulta;

    } else {

      valorTotal =
        valorConsulta -
        ((obra[0].porcentaje_descuento / 100) * valorConsulta);

    }

    const [result] = await pool.query(`
      INSERT INTO turnos_reservas
      (
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido
      )
      VALUES (?,?,?,?,?,0)
    `,
    [
      id_medico,
      id_paciente,
      id_obra_social,
      fecha_hora,
      valorTotal
    ]);

    res.status(201).json({
      id: result.insertId,
      valor_total: valorTotal,
      message: 'Turno reservado correctamente'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
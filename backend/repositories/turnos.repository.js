import { pool } from '../config/db.js';

export const findAll = async () => {
  const [rows] = await pool.query('SELECT * FROM turnos_reservas WHERE activo = 1');
  return rows;
};

export const insert = async (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total) => {
  const [result] = await pool.query(
    'INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido) VALUES (?,?,?,?,?,0)',
    [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total]
  );
  return result.insertId;
};

export const findByMedico = async (id_medico) => {
  const [rows] = await pool.query(
    'SELECT * FROM turnos_reservas WHERE id_medico = ? AND activo = 1',
    [id_medico]
  );
  return rows;
};

export const findByPaciente = async (id_paciente) => {
  const [rows] = await pool.query(
    'SELECT * FROM turnos_reservas WHERE id_paciente = ? AND activo = 1',
    [id_paciente]
  );
  return rows;
};

export const updateAtendido = async (id) => {
  const [result] = await pool.query(
    'UPDATE turnos_reservas SET atentido = 1 WHERE id_turno_reserva = ? AND activo = 1',
    [id]
  );
  return result.affectedRows;
};

import { pool } from '../config/db.js';

const calcularValorTotal = async (id_medico, id_obra_social) => {
  const [medico] = await pool.query('SELECT valor_consulta FROM medicos WHERE id_medico = ?', [id_medico]);
  if (medico.length === 0) return null;

  const [obra] = await pool.query(
    'SELECT porcentaje_descuento, es_particular FROM obras_sociales WHERE id_obra_social = ?',
    [id_obra_social]
  );
  if (obra.length === 0) return null;

  const valorConsulta = parseFloat(medico[0].valor_consulta);
  const { porcentaje_descuento, es_particular } = obra[0];

  return es_particular === 1
    ? valorConsulta
    : valorConsulta - (porcentaje_descuento / 100) * valorConsulta;
};

export const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM turnos_reservas WHERE activo = 1');
  return rows;
};

export const create = async ({ id_medico, id_paciente, fecha_hora }) => {
  const [paciente] = await pool.query('SELECT id_obra_social FROM pacientes WHERE id_paciente = ?', [id_paciente]);
  if (paciente.length === 0) return { error: 'paciente_not_found' };

  const id_obra_social = paciente[0].id_obra_social;
  const valorTotal = await calcularValorTotal(id_medico, id_obra_social);
  if (valorTotal === null) return { error: 'medico_not_found' };

  const [result] = await pool.query(
    'INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido) VALUES (?,?,?,?,?,0)',
    [id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal]
  );
  return { insertId: result.insertId, valorTotal };
};

export const reservar = async (id_usuario, { id_medico, fecha_hora }) => {
  const [paciente] = await pool.query(
    'SELECT id_paciente, id_obra_social FROM pacientes WHERE id_usuario = ?',
    [id_usuario]
  );
  if (paciente.length === 0) return { error: 'paciente_not_found' };

  const { id_paciente, id_obra_social } = paciente[0];
  const valorTotal = await calcularValorTotal(id_medico, id_obra_social);
  if (valorTotal === null) return { error: 'medico_not_found' };

  const [result] = await pool.query(
    'INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido) VALUES (?,?,?,?,?,0)',
    [id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal]
  );
  return { insertId: result.insertId, valorTotal };
};

export const getMisTurnosMedico = async (id_usuario) => {
  const [medico] = await pool.query('SELECT id_medico FROM medicos WHERE id_usuario = ?', [id_usuario]);
  if (medico.length === 0) return null;

  const [rows] = await pool.query(
    'SELECT * FROM turnos_reservas WHERE id_medico = ? AND activo = 1',
    [medico[0].id_medico]
  );
  return rows;
};

export const getMisTurnosPaciente = async (id_usuario) => {
  const [paciente] = await pool.query('SELECT id_paciente FROM pacientes WHERE id_usuario = ?', [id_usuario]);
  if (paciente.length === 0) return null;

  const [rows] = await pool.query(
    'SELECT * FROM turnos_reservas WHERE id_paciente = ? AND activo = 1',
    [paciente[0].id_paciente]
  );
  return rows;
};

export const marcarAtendido = async (id) => {
  const [result] = await pool.query(
    'UPDATE turnos_reservas SET atentido = 1 WHERE id_turno_reserva = ? AND activo = 1',
    [id]
  );
  return result.affectedRows;
};

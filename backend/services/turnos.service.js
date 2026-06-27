import * as TurnosRepository from '../repositories/turnos.repository.js';
import * as MedicosRepository from '../repositories/medicos.repository.js';
import * as ObrasSocialesRepository from '../repositories/obras-sociales.repository.js';
import * as PacientesRepository from '../repositories/pacientes.repository.js';

const calcularValorTotal = async (id_medico, id_obra_social) => {
  const medico = await MedicosRepository.findValorConsulta(id_medico);
  if (!medico) return null;

  const obra = await ObrasSocialesRepository.findDescuentoById(id_obra_social);
  if (!obra) return null;

  const valorConsulta = parseFloat(medico.valor_consulta);
  const { porcentaje_descuento, es_particular } = obra;

  return es_particular === 1
    ? valorConsulta
    : valorConsulta - (porcentaje_descuento / 100) * valorConsulta;
};

export const getAll = () => TurnosRepository.findAll();

export const create = async ({ id_medico, id_paciente, fecha_hora }) => {
  const paciente = await PacientesRepository.findObraSocialByPaciente(id_paciente);
  if (!paciente) return { error: 'paciente_not_found' };

  const id_obra_social = paciente.id_obra_social;
  const valorTotal = await calcularValorTotal(id_medico, id_obra_social);
  if (valorTotal === null) return { error: 'medico_not_found' };

  const insertId = await TurnosRepository.insert(id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal);
  return { insertId, valorTotal };
};

export const reservar = async (id_usuario, { id_medico, fecha_hora }) => {
  const paciente = await PacientesRepository.findByUsuario(id_usuario);
  if (!paciente) return { error: 'paciente_not_found' };

  const { id_paciente, id_obra_social } = paciente;
  const valorTotal = await calcularValorTotal(id_medico, id_obra_social);
  if (valorTotal === null) return { error: 'medico_not_found' };

  const insertId = await TurnosRepository.insert(id_medico, id_paciente, id_obra_social, fecha_hora, valorTotal);
  return { insertId, valorTotal };
};

export const getMisTurnosMedico = async (id_usuario) => {
  const medico = await MedicosRepository.findIdByUsuario(id_usuario);
  if (!medico) return null;
  return TurnosRepository.findByMedico(medico.id_medico);
};

export const getMisTurnosPaciente = async (id_usuario) => {
  const paciente = await PacientesRepository.findByUsuario(id_usuario);
  if (!paciente) return null;
  return TurnosRepository.findByPaciente(paciente.id_paciente);
};

export const marcarAtendido = (id) => TurnosRepository.updateAtendido(id);

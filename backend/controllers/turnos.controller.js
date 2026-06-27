import * as TurnosService from '../services/turnos.service.js';
import { registrarAccion } from '../utils/logger.js';

export const getTurnos = async (req, res) => {
  try {
    const data = await TurnosService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createTurno = async (req, res) => {
  try {
    const result = await TurnosService.create(req.body);
    if (result.error === 'paciente_not_found') return res.status(404).json({ message: 'Paciente no encontrado' });
    if (result.error === 'medico_not_found') return res.status(404).json({ message: 'Médico no encontrado' });
    registrarAccion('CREAR_TURNO_ADMIN', req.usuario?.id_usuario);
    res.status(201).json({ id: result.insertId, valor_total: result.valorTotal, message: 'Turno registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const reservarTurnoPaciente = async (req, res) => {
  try {
    const result = await TurnosService.reservar(req.usuario.id_usuario, req.body);
    if (result.error === 'paciente_not_found') return res.status(404).json({ message: 'Paciente no encontrado' });
    if (result.error === 'medico_not_found') return res.status(404).json({ message: 'Médico no encontrado' });
    registrarAccion('RESERVAR_TURNO_PACIENTE', req.usuario.id_usuario);
    res.status(201).json({ id: result.insertId, valor_total: result.valorTotal, message: 'Turno reservado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getMisTurnosMedico = async (req, res) => {
  try {
    const data = await TurnosService.getMisTurnosMedico(req.usuario.id_usuario);
    if (!data) return res.status(404).json({ message: 'Médico no encontrado' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getMisTurnosPaciente = async (req, res) => {
  try {
    const data = await TurnosService.getMisTurnosPaciente(req.usuario.id_usuario);
    if (!data) return res.status(404).json({ message: 'Paciente no encontrado' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const marcarAtendido = async (req, res) => {
  try {
    const affected = await TurnosService.marcarAtendido(req.params.id);
    if (!affected) return res.status(404).json({ message: 'Turno no encontrado' });
    registrarAccion('TURNO_ATENDIDO', req.usuario?.id_usuario);
    res.json({ message: 'Turno marcado como atendido' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

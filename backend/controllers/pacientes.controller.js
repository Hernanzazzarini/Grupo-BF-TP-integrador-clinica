import * as PacientesService from '../services/pacientes.service.js';

export const getPacientes = async (req, res) => {
  try {
    const data = await PacientesService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getPaciente = async (req, res) => {
  try {
    const data = await PacientesService.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Paciente no encontrado' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createPaciente = async (req, res) => {
  try {
    const id = await PacientesService.create(req.body);
    res.status(201).json({ id, message: 'Paciente creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const affected = await PacientesService.update(req.params.id, req.body);
    if (!affected) return res.status(404).json({ message: 'Paciente no encontrado' });
    res.json({ message: 'Paciente actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

import * as MedicosService from '../services/medicos.service.js';

export const getMedicos = async (req, res) => {
  try {
    const data = await MedicosService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getMedico = async (req, res) => {
  try {
    const data = await MedicosService.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Médico no encontrado' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getMedicosPorEspecialidad = async (req, res) => {
  try {
    const data = await MedicosService.getByEspecialidad(req.params.id);
    if (data === null) return res.status(404).json({ message: 'Especialidad no encontrada' });
    if (data.length === 0) return res.status(404).json({ message: 'No existen médicos asociados a esta especialidad' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createMedico = async (req, res) => {
  try {
    const id = await MedicosService.create(req.body);
    res.status(201).json({ id, message: 'Médico creado correctamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'La matrícula ya existe' });
    if (error.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ message: 'El usuario o la especialidad no existen' });
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateMedico = async (req, res) => {
  try {
    const affected = await MedicosService.update(req.params.id, req.body);
    if (!affected) return res.status(404).json({ message: 'Médico no encontrado' });
    res.json({ message: 'Médico actualizado correctamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'La matrícula ya existe' });
    if (error.code === 'ER_NO_REFERENCED_ROW_2') return res.status(400).json({ message: 'El usuario o la especialidad no existen' });
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteMedico = async (req, res) => {
  try {
    const ok = await MedicosService.remove(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Médico no encontrado' });
    res.json({ message: 'Médico eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

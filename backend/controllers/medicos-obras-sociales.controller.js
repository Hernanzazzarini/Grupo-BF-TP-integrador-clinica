import * as MedicosObrasSocialesService from '../services/medicos-obras-sociales.service.js';

export const getMedicosObrasSociales = async (req, res) => {
  try {
    const data = await MedicosObrasSocialesService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createMedicoObraSocial = async (req, res) => {
  try {
    const id = await MedicosObrasSocialesService.create(req.body);
    res.status(201).json({ id, message: 'Asociación creada correctamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'La asociación ya existe' });
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateMedicoObraSocial = async (req, res) => {
  try {
    const affected = await MedicosObrasSocialesService.update(req.params.id, req.body);
    if (!affected) return res.status(404).json({ message: 'Asociación no encontrada' });
    res.json({ message: 'Asociación actualizada correctamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'La asociación ya existe' });
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteMedicoObraSocial = async (req, res) => {
  try {
    await MedicosObrasSocialesService.remove(req.params.id);
    res.json({ message: 'Asociación eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

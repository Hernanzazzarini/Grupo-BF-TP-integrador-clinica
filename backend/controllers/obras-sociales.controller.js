import * as ObrasSocialesService from '../services/obras-sociales.service.js';

export const getObrasSociales = async (req, res) => {
  try {
    const data = await ObrasSocialesService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getObraSocial = async (req, res) => {
  try {
    const data = await ObrasSocialesService.getById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Obra social no encontrada' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createObraSocial = async (req, res) => {
  try {
    const id = await ObrasSocialesService.create(req.body);
    res.status(201).json({ id, message: 'Obra social creada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateObraSocial = async (req, res) => {
  try {
    const affected = await ObrasSocialesService.update(req.params.id, req.body);
    if (!affected) return res.status(404).json({ message: 'Obra social no encontrada' });
    res.json({ message: 'Obra social actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteObraSocial = async (req, res) => {
  try {
    await ObrasSocialesService.remove(req.params.id);
    res.json({ message: 'Obra social eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

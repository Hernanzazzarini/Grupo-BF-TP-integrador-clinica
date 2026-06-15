import * as EspecialidadesService from '../services/especialidades.service.js';

export const getEspecialidades = async (req, res) => {
  try {
    const data = await EspecialidadesService.getAll();
    res.json({ ok: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al obtener las especialidades' });
  }
};

export const getEspecialidad = async (req, res) => {
  try {
    const data = await EspecialidadesService.getById(req.params.id);
    if (!data) return res.status(404).json({ ok: false, mensaje: 'Especialidad no encontrada' });
    res.json({ ok: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al obtener la especialidad' });
  }
};

export const createEspecialidad = async (req, res) => {
  try {
    const { nombre } = req.body;
    const id = await EspecialidadesService.create(nombre);
    res.status(201).json({ ok: true, data: { id, nombre }, mensaje: 'Especialidad creada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al crear la especialidad' });
  }
};

export const updateEspecialidad = async (req, res) => {
  try {
    const affected = await EspecialidadesService.update(req.params.id, req.body.nombre);
    if (!affected) return res.status(404).json({ ok: false, mensaje: 'Especialidad no encontrada' });
    res.json({ ok: true, mensaje: 'Especialidad actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar la especialidad' });
  }
};

export const deleteEspecialidad = async (req, res) => {
  try {
    const affected = await EspecialidadesService.remove(req.params.id);
    if (!affected) return res.status(404).json({ ok: false, mensaje: 'Especialidad no encontrada' });
    res.json({ ok: true, mensaje: 'Especialidad eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar la especialidad' });
  }
};

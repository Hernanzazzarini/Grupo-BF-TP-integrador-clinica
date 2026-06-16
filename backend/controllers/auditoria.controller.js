import * as AuditoriaService from '../services/auditoria.service.js';

export const getAuditoria = async (req, res) => {
  try {
    const data = await AuditoriaService.getAll();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

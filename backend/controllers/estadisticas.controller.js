import * as EstadisticasService from '../services/estadisticas.service.js';

export const getEstadisticas = async (req, res) => {
  try {
    const data = await EstadisticasService.getEstadisticas();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

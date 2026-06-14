import { pool } from '../config/db.js';

export const getEstadisticas = async (req, res) => {

  try {
    
    const [rows] = await pool.query(
      'CALL sp_estadisticas_atenciones()'
    );

    res.json(rows[0][0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
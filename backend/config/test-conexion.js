//Se verifica conexion a BD
import { pool } from './db.js';

export const testConexion = async () => {
  try {
    const [rows] = await pool.query('SELECT DATABASE() as db');

    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().split(' ')[0];

    console.log('✅ BD conectada:', rows[0].db);
    console.log('🕒 Fecha:', fecha);
    console.log('⏰ Hora:', hora);

  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
};
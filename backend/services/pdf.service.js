import { pool } from '../config/db.js';

export const getTurnosParaReporte = async () => {
  const [turnos] = await pool.query(`
    SELECT
      tr.id_turno_reserva,
      tr.fecha_hora,
      tr.valor_total,
      tr.atentido,
      CONCAT(up.apellido, ', ', up.nombres) AS paciente,
      CONCAT(um.apellido, ', ', um.nombres) AS medico,
      e.nombre                              AS especialidad,
      os.nombre                             AS obra_social
    FROM turnos_reservas tr
    JOIN pacientes   p  ON tr.id_paciente    = p.id_paciente
    JOIN usuarios   up  ON p.id_usuario      = up.id_usuario
    JOIN medicos     m  ON tr.id_medico      = m.id_medico
    JOIN usuarios   um  ON m.id_usuario      = um.id_usuario
    JOIN especialidades e  ON m.id_especialidad = e.id_especialidad
    JOIN obras_sociales os ON tr.id_obra_social  = os.id_obra_social
    WHERE tr.activo = 1
    ORDER BY tr.fecha_hora DESC
  `);
  return turnos;
};

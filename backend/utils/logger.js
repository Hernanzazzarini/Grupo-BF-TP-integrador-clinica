import * as AuditoriaRepository from '../repositories/auditoria.repository.js';

export const registrarAccion = (accion, id_usuario = null) => {
  console.log(`[AUDITORIA] ${accion} | usuario: ${id_usuario ?? 'anonimo'}`);
  AuditoriaRepository.insert(accion, id_usuario);
};

import * as AuditoriaRepository from '../repositories/auditoria.repository.js';

export const registrarAccion = (accion, id_usuario = null) => {
  AuditoriaRepository.insert(accion, id_usuario);
};

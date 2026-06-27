import * as AuditoriaRepository from '../repositories/auditoria.repository.js';

export const getAll = () => AuditoriaRepository.findAll();

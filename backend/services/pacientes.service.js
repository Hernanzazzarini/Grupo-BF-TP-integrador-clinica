import * as PacientesRepository from '../repositories/pacientes.repository.js';

export const getAll = () => PacientesRepository.findAll();
export const getById = (id) => PacientesRepository.findById(id);
export const create = (data) => PacientesRepository.insert(data);
export const update = (id, data) => PacientesRepository.updateById(id, data);

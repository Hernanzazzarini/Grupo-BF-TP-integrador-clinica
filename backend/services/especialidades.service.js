import * as EspecialidadesRepository from '../repositories/especialidades.repository.js';

export const getAll = () => EspecialidadesRepository.findAll();
export const getById = (id) => EspecialidadesRepository.findById(id);
export const create = (nombre) => EspecialidadesRepository.insert(nombre);
export const update = (id, nombre) => EspecialidadesRepository.updateById(id, nombre);
export const remove = (id) => EspecialidadesRepository.deactivate(id);

import * as ObrasSocialesRepository from '../repositories/obras-sociales.repository.js';

export const getAll = () => ObrasSocialesRepository.findAll();
export const getById = (id) => ObrasSocialesRepository.findById(id);
export const create = (data) => ObrasSocialesRepository.insert(data);
export const update = (id, data) => ObrasSocialesRepository.updateById(id, data);
export const remove = (id) => ObrasSocialesRepository.deactivate(id);

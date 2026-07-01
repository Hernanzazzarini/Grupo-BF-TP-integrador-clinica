import * as MedicosObrasSocialesRepository from '../repositories/medicos-obras-sociales.repository.js';

export const getAll = () => MedicosObrasSocialesRepository.findAll();
export const create = (data) => MedicosObrasSocialesRepository.insert(data);
export const update = (id, data) => MedicosObrasSocialesRepository.updateById(id, data);
export const remove = (id) => MedicosObrasSocialesRepository.deactivate(id);

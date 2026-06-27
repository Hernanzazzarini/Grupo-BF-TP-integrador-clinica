import * as MedicosRepository from '../repositories/medicos.repository.js';
import * as EspecialidadesRepository from '../repositories/especialidades.repository.js';
import * as UsuariosRepository from '../repositories/usuarios.repository.js';

export const getAll = () => MedicosRepository.findAll();

export const getById = (id) => MedicosRepository.findById(id);

export const getByEspecialidad = async (id_especialidad) => {
  const esp = await EspecialidadesRepository.findById(id_especialidad);
  if (!esp) return null;
  return MedicosRepository.findByEspecialidad(id_especialidad);
};

export const create = (data) => MedicosRepository.insert(data);

export const update = (id, data) => MedicosRepository.updateById(id, data);

export const remove = async (id) => {
  const medico = await MedicosRepository.findUsuarioByMedico(id);
  if (!medico) return false;
  await UsuariosRepository.deactivate(medico.id_usuario);
  return true;
};

//Define los endpoints

import { validarEspecialidad } from '../../middlewares/especialidades.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';
import { Router } from 'express';
import {
  getEspecialidades,
  getEspecialidad,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad
} from '../../controllers/especialidades.controller.js';

const router = Router();

router.get('/', getEspecialidades);
router.get('/:id', getEspecialidad);
router.post('/',validarEspecialidad,validarCampos,createEspecialidad);
router.put('/:id',validarEspecialidad,validarCampos,updateEspecialidad);
router.delete('/:id', deleteEspecialidad);

export default router;
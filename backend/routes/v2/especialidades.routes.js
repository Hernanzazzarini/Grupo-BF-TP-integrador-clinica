//Define los endpoints

import { validarEspecialidad } from '../../middlewares/especialidades.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';
import { Router } from 'express';
import { validarJWT } from '../../middlewares/validar-jwt.js';
import {
  getEspecialidades,
  getEspecialidad,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad
} from '../../controllers/especialidades.controller.js';

const router = Router();

router.get(
  '/',
  validarJWT,
  getEspecialidades
);

router.get(
  '/:id',
  validarJWT,
  getEspecialidad
);

router.post(
  '/',
  validarJWT,
  validarEspecialidad,
  validarCampos,
  createEspecialidad
);

router.put(
  '/:id',
  validarJWT,
  validarEspecialidad,
  validarCampos,
  updateEspecialidad
);

router.delete(
  '/:id',
  validarJWT,
  deleteEspecialidad
);

export default router;
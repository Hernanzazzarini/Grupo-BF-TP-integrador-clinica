//Define los endpoints

import { validarEspecialidad } from '../../middlewares/especialidades.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';
import { Router } from 'express';
import { param } from 'express-validator';
import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';
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
  tieneRol( 2, 3),
  getEspecialidades
);

router.get(
  '/:id',
  validarJWT,
  tieneRol( 2, 3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarCampos,
  getEspecialidad
);

router.post(
  '/',
  validarJWT,
  tieneRol(3),
  validarEspecialidad,
  validarCampos,
  createEspecialidad
);

router.put(
  '/:id',
  validarJWT,
  tieneRol(3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarEspecialidad,
  validarCampos,
  updateEspecialidad
);

router.delete(
  '/:id',
  validarJWT,
  tieneRol(3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarCampos,
  deleteEspecialidad
);

export default router;
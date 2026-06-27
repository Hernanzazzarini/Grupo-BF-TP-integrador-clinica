import { Router } from 'express';
import { param } from 'express-validator';

import {
  getPacientes,
  getPaciente,
  createPaciente,
  updatePaciente
} from '../../controllers/pacientes.controller.js';

import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

import { validarPaciente } from '../../middlewares/pacientes.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';

const router = Router();

router.get(
  '/',
  validarJWT,
  tieneRol(3),
  getPacientes
);

router.get(
  '/:id',
  validarJWT,
  tieneRol(3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarCampos,
  getPaciente
);

router.post(
  '/',
  validarJWT,
  tieneRol(3),
  validarPaciente,
  validarCampos,
  createPaciente
);

router.put(
  '/:id',
  validarJWT,
  tieneRol(3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarPaciente,
  validarCampos,
  updatePaciente
);

export default router;
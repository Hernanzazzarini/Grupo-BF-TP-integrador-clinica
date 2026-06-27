import { Router } from 'express';
import { param } from 'express-validator';

import {
  getMedicos,
  getMedico,
  createMedico,
  updateMedico,
  deleteMedico,
  getMedicosPorEspecialidad
} from '../../controllers/medicos.controller.js';

import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

import { validarMedico } from '../../middlewares/medicos.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';

const router = Router();

router.get(
  '/',
  validarJWT,
  tieneRol(2, 3),
  getMedicos
);

router.get(
  '/especialidad/:id',
  validarJWT,
  tieneRol(2),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarCampos,
  getMedicosPorEspecialidad
);

router.get(
  '/:id',
  validarJWT,
  tieneRol(2, 3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarCampos,
  getMedico
);

router.post(
  '/',
  validarJWT,
  tieneRol(3),
  validarMedico,
  validarCampos,
  createMedico
);

router.put(
  '/:id',
  validarJWT,
  tieneRol(3),
  validarMedico,
  validarCampos,
  updateMedico
);

router.delete(
  '/:id',
  validarJWT,
  tieneRol(3),
  deleteMedico
);

export default router;
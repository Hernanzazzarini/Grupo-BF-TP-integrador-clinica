import { Router } from 'express';
import { param } from 'express-validator';

import {
  getObrasSociales,
  getObraSocial,
  createObraSocial,
  updateObraSocial,
  deleteObraSocial
} from '../../controllers/obras-sociales.controller.js';

import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

import { validarObraSocial } from '../../middlewares/obras-sociales.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';

const router = Router();

router.get(
  '/',
  validarJWT,
  tieneRol(3),
  getObrasSociales
);

router.get(
  '/:id',
  validarJWT,
  tieneRol(3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarCampos,
  getObraSocial
);

router.post(
  '/',
  validarJWT,
  tieneRol(3),
  validarObraSocial,
  validarCampos,
  createObraSocial
);

router.put(
  '/:id',
  validarJWT,
  tieneRol(3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarObraSocial,
  validarCampos,
  updateObraSocial
);

router.delete(
  '/:id',
  validarJWT,
  tieneRol(3),
  param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  validarCampos,
  deleteObraSocial
);

export default router;
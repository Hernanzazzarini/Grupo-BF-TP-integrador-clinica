import { Router } from 'express';

import {
  getMedicosObrasSociales,
  createMedicoObraSocial,
  deleteMedicoObraSocial
} from '../../controllers/medicos-obras-sociales.controller.js';

import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

import { validarMedicoObraSocial } from '../../middlewares/medicos-obras-sociales.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';

const router = Router();

router.get(
  '/',
  validarJWT,
  tieneRol(3),
  getMedicosObrasSociales
);

router.post(
  '/',
  validarJWT,
  tieneRol(3),
  validarMedicoObraSocial,
  validarCampos,
  createMedicoObraSocial
);

router.delete(
  '/:id',
  validarJWT,
  tieneRol(3),
  deleteMedicoObraSocial
);

export default router;
import { Router } from 'express';

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
  validarPaciente,
  validarCampos,
  updatePaciente
);

export default router;
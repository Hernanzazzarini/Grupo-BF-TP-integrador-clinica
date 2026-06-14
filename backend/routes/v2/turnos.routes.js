import { Router } from 'express';

import {
  getTurnos,
  createTurno,
  getMisTurnosMedico,
  marcarAtendido,
  getMisTurnosPaciente
  
} from '../../controllers/turnos.controller.js';

import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

import { validarTurno } from '../../middlewares/turnos.validator.js';
import { validarCampos } from '../../middlewares/validar-campos.js';

const router = Router();

router.get(
  '/',
  validarJWT,
  tieneRol(3),
  getTurnos
);

router.post(
  '/',
  validarJWT,
  tieneRol(3),
  validarTurno,
  validarCampos,
  createTurno
);

router.get(
  '/mis-turnos-medico',
  validarJWT,
  tieneRol(1),
  getMisTurnosMedico
);
router.get(
  '/mis-turnos-paciente',
  validarJWT,
  tieneRol(2),
  getMisTurnosPaciente
);


router.put(
  '/:id/atendido',
  validarJWT,
  tieneRol(1),
  marcarAtendido
);

export default router;
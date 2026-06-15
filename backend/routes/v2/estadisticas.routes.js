import { Router } from 'express';

import { getEstadisticas } from '../../controllers/estadisticas.controller.js';

import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

const router = Router();

router.get(
  '/',
  validarJWT,
  tieneRol(3),
  getEstadisticas
);

export default router;
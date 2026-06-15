import { Router } from 'express';
import { generarReporteTurnos } from '../../controllers/pdf.controller.js';
import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

const router = Router();

router.get(
  '/turnos',
  validarJWT,
  tieneRol(3),
  generarReporteTurnos
);

export default router;

import { Router } from 'express';
import { getAuditoria } from '../../controllers/auditoria.controller.js';
import { validarJWT } from '../../middlewares/validar-jwt.js';
import { tieneRol } from '../../middlewares/validar-rol.js';

const router = Router();

router.get('/', validarJWT, tieneRol(3), getAuditoria);

export default router;

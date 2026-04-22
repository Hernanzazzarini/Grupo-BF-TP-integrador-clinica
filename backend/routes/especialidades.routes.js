import { Router } from 'express';
import {
  getEspecialidades,
  getEspecialidad,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad
} from '../controllers/especialidades.controller.js';

const router = Router();

router.get('/', getEspecialidades);
router.get('/:id', getEspecialidad);
router.post('/', createEspecialidad);
router.put('/:id', updateEspecialidad);
router.delete('/:id', deleteEspecialidad);

export default router;
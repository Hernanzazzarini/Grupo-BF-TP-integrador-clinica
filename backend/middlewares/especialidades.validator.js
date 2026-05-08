//Valida campo nombre
import { check } from 'express-validator';

export const validarEspecialidad = [
  check('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres')
];
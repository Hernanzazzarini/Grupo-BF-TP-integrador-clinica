import { body } from 'express-validator';

export const validarPaciente = [

  body('id_usuario')
    .notEmpty()
    .withMessage('El id_usuario es obligatorio')
    .isInt()
    .withMessage('Debe ser un número entero'),

  body('id_obra_social')
    .notEmpty()
    .withMessage('El id_obra_social es obligatorio')
    .isInt()
    .withMessage('Debe ser un número entero')

];
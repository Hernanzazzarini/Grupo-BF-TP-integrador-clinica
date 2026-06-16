import { body } from 'express-validator';

export const validarMedico = [

  body('id_usuario')
    .notEmpty()
    .withMessage('El id_usuario es obligatorio')
    .isInt()
    .withMessage('Debe ser un número entero'),

  body('id_especialidad')
    .notEmpty()
    .withMessage('El id_especialidad es obligatorio')
    .isInt()
    .withMessage('Debe ser un número entero'),

  body('matricula')
    .notEmpty()
    .withMessage('La matrícula es obligatoria')
    .isInt()
    .withMessage('Debe ser un número entero'),

  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria'),

  body('valor_consulta')
    .notEmpty()
    .withMessage('El valor de consulta es obligatorio')
    .isNumeric()
    .withMessage('Debe ser un valor numérico')

];
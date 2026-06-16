import { body } from 'express-validator';

export const validarObraSocial = [

  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio'),

  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria'),

  body('porcentaje_descuento')
    .notEmpty()
    .withMessage('El porcentaje de descuento es obligatorio')
    .isNumeric()
    .withMessage('Debe ser un valor numérico'),

  body('es_particular')
    .notEmpty()
    .withMessage('Debe indicar si es particular')
    .isIn([0,1,'0','1'])
    .withMessage('Solo se permite 0 o 1')

];
import { body } from 'express-validator';

export const validarMedicoObraSocial = [

  body('id_medico')
    .notEmpty()
    .isInt()
    .withMessage('Debe indicar un médico válido'),

  body('id_obra_social')
    .notEmpty()
    .isInt()
    .withMessage('Debe indicar una obra social válida')

];
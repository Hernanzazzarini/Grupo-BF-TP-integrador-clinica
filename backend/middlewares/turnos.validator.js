import { body } from 'express-validator';

export const validarTurno = [

  body('id_medico')
    .notEmpty()
    .withMessage('El id_medico es obligatorio')
    .isInt()
    .withMessage('Debe ser un número entero'),

  body('id_paciente')
    .notEmpty()
    .withMessage('El id_paciente es obligatorio')
    .isInt()
    .withMessage('Debe ser un número entero'),

  body('fecha_hora')
    .notEmpty()
    .withMessage('La fecha y hora es obligatoria')

];
//Recibe errores de validacion y los devuelve al cliente,Si hay errores responde 400,si no sigue next()
import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Error de validación',
      errores: errors.array()
    });
  }

  next();
};
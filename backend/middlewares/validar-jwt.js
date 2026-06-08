import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      message: 'Token requerido'
    });
  }

  try {

    const tokenLimpio = token.replace('Bearer ', '');

    const payload = jwt.verify(
      tokenLimpio,
      process.env.JWT_SECRET
    );

    req.usuario = payload;

    next();

  } catch (error) {

    return res.status(401).json({
      message: 'Token inválido'
    });
  }
};
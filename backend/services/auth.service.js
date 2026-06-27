import * as AuthRepository from '../repositories/auth.repository.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const login = async (email, contrasenia) => {
  const usuario = await AuthRepository.findByEmail(email);
  if (!usuario) return null;

  const hash = crypto.createHash('sha256').update(contrasenia).digest('hex');
  if (hash !== usuario.contrasenia) return null;

  const token = jwt.sign(
    { id_usuario: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '4h' }
  );
  return { token, id_usuario: usuario.id_usuario };
};

import { pool } from '../config/db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const login = async (email, contrasenia) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ? AND activo = 1',
    [email]
  );
  if (rows.length === 0) return null;

  const usuario = rows[0];
  const hash = crypto.createHash('sha256').update(contrasenia).digest('hex');
  if (hash !== usuario.contrasenia) return null;

  const token = jwt.sign(
    { id_usuario: usuario.id_usuario, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '4h' }
  );
  return token;
};

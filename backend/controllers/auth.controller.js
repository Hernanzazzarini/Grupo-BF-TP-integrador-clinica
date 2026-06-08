import { pool } from '../config/db.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const login = async (req, res) => {
  try {

    const { email, contrasenia } = req.body;

    const [rows] = await pool.query(
      `SELECT *
       FROM usuarios
       WHERE email = ?
       AND activo = 1`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: 'Usuario no encontrado'
      });
    }

    const usuario = rows[0];

    const passwordHash = crypto
      .createHash('sha256')
      .update(contrasenia)
      .digest('hex');

    if (passwordHash !== usuario.contrasenia) {
      return res.status(401).json({
        message: 'Contraseña incorrecta'
      });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '4h'
      }
    );

    res.json({
      message: 'Login exitoso',
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
};
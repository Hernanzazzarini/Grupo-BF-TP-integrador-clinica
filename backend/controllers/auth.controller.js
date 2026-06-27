import * as AuthService from '../services/auth.service.js';
import { registrarAccion } from '../utils/logger.js';

export const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const resultado = await AuthService.login(email, contrasenia);

    if (!resultado) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const { token, id_usuario } = resultado;
    registrarAccion('LOGIN', id_usuario);
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

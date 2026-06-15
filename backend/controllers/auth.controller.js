import * as AuthService from '../services/auth.service.js';

export const login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    const token = await AuthService.login(email, contrasenia);

    if (!token) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

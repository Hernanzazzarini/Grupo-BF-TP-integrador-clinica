import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import especialidadesRoutes from './routes/especialidades.routes.js';
import { testConexion } from './config/test-conexion.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// rutas
app.use('/api/especialidades', especialidadesRoutes);

// iniciar servidor + test BD
app.listen(process.env.PORT, async () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  await testConexion();
});

//url de la api:http://localhost:3000/api/especialidades
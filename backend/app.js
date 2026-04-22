import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import especialidadesRoutes from './routes/especialidades.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/especialidades', especialidadesRoutes);

//Se define el puerto Puerto 3000
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

//url de la api:http://localhost:3000/api/especialidades
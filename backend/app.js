//configuracion Express
//Permite JASON
//Define rutas
//Inicia servidor
//verifica conexion al arrancar

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import especialidadesV1 from './routes/v1/especialidades.routes.js';
import especialidadesV2 from './routes/v2/especialidades.routes.js';



import { testConexion } from './config/test-conexion.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// rutas
app.use('/api/v1/especialidades', especialidadesV1);
app.use('/api/v2/especialidades', especialidadesV2);

// iniciar servidor + test BD
app.listen(process.env.PORT, async () => {
  console.log('------------------------------------------------');
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  await testConexion();
  console.log('Sistema de clinica-Entidad Especialidades');
  console.log('-------------------------------------------------');
  console.log('Implementacion Morgan :Registros de solicitudes HTTP');


});

//url de la api:http://localhost:3000/api/v1/especialidades
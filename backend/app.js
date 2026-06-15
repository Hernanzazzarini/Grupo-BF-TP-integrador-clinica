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
import authRoutes from './routes/v2/auth.routes.js';
import obrasSocialesV2 from './routes/v2/obras-sociales.routes.js';
import medicosV2 from './routes/v2/medicos.routes.js';
import medicosObrasSocialesV2 from './routes/v2/medicos-obras-sociales.routes.js';
import pacientesV2 from './routes/v2/pacientes.routes.js';
import turnosV2 from './routes/v2/turnos.routes.js';
import estadisticasRoutes from './routes/v2/estadisticas.routes.js';
import pdfRoutes from './routes/v2/pdf.routes.js';




import { swaggerSpec, swaggerUi } from './config/swagger.js';
import { testConexion } from './config/test-conexion.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// rutas
app.use('/api/v1/especialidades', especialidadesV1);
app.use('/api/v2/especialidades', especialidadesV2);
app.use('/api/v2/auth', authRoutes);
app.use('/api/v2/obras-sociales', obrasSocialesV2);
app.use('/api/v2/medicos', medicosV2);
app.use('/api/v2/medicos-obras-sociales',medicosObrasSocialesV2);
app.use('/api/v2/pacientes', pacientesV2);
app.use('/api/v2/turnos', turnosV2);
app.use('/api/v2/estadisticas', estadisticasRoutes);
app.use('/api/v2/reportes', pdfRoutes);

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
//url de la api:http://localhost:3000/api/v2/especialidades
//url de la api auth:http://localhost:3000/api/v2/auth/login
//url de la api obras sociales:http://localhost:3000/api/v2/obras-sociales
// url de la api medicos:http://localhost:3000/api/v2/medicos
// url de la api medicos:http://localhost:3000/api/v2/medicos-obras-sociales
// url de la api medicos:http://localhost:3000/api/v2/pacientes
// url de la api medicos:http://localhost:3000/api/v2/turnos

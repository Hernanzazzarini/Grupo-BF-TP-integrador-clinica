import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clínica Médica',
      version: '2.0.0',
      description: 'Sistema de gestión de turnos para clínica médica — Programación III UNER',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    tags: [
      { name: 'Auth',                  description: 'Autenticación' },
      { name: 'Especialidades',        description: 'Gestión de especialidades' },
      { name: 'Obras Sociales',        description: 'Gestión de obras sociales (admin)' },
      { name: 'Médicos',               description: 'Gestión de médicos' },
      { name: 'Médicos-Obras Sociales',description: 'Asociación médicos con obras sociales (admin)' },
      { name: 'Pacientes',             description: 'Gestión de pacientes (admin)' },
      { name: 'Turnos',                description: 'Reservas y gestión de turnos' },
      { name: 'Estadísticas',          description: 'Estadísticas de atenciones (admin)' },
      { name: 'Reportes PDF',          description: 'Generación de informes en PDF (admin)' },
      { name: 'Auditoría',             description: 'Historial de acciones del sistema (admin) — funcionalidad extra' },
    ],
    paths: {
      // ── AUTH ────────────────────────────────────────────────────────────────
      '/api/v2/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Iniciar sesión',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'contrasenia'],
                  properties: {
                    email:      { type: 'string', example: 'ferben@correo.com' },
                    contrasenia:{ type: 'string', example: 'password123' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Login exitoso — devuelve token JWT' },
            401: { description: 'Credenciales inválidas' },
          },
        },
      },

      // ── ESPECIALIDADES v1 (sin auth) ─────────────────────────────────────
      '/api/v1/especialidades': {
        get: {
          tags: ['Especialidades'],
          summary: 'Listar especialidades (sin auth)',
          responses: { 200: { description: 'Lista de especialidades activas' } },
        },
        post: {
          tags: ['Especialidades'],
          summary: 'Crear especialidad (sin auth — v1)',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nombre'],
                  properties: { nombre: { type: 'string', example: 'CARDIOLOGÍA' } },
                },
              },
            },
          },
          responses: {
            201: { description: 'Especialidad creada' },
            400: { description: 'Nombre ya existe' },
          },
        },
      },
      '/api/v1/especialidades/{id}': {
        get: {
          tags: ['Especialidades'],
          summary: 'Obtener especialidad por ID (sin auth)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Especialidad encontrada' },
            404: { description: 'No encontrada' },
          },
        },
        put: {
          tags: ['Especialidades'],
          summary: 'Actualizar especialidad (sin auth — v1)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { nombre: { type: 'string' } },
                },
              },
            },
          },
          responses: { 200: { description: 'Actualizada' }, 404: { description: 'No encontrada' } },
        },
        delete: {
          tags: ['Especialidades'],
          summary: 'Eliminar especialidad (soft delete, sin auth — v1)',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Eliminada' }, 404: { description: 'No encontrada' } },
        },
      },

      // ── ESPECIALIDADES v2 (con auth) ─────────────────────────────────────
      '/api/v2/especialidades': {
        get: {
          tags: ['Especialidades'],
          summary: 'Listar especialidades — rol: paciente(2), admin(3)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Lista de especialidades activas' } },
        },
        post: {
          tags: ['Especialidades'],
          summary: 'Crear especialidad — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nombre'],
                  properties: { nombre: { type: 'string', example: 'CARDIOLOGÍA' } },
                },
              },
            },
          },
          responses: { 201: { description: 'Creada' }, 400: { description: 'Nombre ya existe' } },
        },
      },
      '/api/v2/especialidades/{id}': {
        get: {
          tags: ['Especialidades'],
          summary: 'Obtener especialidad por ID — rol: paciente(2), admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Especialidad' }, 404: { description: 'No encontrada' } },
        },
        put: {
          tags: ['Especialidades'],
          summary: 'Actualizar especialidad — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { nombre: { type: 'string' } } },
              },
            },
          },
          responses: { 200: { description: 'Actualizada' }, 404: { description: 'No encontrada' } },
        },
        delete: {
          tags: ['Especialidades'],
          summary: 'Eliminar especialidad (soft delete) — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Eliminada' }, 404: { description: 'No encontrada' } },
        },
      },

      // ── OBRAS SOCIALES ───────────────────────────────────────────────────
      '/api/v2/obras-sociales': {
        get: {
          tags: ['Obras Sociales'],
          summary: 'Listar obras sociales — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Lista de obras sociales' } },
        },
        post: {
          tags: ['Obras Sociales'],
          summary: 'Crear obra social — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nombre', 'descripcion', 'porcentaje_descuento', 'es_particular'],
                  properties: {
                    nombre:               { type: 'string',  example: 'OSDE' },
                    descripcion:          { type: 'string',  example: 'Obra social OSDE' },
                    porcentaje_descuento: { type: 'number',  example: 15 },
                    es_particular:        { type: 'integer', example: 0, description: '0=obra social, 1=particular' },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Creada' } },
        },
      },
      '/api/v2/obras-sociales/{id}': {
        get: {
          tags: ['Obras Sociales'],
          summary: 'Obtener obra social por ID — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Obra social' }, 404: { description: 'No encontrada' } },
        },
        put: {
          tags: ['Obras Sociales'],
          summary: 'Actualizar obra social — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    nombre:               { type: 'string' },
                    descripcion:          { type: 'string' },
                    porcentaje_descuento: { type: 'number' },
                    es_particular:        { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Actualizada' }, 404: { description: 'No encontrada' } },
        },
        delete: {
          tags: ['Obras Sociales'],
          summary: 'Eliminar obra social (soft delete) — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Eliminada' } },
        },
      },

      // ── MÉDICOS ──────────────────────────────────────────────────────────
      '/api/v2/medicos': {
        get: {
          tags: ['Médicos'],
          summary: 'Listar médicos — rol: paciente(2), admin(3)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Lista de médicos' } },
        },
        post: {
          tags: ['Médicos'],
          summary: 'Crear médico — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id_usuario', 'id_especialidad', 'matricula', 'valor_consulta'],
                  properties: {
                    id_usuario:     { type: 'integer', example: 1 },
                    id_especialidad:{ type: 'integer', example: 1 },
                    matricula:      { type: 'integer', example: 5000 },
                    descripcion:    { type: 'string',  example: 'Médico clínico' },
                    valor_consulta: { type: 'number',  example: 8000 },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Médico creado' }, 400: { description: 'Matrícula duplicada' } },
        },
      },
      '/api/v2/medicos/especialidad/{id}': {
        get: {
          tags: ['Médicos'],
          summary: 'Listar médicos por especialidad — rol: paciente(2)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID de especialidad' }],
          responses: {
            200: { description: 'Médicos de la especialidad' },
            404: { description: 'Especialidad o médicos no encontrados' },
          },
        },
      },
      '/api/v2/medicos/{id}': {
        get: {
          tags: ['Médicos'],
          summary: 'Obtener médico por ID — rol: paciente(2), admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Médico' }, 404: { description: 'No encontrado' } },
        },
        put: {
          tags: ['Médicos'],
          summary: 'Actualizar médico — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_usuario:     { type: 'integer' },
                    id_especialidad:{ type: 'integer' },
                    matricula:      { type: 'integer' },
                    descripcion:    { type: 'string' },
                    valor_consulta: { type: 'number' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Actualizado' }, 404: { description: 'No encontrado' } },
        },
        delete: {
          tags: ['Médicos'],
          summary: 'Eliminar médico — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Eliminado' } },
        },
      },

      // ── MÉDICOS-OBRAS SOCIALES ───────────────────────────────────────────
      '/api/v2/medicos-obras-sociales': {
        get: {
          tags: ['Médicos-Obras Sociales'],
          summary: 'Listar asociaciones médico-obra social — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Lista de asociaciones' } },
        },
        post: {
          tags: ['Médicos-Obras Sociales'],
          summary: 'Asociar médico con obra social — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id_medico', 'id_obra_social'],
                  properties: {
                    id_medico:      { type: 'integer', example: 1 },
                    id_obra_social: { type: 'integer', example: 2 },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Asociación creada' } },
        },
      },
      '/api/v2/medicos-obras-sociales/{id}': {
        put: {
          tags: ['Médicos-Obras Sociales'],
          summary: 'Actualizar asociación médico-obra social — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_medico:      { type: 'integer' },
                    id_obra_social: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Actualizada' }, 404: { description: 'No encontrada' } },
        },
        delete: {
          tags: ['Médicos-Obras Sociales'],
          summary: 'Eliminar asociación médico-obra social — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Eliminada' } },
        },
      },

      // ── PACIENTES ────────────────────────────────────────────────────────
      '/api/v2/pacientes': {
        get: {
          tags: ['Pacientes'],
          summary: 'Listar pacientes — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Lista de pacientes' } },
        },
        post: {
          tags: ['Pacientes'],
          summary: 'Crear paciente — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id_usuario', 'id_obra_social'],
                  properties: {
                    id_usuario:     { type: 'integer', example: 5 },
                    id_obra_social: { type: 'integer', example: 1 },
                  },
                },
              },
            },
          },
          responses: { 201: { description: 'Paciente creado' } },
        },
      },
      '/api/v2/pacientes/{id}': {
        get: {
          tags: ['Pacientes'],
          summary: 'Obtener paciente por ID — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          responses: { 200: { description: 'Paciente' }, 404: { description: 'No encontrado' } },
        },
        put: {
          tags: ['Pacientes'],
          summary: 'Actualizar paciente (también sirve para cambiar obra social) — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id_usuario:     { type: 'integer' },
                    id_obra_social: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: { 200: { description: 'Actualizado' }, 404: { description: 'No encontrado' } },
        },
      },

      // ── TURNOS ───────────────────────────────────────────────────────────
      '/api/v2/turnos': {
        get: {
          tags: ['Turnos'],
          summary: 'Listar todos los turnos — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Lista de turnos activos' } },
        },
        post: {
          tags: ['Turnos'],
          summary: 'Registrar turno para cualquier paciente — rol: admin(3)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id_medico', 'id_paciente', 'fecha_hora'],
                  properties: {
                    id_medico:   { type: 'integer', example: 1 },
                    id_paciente: { type: 'integer', example: 2 },
                    fecha_hora:  { type: 'string',  example: '2026-06-20 10:00:00' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Turno registrado — devuelve valor_total calculado' },
            404: { description: 'Paciente o médico no encontrado' },
          },
        },
      },
      '/api/v2/turnos/mis-turnos-medico': {
        get: {
          tags: ['Turnos'],
          summary: 'Listar turnos propios — rol: médico(1)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Turnos del médico autenticado' } },
        },
      },
      '/api/v2/turnos/mis-turnos-paciente': {
        get: {
          tags: ['Turnos'],
          summary: 'Listar turnos propios — rol: paciente(2)',
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Turnos del paciente autenticado' } },
        },
      },
      '/api/v2/turnos/reservar': {
        post: {
          tags: ['Turnos'],
          summary: 'Reservar turno propio — rol: paciente(2)',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['id_medico', 'fecha_hora'],
                  properties: {
                    id_medico:  { type: 'integer', example: 1 },
                    fecha_hora: { type: 'string',  example: '2026-06-20 10:00:00' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Turno reservado — devuelve valor_total calculado' },
            404: { description: 'Paciente o médico no encontrado' },
          },
        },
      },
      '/api/v2/turnos/{id}/atendido': {
        put: {
          tags: ['Turnos'],
          summary: 'Marcar turno como atendido — rol: médico(1)',
          security: [{ bearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID del turno' }],
          responses: {
            200: { description: 'Turno marcado como atendido' },
            404: { description: 'Turno no encontrado' },
          },
        },
      },

      // ── REPORTES PDF ─────────────────────────────────────────────────────
      '/api/v2/reportes/turnos': {
        get: {
          tags: ['Reportes PDF'],
          summary: 'Descargar informe de turnos en PDF — rol: admin(3)',
          description: 'Genera y descarga un PDF con resumen general, desglose por obra social y detalle de todos los turnos activos.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Archivo PDF generado',
              content: { 'application/pdf': {} },
            },
          },
        },
      },

      // ── AUDITORÍA ────────────────────────────────────────────────────────
      '/api/v2/auditoria': {
        get: {
          tags: ['Auditoría'],
          summary: 'Listar historial de acciones — rol: admin(3)',
          description: 'Devuelve todas las acciones registradas (LOGIN, CREAR_TURNO_ADMIN, RESERVAR_TURNO_PACIENTE, TURNO_ATENDIDO) con usuario y fecha.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Historial de auditoría ordenado por fecha descendente',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id_auditoria: { type: 'integer' },
                        accion:       { type: 'string', example: 'LOGIN' },
                        id_usuario:   { type: 'integer', nullable: true },
                        fecha_hora:   { type: 'string', format: 'date-time' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      // ── ESTADÍSTICAS ─────────────────────────────────────────────────────
      '/api/v2/estadisticas': {
        get: {
          tags: ['Estadísticas'],
          summary: 'Obtener estadísticas de atenciones por médico — rol: admin(3)',
          description: 'Ejecuta el stored procedure `sp_estadisticas_atenciones`. Devuelve por médico: total_turnos, turnos_atendidos y total_facturado.',
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: 'Estadísticas por médico',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        apellido:         { type: 'string' },
                        nombres:          { type: 'string' },
                        especialidad:     { type: 'string' },
                        total_turnos:     { type: 'integer' },
                        turnos_atendidos: { type: 'integer' },
                        total_facturado:  { type: 'number' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };

Integrantes: Hernan Zazzarini, Juan Trentino, Fabian Agustin Romero De Greef, Claudia Guardia, Ileana Paula Solis

Herramienta de uso para testeos de la api: POSTMAN


------------------------------------------------------------
Segunda entrega TP.

archivo.env actualizado

PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=prog3     
DB_PORT=3306
JWT_SECRET=prog3_clinica_2026


url
//url de la api:http://localhost:3000/api/v1/especialidades(Vers Obsoleta)


VERSIONADO V2


AUTENTICACION
//url de la api Inicio sesion auth:http://localhost:3000/api/v2/auth/login

MEDICO(ROL=1)
// url de la api Listar turnos propios:http://localhost:3000/api/v2/turnos/mis-turnos-medico
// url de la api Marcar turno como atendido: http://localhost:3000/api/v2/turnos/1/atendido  (en la url: 1 hace ref al turno y atendido que fue atendido)       

PACIENTE(ROL=2)
//url de la api listar turnos propios: http://localhost:3000/api/v2/turnos/mis-turnos-paciente
//url de la api listar especialidades:http://localhost:3000/api/v2/especialidades
//url de la api Listar todos los medicos y de una especialidad :http://localhost:3000/api/v2/medicos/especialidad/1 (1 es la especiliadidad,puede colocar otra)
//url de la api crear reservas(turnos Propios):http://localhost:3000/api/v2/turnos/reservar


ADMINISTRADOR(ROL=3)

//url de la api listar,crear y editar especialidades:http://localhost:3000/api/v2/especialidades
//url de la api obras sociales:http://localhost:3000/api/v2/obras-sociales
// url de la api asociar medicos con especialidades :http://localhost:3000/api/v2/medicos
// url de la api asociar medicos con obras sociales:http://localhost:3000/api/v2/medicos-obras-sociales
// url de la api asociar pacientes con obras sociales:http://localhost:3000/api/v2/pacientes
// url de la api registrar un turno para un paciente,medico,fecha:http://localhost:3000/api/v2/turnos




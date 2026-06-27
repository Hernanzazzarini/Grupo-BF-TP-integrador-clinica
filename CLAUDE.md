# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `backend/` directory:

```bash
# Install dependencies
npm install

# Start the server (port 3000 by default)
node app.js

# Test DB connectivity without starting the full server
node config/test-conexion.js
```

There is no test suite (`npm test` exits 1). Manual testing is done with Postman or via Swagger UI at `http://localhost:3000/api-docs`.

## Environment setup

Create `backend/.env` with:

```
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=prog3_turnos
DB_PORT=3306
JWT_SECRET=prog3_clinica_2026
```

Import `backend/prog3_turnos-2.sql` into MySQL/MariaDB to create and seed the database. The stored procedure `sp_estadisticas_atenciones()` must exist in the DB for the estadísticas endpoint to work.

## Architecture

The project is a Node.js/Express REST API using ES Modules (`"type": "module"`). There is no frontend.

**Layer flow:** `routes/` → `controllers/` → `services/` → `repositories/`

- **Routes** apply middleware chains (JWT validation → role check → field validators → controller).
- **Controllers** handle HTTP — they call service methods and map return values to status codes. Error objects like `{ error: 'paciente_not_found' }` are returned from services (not thrown) to distinguish business errors from unexpected exceptions.
- **Services** contain business logic. The turno creation flow (`services/turnos.service.js`) cross-queries multiple repositories to calculate `valor_total` = `valor_consulta × (1 - porcentaje_descuento/100)`, with `es_particular = 1` meaning no discount.
- **Repositories** execute raw SQL against a shared `mysql2/promise` pool (`config/db.js`). All queries use parameterized `?` placeholders.

**API versioning:**
- `v1` — no authentication, specialties only (legacy/obsolete).
- `v2` — all endpoints require JWT; the full system lives here.

**Role system** (stored in `usuarios.rol`):
- `1` = médico
- `2` = paciente
- `3` = administrador

**Auth:** `POST /api/v2/auth/login` with `{ email, contrasenia }`. Passwords are stored as SHA-256 hashes (not bcrypt). JWT payload contains `{ id_usuario, email, rol }` and expires in 4 hours. All protected routes read `req.usuario` set by `middlewares/validar-jwt.js`.

**Auditoría:** `utils/logger.js:registrarAccion(accion, id_usuario)` is fire-and-forget — it calls the repository without awaiting. Logged actions: `LOGIN`, `CREAR_TURNO_ADMIN`, `RESERVAR_TURNO_PACIENTE`, `TURNO_ATENDIDO`.

**Soft deletes:** Most tables have an `activo` column (0/1). Repositories always filter `WHERE activo = 1` for reads. The `pacientes` table is the exception — it has no `activo` column.

**Known DB typo:** The column is `atentido` (not `atendido`) in `turnos_reservas`. This typo is in the schema and all queries; do not "fix" it without migrating the DB.

**PDF reports** (`/api/v2/reportes/turnos`): generated in-memory with `pdfkit` and streamed directly as `application/pdf`.

**Swagger:** All API documentation is defined inline in `config/swagger.js` (not via JSDoc comments in route files). The `apis: []` option in swaggerJsdoc means annotations in route files are not scanned.

## Login credentials (seed data)

Password convention: first 3 letters before the `@` in the email (SHA-256 hashed).

| Email | Rol |
|---|---|
| `lopmar@correo.com` | médico (1) |
| `perlui@correo.com` | médico (1) |
| `lopjac@correo.com` | paciente (2) |
| admin user — check `usuarios` table | admin (3) |
# Task Manager con Equipos - Documentación del Proyecto

## Descripción
App fullstack colaborativa para la gestión de equipos, tareas y reportes de productividad.

## Stack Tecnológico
- **Frontend**: Next.js 14 + TypeScript + TailwindCSS (Puerto 3000)
- **Backend**: Express + TypeScript + Prisma + PostgreSQL (Puerto 3001)
- **Autenticación**: JWT + bcryptjs
- **Despliegue**: Railway (Backend) + Vercel (Frontend)

## Estructura del Backend (src/)
- `controllers/`: Recepción de requests y llamado a servicios.
- `services/`: Lógica de negocio y consultas Prisma.
- `routes/`: Definición de endpoints y aplicación de middlewares.
- `middleware/`: Middleware de autenticación JWT.
- `types/`: Interfaces y tipos de TypeScript.
- `server.ts`: Punto de entrada de la aplicación.

## Reglas Críticas de Negocio
- **Equipos (Teams)**:
  - El creador se convierte automáticamente en miembro con el rol `creator`.
  - El código de invitación debe ser de 6 caracteres alfanuméricos únicos.
- **Tareas (Tasks)**:
  - Solo los miembros del equipo pueden realizar operaciones sobre las tareas.
- **Reportes (Reports)**:
  - Es **OBLIGATORIO** el uso de `prisma.$queryRaw` con `JOINs` y `GROUP BY`.

## Convenciones de Desarrollo
- Uso estricto de `async/await` (sin `.then()`).
- Comentarios en **español**.
- Uso de **Named exports** en servicios y controladores.
- Manejo de errores mediante `try/catch` y pasándolos a `next(error)`.

## Comandos Principales
- `npm run dev`: Iniciar frontend y backend.
- `npx prisma migrate dev`: Generar y ejecutar migraciones.
- `npx prisma studio`: Explorador de base de datos.

## Endpoints Principales
### Autenticación
- `POST /auth/register`
- `POST /auth/login`

### Equipos (Teams)
- `POST /teams`: Crear equipo.
- `GET /teams`: Listar equipos del usuario.
- `GET /teams/:id`: Detalle de equipo.
- `POST /teams/join`: Unirse a un equipo con código.
- `DELETE /teams/:id`: Eliminar equipo.

### Tareas (Tasks)
- `POST /teams/:teamId/tasks`: Crear tarea.
- `GET /teams/:teamId/tasks`: Listar tareas del equipo.
- `PUT /tasks/:id`: Editar tarea.
- `PATCH /tasks/:id/complete`: Marcar tarea como completada.
- `DELETE /tasks/:id`: Eliminar tarea.

### Reportes (Reports)
- `GET /reports/team/:teamId/stats`: Estadísticas del equipo.
- `GET /reports/my-productivity`: Productividad personal.

## Variables de Entorno
### Backend
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT=3001`
- `FRONTEND_URL`

### Frontend
- `NEXT_PUBLIC_API_URL`

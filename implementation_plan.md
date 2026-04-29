# Plan de Implementación: Task Manager con Equipos

Este documento detalla los pasos para construir la aplicación fullstack colaborativa siguiendo las reglas de negocio y el stack tecnológico especificado.

## Fase 1: Configuración del Entorno y Backend Base
- [ ] Inicializar proyecto Express con TypeScript.
- [ ] Configurar Prisma con el esquema inicial (User, Team, Membership, Task).
- [ ] Implementar middleware de autenticación JWT.
- [ ] Configurar variables de entorno y conexión a PostgreSQL.

## Fase 2: Desarrollo del Backend (Lógica de Negocio)
- [ ] **Autenticación**: Registro y Login con bcryptjs.
- [ ] **Equipos**:
    - Creación de equipos (generación de código de 6 caracteres).
    - Lógica de membresía automática para el creador.
    - Unirse a equipos mediante código.
- [ ] **Tareas**:
    - CRUD de tareas con validación de membresía de equipo.
- [ ] **Reportes**:
    - Implementación de consultas SQL raw (`prisma.$queryRaw`) para estadísticas y productividad.

## Fase 3: Frontend y Diseño Premium
- [ ] Inicializar Next.js 14 con TypeScript y TailwindCSS.
- [ ] Definir el sistema de diseño (Colores, Tipografía, Sombras) con estética premium.
- [ ] Implementar componentes base (Buttons, Inputs, Cards, Modals) con micro-animaciones.
- [ ] Pantallas de Auth (vibrantes y modernas).

## Fase 4: Integración y Dashboard
- [ ] Conectar el Dashboard principal con los equipos del usuario.
- [ ] Vista de tareas con estados (Todo, In Progress, Done).
- [ ] Panel de reportes con gráficas y datos dinámicos del backend.

## Fase 5: Pulido y Despliegue
- [ ] Optimización de SEO y performance.
- [ ] Verificación de seguridad en endpoints.
- [ ] Preparación para despliegue en Railway/Vercel.

---

## Modelo de Datos (Prisma)
- **User**: id, email, password, name.
- **Team**: id, name, inviteCode, createdAt.
- **Membership**: userId, teamId, role (creator, member).
- **Task**: id, title, description, status, teamId, assignedToId, createdAt.

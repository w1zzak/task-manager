# 🚀 Task Manager Pro - Fullstack Monorepo

Una plataforma moderna de gestión de tareas y colaboración por equipos, diseñada con una estética editorial de alto impacto y una arquitectura robusta.

## 🎨 Características Principales

- **Diseño Premium**: Interfaz moderna basada en *Glassmorphism*, fondos dinámicos y tipografía editorial.
- **Autenticación Completa**: Registro e inicio de sesión seguros mediante JWT (JSON Web Tokens) y encriptación de contraseñas.
- **Gestión de Equipos**: 
  - Creación de equipos con generación automática de códigos de invitación únicos.
  - Sistema de unión a equipos mediante códigos alfanuméricos.
  - Gestión de roles (Creador y Miembros).
- **Gestión de Tareas**: 
  - CRUD completo de tareas por equipo.
  - Edición inline y toggle de estado (completado/pendiente).
- **Seguridad**: Verificación estricta de membresía en todas las operaciones del backend.

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **ORM**: Prisma 6 (SQLite por defecto)
- **Seguridad**: JWT (jsonwebtoken) & Bcryptjs

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Estilos**: TailwindCSS
- **Diseño**: Glassmorphism & Modern UI
- **Estado**: React Hooks (State/Effect)

## 📁 Estructura del Proyecto

```text
.
├── backend/                # API REST con Express y Prisma
│   ├── prisma/             # Esquema de base de datos y migraciones
│   ├── src/
│   │   ├── controllers/    # Lógica de las rutas
│   │   ├── middleware/     # Auth y validaciones
│   │   ├── routes/         # Definición de endpoints
│   │   ├── services/       # Lógica de negocio (Prisma queries)
│   │   └── server.ts       # Punto de entrada
├── frontend/               # Aplicación Next.js 14
│   ├── src/app/            # Rutas y componentes (App Router)
│   ├── public/             # Archivos estáticos
│   └── tailwind.config.ts  # Configuración de estilos
└── README.md
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <tu-repo-url>
cd <nombre-del-directorio>
```

### 2. Configuración del Backend
```bash
cd backend
npm install
# Crea un archivo .env basado en .env.example
npx prisma migrate dev --name init
npm run dev
```

### 3. Configuración del Frontend
```bash
cd ../frontend
npm install
# Crea un archivo .env basado en .env.example
npm run dev
```

## 🔑 Variables de Entorno

### Backend (`/backend/.env`)
| Variable | Descripción | Valor Ejemplo |
| :--- | :--- | :--- |
| `PORT` | Puerto del servidor backend | `3001` |
| `DATABASE_URL` | URL de conexión Prisma | `file:./dev.db` |
| `JWT_SECRET` | Llave secreta para tokens | `tu_secreto_super_seguro` |

### Frontend (`/frontend/.env`)
| Variable | Descripción | Valor Ejemplo |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL del backend | `http://localhost:3001` |

## 🧪 Flujo de Trabajo Recomendado
1. Registrar un nuevo usuario.
2. Crear un equipo en el dashboard.
3. Copiar el código de invitación generado.
4. (Opcional) Abrir una ventana de incógnito, registrar un segundo usuario y unirse al equipo usando el código.
5. Gestionar tareas colaborativamente.
# Game Tier List Manager

## 📋 Descripción del Proyecto

**Game Tier List Manager** es una aplicación web completa full-stack diseñada para crear, gestionar y visualizar tier lists (listas de ranking) de elementos de videojuegos. Combina **Express + Sequelize** en el backend con **React + Vite + TypeScript** en el frontend, siguiendo principios de normalización de base de datos (3NF) y arquitectura modular escalable.

---

## 🎯 Objetivo Principal de la Aplicación

El objetivo principal es proporcionar una plataforma interactiva donde los usuarios puedan:
- **Crear tier lists personalizadas** para diferentes videojuegos
- **Rankear items** (armas, personajes, habilidades, etc.) en categorías S, A, B, C, D
- **Compartir y visualizar** tier lists públicas de la comunidad
- **Gestionar catálogos** de juegos y sus elementos de forma estructurada

Esta aplicación está diseñada para demostrar habilidades de desarrollo full-stack, incluyendo:
- Diseño de bases de datos normalizadas (3NF)
- Desarrollo de APIs REST robustas con validaciones
- Creación de interfaces modernas con React y TypeScript
- Testing automatizado con cobertura completa
- Integración frontend-backend con manejo de estados

---

## 👥 Usuarios de la Aplicación

### Público Objetivo
1. **Gamers y entusiastas de videojuegos** que quieren crear y compartir sus opiniones sobre elementos de juegos
2. **Comunidades gaming** que necesitan organizar debates sobre meta-game y balance
3. **Creadores de contenido** que producen videos/streams de tier lists
4. **Desarrolladores de juegos** interesados en feedback de la comunidad sobre balance

### Tipos de Usuarios
- **Usuarios registrados**: Pueden crear, editar y eliminar sus propias tier lists
- **Administradores**: Tienen permisos completos sobre juegos, items y tier lists del sistema
- **Visitantes** (futuro): Podrán visualizar tier lists públicas sin necesidad de registro

---

## 🔐 Roles y Permisos

El sistema implementa un modelo de roles básico con dos niveles de permisos:

### 1. **Usuario Estándar (role: 'user')**
**Permisos:**
- ✅ Crear tier lists propias
- ✅ Editar tier lists propias
- ✅ Eliminar tier lists propias
- ✅ Agregar/remover items a sus tier lists
- ✅ Cambiar rankings de items en sus tier lists
- ✅ Ver tier lists públicas de otros usuarios
- ✅ Ver catálogos de juegos e items disponibles

**Restricciones:**
- ❌ No puede crear nuevos juegos
- ❌ No puede crear nuevos items
- ❌ No puede editar/eliminar tier lists de otros usuarios
- ❌ No puede modificar datos de otros usuarios

### 2. **Administrador (role: 'admin')**
**Permisos:**
- ✅ **Todos los permisos de usuario estándar**
- ✅ Crear, editar y eliminar juegos
- ✅ Crear, editar y eliminar items
- ✅ Gestionar usuarios del sistema
- ✅ Moderar tier lists públicas
- ✅ Acceso completo a todas las funcionalidades del sistema

**Implementación:**
```javascript
// En el modelo User
User {
  id: INTEGER (PK)
  username: STRING (UNIQUE)
  email: STRING (UNIQUE)
  passwordHash: STRING
  role: ENUM('user', 'admin') DEFAULT 'user'
}
```

---

## ⚙️ Funcionalidades Esenciales

### 1. **Gestión de Juegos**
- Crear nuevos juegos con nombre y descripción
- Listar todos los juegos disponibles
- Editar información de juegos existentes
- Eliminar juegos del catálogo
- **Endpoint:** `/api/games`

### 2. **Gestión de Items**
- Crear items (armas, personajes, etc.) con nombre, descripción e imagen
- Listar todos los items disponibles
- Editar información de items existentes
- Eliminar items del catálogo
- **Endpoint:** `/api/items`

### 3. **Gestión de Tier Lists**
- Crear tier lists asociadas a un juego específico
- Definir visibilidad (pública/privada)
- Editar título y descripción
- Eliminar tier lists propias
- Listar tier lists con filtros
- **Endpoint:** `/api/tierlists`

### 4. **Gestión de Rankings**
- Agregar items a una tier list con rank específico (S, A, B, C, D)
- Validación de duplicados (un item no puede estar dos veces en la misma tier list)
- Cambiar el rank de un item existente
- Definir posición dentro de cada rank
- Eliminar items de una tier list
- Visualización ordenada por rank y posición
- **Endpoint:** `/api/tierlists/:id/items`

### 5. **Sistema de Usuarios**
- Registro de usuarios con email y contraseña
- Validación de usuarios únicos
- Asignación de roles (user/admin)
- **Endpoint:** `/api/users`

### 6. **Validaciones del Sistema**
- ✅ Validación de campos requeridos
- ✅ Validación de existencia de relaciones (userId, gameId, itemId)
- ✅ Validación de ranks válidos (solo S, A, B, C, D)
- ✅ Prevención de duplicados (items en tier lists, usernames)
- ✅ Conversión correcta de tipos de datos
- ✅ Manejo de errores HTTP (400, 404, 409)

---

## 🗄️ Estructura de Base de Datos (Normalizada 3NF)

### Diagrama de Relaciones

```
┌─────────────────┐
│     Users       │
├─────────────────┤
│ PK id           │
│    username     │◄────┐
│    email        │     │
│    passwordHash │     │
│    role         │     │
└─────────────────┘     │
                        │
┌─────────────────┐     │     ┌─────────────────┐
│     Games       │     │     │   TierLists     │
├─────────────────┤     │     ├─────────────────┤
│ PK id           │◄────┼─────│ PK id           │
│    name         │     │     │    title        │
│    description  │     └─────┤ FK userId       │
└─────────────────┘           │ FK gameId       │
                              │    description  │
┌─────────────────┐           │    isPublic     │
│     Items       │           └─────────────────┘
├─────────────────┤                   ▲
│ PK id           │◄──────────────────┼──────┐
│    name         │                   │      │
│    description  │           ┌───────┴──────▼──────┐
│    imageUrl     │           │  TierListItems      │
└─────────────────┘           ├─────────────────────┤
                              │ PK id               │
                              │ FK tierListId       │
                              │ FK itemId           │
                              │    rank (S/A/B/C/D) │
                              │    position         │
                              └─────────────────────┘
```

### Tablas y Normalización (3NF)

#### 1. **Users** (Usuarios del Sistema)
```sql
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
**Justificación 3NF:**
- Cada campo depende únicamente de la clave primaria `id`
- No hay dependencias transitivas
- `username` y `email` son únicos para garantizar integridad

#### 2. **Games** (Catálogo de Juegos)
```sql
CREATE TABLE Games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
**Justificación 3NF:**
- Entidad independiente sin dependencias de otras tablas
- Almacena solo información intrínseca del juego

#### 3. **Items** (Elementos Rankeables)
```sql
CREATE TABLE Items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  imageUrl VARCHAR(500),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```
**Justificación 3NF:**
- Items son independientes de juegos específicos (reutilizables)
- No hay redundancia de datos

#### 4. **TierLists** (Listas de Ranking)
```sql
CREATE TABLE TierLists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  isPublic BOOLEAN DEFAULT TRUE,
  userId INTEGER NOT NULL,
  gameId INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (gameId) REFERENCES Games(id) ON DELETE CASCADE
);
```
**Justificación 3NF:**
- Cada tier list pertenece a un usuario y un juego (relaciones 1:N)
- No hay atributos derivados
- Las foreign keys garantizan integridad referencial

#### 5. **TierListItems** (Tabla de Asociación con Datos)
```sql
CREATE TABLE TierListItems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tierListId INTEGER NOT NULL,
  itemId INTEGER NOT NULL,
  rank ENUM('S', 'A', 'B', 'C', 'D') NOT NULL,
  position INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tierListId) REFERENCES TierLists(id) ON DELETE CASCADE,
  FOREIGN KEY (itemId) REFERENCES Items(id) ON DELETE CASCADE,
  UNIQUE (tierListId, itemId) -- Previene duplicados
);
```
**Justificación 3NF:**
- Resuelve la relación N:M entre TierLists e Items
- `rank` y `position` son atributos de la relación (no de las entidades)
- Constraint UNIQUE previene que un item aparezca dos veces en la misma tier list

### Relaciones Entre Tablas

1. **Users → TierLists** (1:N)
   - Un usuario puede crear múltiples tier lists
   - Una tier list pertenece a un solo usuario

2. **Games → TierLists** (1:N)
   - Un juego puede tener múltiples tier lists
   - Una tier list está asociada a un solo juego

3. **TierLists ↔ Items** (N:M mediante TierListItems)
   - Una tier list puede contener múltiples items
   - Un item puede estar en múltiples tier lists
   - La tabla intermedia almacena `rank` y `position` específicos de cada relación

### Ventajas de Esta Estructura

✅ **Sin redundancia de datos**: Cada dato se almacena una sola vez  
✅ **Integridad referencial**: Foreign keys con CASCADE para mantener consistencia  
✅ **Escalabilidad**: Fácil agregar nuevas entidades (ej: Comments, Votes)  
✅ **Flexibilidad**: Items reutilizables entre diferentes juegos/tier lists  
✅ **Performance**: Índices en foreign keys para queries rápidas

---

## Características principales

## Características principales

### Backend (Node.js + Express + Sequelize)
- **Base de datos normalizada 3NF** con modelos relacionados:
  - `User` - Usuarios del sistema con roles (admin/user)
  - `Game` - Juegos disponibles
  - `Item` - Elementos/items que pueden ser rankeados
  - `TierList` - Listas de ranking por juego
  - `TierListItem` - Asociación many-to-many con ranks y posiciones

- **API REST completa** con operaciones CRUD:
  - `GET/POST/PUT/DELETE /api/users` - Gestión de usuarios
  - `GET/POST/PUT/DELETE /api/games` - Gestión de juegos
  - `GET/POST/PUT/DELETE /api/items` - Gestión de items
  - `GET/POST/PUT/DELETE /api/tierlists` - Gestión de tier lists
  - `GET/POST/PUT/DELETE /api/tierlists/:id/items` - Gestión de items en tier lists

- **ORM Sequelize** con asociaciones y validaciones
- **Script de inicialización** `npm run db:init` para crear BD y seed data
- **Pruebas automatizadas** con Jest + Supertest

### Frontend (React + TypeScript + Vite)
- **Interfaz tabulada** para navegación entre secciones
- **Formularios CRUD** para crear juegos, items y tier lists
- **Visualización de tier lists** con items organizados por ranks (S-A-B-C-D)
- **Responsive design** con CSS moderno
- **Proxy de desarrollo** para consumir API sin CORS

## Arquitectura de base de datos (3NF)

```
Users (id, username, email, passwordHash, role)
Games (id, name, description)
Items (id, name, description, imageUrl)
TierLists (id, title, description, isPublic, userId→Users, gameId→Games)
TierListItems (id, tierListId→TierLists, itemId→Items, rank, position)
```

## 📁 Estructura del Proyecto

```
tierlist/
├── src/                      # Backend (Node.js + Express)
│   ├── db.js                 # Configuración Sequelize + SQLite
│   ├── models/               # Modelos de datos (Sequelize)
│   │   ├── User.js          # Modelo Usuario
│   │   ├── Game.js          # Modelo Juego
│   │   ├── Item.js          # Modelo Item
│   │   ├── TierList.js      # Modelo Tier List
│   │   └── TierListItem.js  # Modelo Tier List Item
│   ├── associations.js      # Definición de relaciones Sequelize
│   ├── routes.js            # API REST endpoints (CRUD completo)
│   ├── app.js               # Factory Express app
│   └── server.js            # Bootstrap del servidor + seeding
├── scripts/
│   ├── init-db.js           # Script de inicialización de BD
│   └── demo-flow.js         # Script de demostración
├── tests/
│   └── app.test.js          # Suite de pruebas (19 tests)
├── data/
│   └── tierlist.db          # Base de datos SQLite (generada)
├── client/                   # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── App.tsx          # Componente principal React
│   │   ├── App.css          # Estilos de la aplicación
│   │   ├── main.tsx         # Entry point
│   │   └── assets/          # Recursos estáticos
│   ├── vite.config.ts       # Configuración Vite + proxy API
│   ├── tsconfig.json        # TypeScript config
│   └── package.json         # Dependencias frontend
├── package.json             # Dependencias backend + scripts
├── jest.config.js           # Configuración Jest
└── README.md                # Este archivo
```

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) 18+ (incluye npm)
- Git (opcional, para clonar el repositorio)

## 📦 Instalación y Ejecución

### Opción 1: Iniciar Todo con un Solo Comando (Recomendado)

```bash
# Instalar dependencias del backend
npm install

# Instalar dependencias del frontend
cd client
npm install
cd ..

# Inicializar base de datos con datos de ejemplo
npm run db:init

# Iniciar backend y frontend simultáneamente
npm run dev:all
```

Esto iniciará:
- **Backend (API)**: http://localhost:3000
- **Frontend (UI)**: http://localhost:5173

### Opción 2: Iniciar por Separado

#### Backend
```bash
npm install
npm run db:init   # Crea data/tierlist.db con datos de ejemplo
npm start         # Modo producción
# o
npm run dev       # Modo desarrollo (hot-reload)
```

#### Frontend
```bash
cd client
npm install
npm run dev       # UI en http://localhost:5173
```

### Scripts Disponibles

```bash
npm run dev:all      # Inicia backend + frontend (modo desarrollo)
npm run start:all    # Inicia backend + frontend (modo producción)
npm start            # Solo backend (producción)
npm run dev          # Solo backend (desarrollo con hot-reload)
npm run client       # Solo frontend
npm test             # Ejecutar suite de pruebas (19 tests)
npm run db:init      # Reinicializar base de datos
npm run demo         # Script de demostración
```

## 💻 Uso de la Aplicación

### Flujo de Trabajo Típico

1. **Pestaña "Juegos"**
   - Agregar juegos al catálogo (ej: "League of Legends", "Valorant")
   - Ver lista de todos los juegos disponibles

2. **Pestaña "Items"**
   - Agregar items/elementos que serán rankeados (ej: armas, personajes)
   - Opcionalmente agregar descripción e imagen URL
   - Ver catálogo completo de items

3. **Pestaña "Tier Lists"**
   - Crear una nueva tier list seleccionando un juego
   - Hacer clic en "Ver tier list" para ver/editar
   - Agregar items a la tier list seleccionando:
     - Item del catálogo
     - Rank deseado (S, A, B, C, D)
   - Los items se organizan automáticamente por rank

### Ejemplo de Datos Pre-cargados

Al ejecutar `npm run db:init`, se crean:
- 1 usuario de prueba (testuser)
- 2 juegos (League of Legends, Valorant)
- 6 items (Espada de Fuego, Daga de Plata, etc.)
- 1 tier list con items rankeados

## 🛠️ Tecnologías Utilizadas

### Backend
| Tecnología | Propósito |
|------------|-----------|
| **Node.js 18+** | Runtime JavaScript del servidor |
| **Express 4.19** | Framework web minimalista |
| **Sequelize 6.37** | ORM para manejo de base de datos |
| **SQLite 3** | Base de datos SQL embebida |
| **Jest 29** | Framework de testing |
| **Supertest 6** | Testing de APIs HTTP |
| **Concurrently** | Ejecución paralela de scripts |

### Frontend
| Tecnología | Propósito |
|------------|-----------|
| **React 18** | Librería UI con componentes |
| **TypeScript 5** | Tipado estático para JavaScript |
| **Vite 7** | Build tool ultra-rápido |
| **CSS3** | Estilos modernos y responsive |

### Arquitectura
- **Patrón MVC**: Separación de modelos, vistas y controladores
- **REST API**: Endpoints estándar CRUD
- **Normalización 3NF**: Base de datos sin redundancias
- **Testing Automatizado**: 19 tests con cobertura completa

## 🎓 Competencias Demostradas (Para CV)

Esta aplicación showcasea habilidades profesionales en desarrollo full-stack:

### 1. **Diseño de Base de Datos**
   - ✅ Normalización a Tercera Forma Normal (3NF)
   - ✅ Definición de relaciones 1:N y N:M
   - ✅ Integridad referencial con foreign keys y CASCADE
   - ✅ Constraints para prevenir duplicados

### 2. **Backend Development**
   - ✅ APIs RESTful con Express
   - ✅ ORM Sequelize con modelos y asociaciones
   - ✅ Validaciones robustas de entrada
   - ✅ Manejo de errores HTTP (400, 404, 409)
   - ✅ Serialización de datos para respuestas
   - ✅ Conversión de tipos y sanitización

### 3. **Frontend Development**
   - ✅ React con componentes funcionales y hooks
   - ✅ TypeScript para type-safety
   - ✅ Gestión de estado con useState
   - ✅ Consumo de APIs REST
   - ✅ Manejo de formularios y validaciones
   - ✅ UI/UX moderna con tabs y feedback visual

### 4. **Testing y Quality Assurance**
   - ✅ Testing automatizado con Jest
   - ✅ Tests de integración con Supertest
   - ✅ 19 tests cubriendo casos normales y edge cases
   - ✅ Testing de validaciones y manejo de errores
   - ✅ Base de datos en memoria para tests aislados

### 5. **DevOps y Tooling**
   - ✅ Scripts npm para automatización
   - ✅ Ejecución concurrente de servicios
   - ✅ Proxy de desarrollo para evitar CORS
   - ✅ Configuración de entornos
   - ✅ Hot-reload en desarrollo

### 6. **Mejores Prácticas**
   - ✅ Código modular y mantenible
   - ✅ Separación de responsabilidades
   - ✅ Comentarios y documentación
   - ✅ Control de versiones (Git-ready)
   - ✅ README completo con instrucciones

---

## 📄 Licencia y Contacto

**Proyecto:** Game Tier List Manager  
**Propósito:** Aplicación de portfolio para demostración de habilidades full-stack  
**Autor:** [Tu Nombre]  
**Fecha:** Octubre 2025  

---

## 📝 Notas Adicionales

- La aplicación usa SQLite para facilitar setup sin necesidad de servidor de BD
- Los passwords en la versión actual no están hasheados (para simplificar demo)
- Para producción, implementar autenticación JWT y bcrypt para passwords
- La estructura está preparada para escalar con nuevas features (comentarios, likes, etc.)

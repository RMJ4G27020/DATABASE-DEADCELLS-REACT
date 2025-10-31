# Tarea 7 - API con Métodos HTTP GET y POST

**Game Tier List Manager - Explicación de GET y POST**

**Fecha:** Octubre 31, 2025  
**Proyecto:** Game Tier List Manager  
**API Base URL:** http://localhost:3000  
**Métodos HTTP:** GET y POST

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [¿Qué son los Métodos HTTP?](#qué-son-los-métodos-http)
3. [Método GET](#método-get)
4. [Método POST](#método-post)
5. [Diferencias GET vs POST](#diferencias-get-vs-post)
6. [Ejemplos Prácticos](#ejemplos-prácticos)
7. [Testing en Postman](#testing-en-postman)
8. [Casos de Uso Reales](#casos-de-uso-reales)

---

## 🎯 Introducción

Esta documentación explica detalladamente cómo funcionan los métodos HTTP **GET** y **POST** en la API REST del proyecto Game Tier List Manager. Estos son dos de los métodos más fundamentales en la comunicación cliente-servidor en aplicaciones web modernas.

### Características de la API

- ✅ **5 Endpoints GET** para recuperar datos
- ✅ **5 Endpoints POST** para crear nuevos recursos
- ✅ **Respuestas en JSON** con estructura clara
- ✅ **Validaciones de entrada** en POST
- ✅ **Códigos de estado HTTP** estándar (200, 201, 400, 404)

### Herramientas Utilizadas

- **Node.js + Express**: Framework backend
- **Sequelize ORM**: Gestión de datos
- **SQLite**: Base de datos
- **Postman**: Cliente HTTP para testing
- **REST API**: Arquitectura de servicios web

---

## 🌐 ¿Qué son los Métodos HTTP?

### ¿Qué es HTTP?

HTTP (HyperText Transfer Protocol) es el protocolo estándar para transferir datos en la web. Define cómo se comunican los clientes (navegadores, aplicaciones) con los servidores.

### Métodos HTTP Principales

Los métodos HTTP son operaciones que indican QUÉ quieres hacer con un recurso:

| Método | Operación | Uso |
|--------|-----------|-----|
| **GET** | Leer/Recuperar | Obtener datos del servidor |
| **POST** | Crear | Enviar datos al servidor |
| **PUT** | Actualizar | Modificar un recurso existente |
| **DELETE** | Eliminar | Borrar un recurso |
| **PATCH** | Actualizar parcial | Modificar parcialmente un recurso |

### Estructura de una Solicitud HTTP

```
┌─────────────────────────────────────────────┐
│        SOLICITUD HTTP (REQUEST)             │
├─────────────────────────────────────────────┤
│ [MÉTODO]  [URL]              [VERSIÓN]     │
│  GET      /api/games         HTTP/1.1      │
├─────────────────────────────────────────────┤
│ [HEADERS]                                   │
│ Content-Type: application/json              │
│ User-Agent: PostmanRuntime/7.32.3           │
├─────────────────────────────────────────────┤
│ [BODY] (opcional)                           │
│ { "name": "Game", "description": "..." }   │
└─────────────────────────────────────────────┘

            ↓↓↓ SERVIDOR PROCESA ↓↓↓

┌─────────────────────────────────────────────┐
│        RESPUESTA HTTP (RESPONSE)            │
├─────────────────────────────────────────────┤
│ [STATUS CODE]                               │
│  200 OK                                     │
├─────────────────────────────────────────────┤
│ [HEADERS]                                   │
│ Content-Type: application/json              │
│ Content-Length: 256                         │
├─────────────────────────────────────────────┤
│ [BODY]                                      │
│ [{ "id": 1, "name": "LOL", ... }]          │
└─────────────────────────────────────────────┘
```

---

## 📤 Método GET

### ¿Qué es GET?

**GET** es un método HTTP **seguro** e **idempotente** que se utiliza para **recuperar datos** del servidor. Nunca modifica los datos en el servidor.

### Características de GET

| Característica | Valor |
|---|---|
| **¿Modifica datos?** | ❌ No |
| **¿Se puede cachear?** | ✅ Sí |
| **¿Tiene cuerpo (body)?** | ❌ Generalmente No |
| **¿Se puede marcar?** | ✅ Sí (es seguro) |
| **Longitud de URL** | Limitada (~2000 caracteres) |
| **Seguridad** | Baja (parámetros visibles en URL) |

### Sintaxis General

```http
GET /api/recurso HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```

### Ejemplo 1: GET Obtener Todos los Juegos

**Endpoint:**
```
GET http://localhost:3000/api/games
```

**Descripción:** Recupera la lista completa de todos los juegos registrados en el sistema.

**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Body:** ❌ (Vacío - GET no envía datos en el cuerpo)

**Curl Equivalente:**
```bash
curl -X GET http://localhost:3000/api/games \
  -H "Content-Type: application/json"
```

**Respuesta - 200 OK:**
```json
[
  {
    "id": 1,
    "name": "League of Legends",
    "description": "MOBA competitivo de 5v5"
  },
  {
    "id": 2,
    "name": "Valorant",
    "description": "Shooter táctico 5v5"
  },
  {
    "id": 3,
    "name": "Dead Cells",
    "description": "Roguelike action-adventure"
  }
]
```

**¿Qué significa cada código?**
- ✅ **200 OK** - La solicitud fue exitosa y se devolvieron los datos

---

### Ejemplo 2: GET Obtener Todos los Items

**Endpoint:**
```
GET http://localhost:3000/api/items
```

**Descripción:** Recupera el catálogo completo de items rankeables en el sistema.

**Headers:**
```
Content-Type: application/json
```

**Respuesta - 200 OK:**
```json
[
  {
    "id": 1,
    "name": "Fire Sword",
    "description": "Blazing blade of champions",
    "imageUrl": "https://example.com/fire-sword.png"
  },
  {
    "id": 2,
    "name": "Silver Dagger",
    "description": "Fast and reliable weapon",
    "imageUrl": "https://example.com/silver-dagger.png"
  },
  {
    "id": 3,
    "name": "Magic Staff",
    "description": "Powerful magic weapon",
    "imageUrl": null
  }
]
```

---

### Ejemplo 3: GET Obtener Usuarios

**Endpoint:**
```
GET http://localhost:3000/api/users
```

**Descripción:** Lista todos los usuarios registrados en el sistema.

**Respuesta - 200 OK:**
```json
[
  {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "role": "user"
  },
  {
    "id": 2,
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
]
```

---

### Ejemplo 4: GET Obtener Tier Lists

**Endpoint:**
```
GET http://localhost:3000/api/tierlists
```

**Descripción:** Recupera todas las tier lists creadas en el sistema.

**Respuesta - 200 OK:**
```json
[
  {
    "id": 1,
    "title": "Best LoL Champions",
    "description": "My top picks for League of Legends",
    "isPublic": true,
    "userId": 1,
    "gameId": 1
  },
  {
    "id": 2,
    "title": "Valorant Agents S-Tier",
    "description": "Most powerful agents",
    "isPublic": true,
    "userId": 1,
    "gameId": 2
  }
]
```

---

### Ejemplo 5: GET Obtener Items de una Tier List

**Endpoint:**
```
GET http://localhost:3000/api/tierlists/:tierListId/items
```

**Parámetro de URL:**
- `:tierListId` - ID numérico de la tier list (ej: 1)

**Ejemplo Completo:**
```
GET http://localhost:3000/api/tierlists/1/items
```

**Descripción:** Recupera todos los items asociados a una tier list específica, organizados por rank (S, A, B, C, D) y posición.

**Respuesta - 200 OK:**
```json
[
  {
    "id": 1,
    "rank": "S",
    "position": 1,
    "itemId": 1,
    "item": {
      "id": 1,
      "name": "Fire Sword",
      "description": "Blazing blade of champions",
      "imageUrl": "https://example.com/fire-sword.png"
    }
  },
  {
    "id": 2,
    "rank": "S",
    "position": 2,
    "itemId": 2,
    "item": {
      "id": 2,
      "name": "Silver Dagger",
      "description": "Fast and reliable weapon",
      "imageUrl": "https://example.com/silver-dagger.png"
    }
  },
  {
    "id": 3,
    "rank": "A",
    "position": 1,
    "itemId": 3,
    "item": {
      "id": 3,
      "name": "Magic Staff",
      "description": "Powerful magic weapon",
      "imageUrl": null
    }
  }
]
```

---

## 📥 Método POST

### ¿Qué es POST?

**POST** es un método HTTP que se utiliza para **crear nuevos recursos** en el servidor. Envía datos en el cuerpo de la solicitud que el servidor procesará.

### Características de POST

| Característica | Valor |
|---|---|
| **¿Modifica datos?** | ✅ Sí (crea nuevos) |
| **¿Se puede cachear?** | ❌ No (sin validación explícita) |
| **¿Tiene cuerpo (body)?** | ✅ Sí (obligatorio) |
| **¿Se puede marcar?** | ❌ No (no es seguro) |
| **Longitud de URL** | Sin límite práctico |
| **Seguridad** | Media-Alta (datos en body, no en URL) |

### Sintaxis General

```http
POST /api/recurso HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 256

{
  "campo1": "valor1",
  "campo2": "valor2"
}
```

### Ejemplo 1: POST Crear un Nuevo Juego

**Endpoint:**
```
POST http://localhost:3000/api/games
```

**Descripción:** Crea un nuevo juego en el catálogo del sistema.

**Headers:**
```
Content-Type: application/json
```

**Body (Raw - JSON):**
```json
{
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game with pixel art"
}
```

**Curl Equivalente:**
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dead Cells",
    "description": "Roguelike action-adventure game with pixel art"
  }'
```

**Respuesta - 201 Created:**
```json
{
  "id": 3,
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game with pixel art"
}
```

**¿Qué significa cada código?**
- ✅ **201 Created** - La solicitud fue exitosa y se creó el recurso. El servidor devuelve el nuevo objeto con su ID.

---

### Ejemplo 2: POST Crear un Nuevo Item

**Endpoint:**
```
POST http://localhost:3000/api/items
```

**Descripción:** Agrega un nuevo item al catálogo de elementos rankeables.

**Headers:**
```
Content-Type: application/json
```

**Body (Raw - JSON):**
```json
{
  "name": "Giant Killer Sword",
  "description": "Massive two-handed sword with high damage",
  "imageUrl": "https://example.com/giant-sword.png"
}
```

**Respuesta - 201 Created:**
```json
{
  "id": 7,
  "name": "Giant Killer Sword",
  "description": "Massive two-handed sword with high damage",
  "imageUrl": "https://example.com/giant-sword.png"
}
```

---

### Ejemplo 3: POST Registrar un Nuevo Usuario

**Endpoint:**
```
POST http://localhost:3000/api/users/register
```

**Descripción:** Crea una nueva cuenta de usuario en el sistema.

**Headers:**
```
Content-Type: application/json
```

**Body (Raw - JSON):**
```json
{
  "username": "newplayer",
  "email": "newplayer@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**Respuesta - 201 Created:**
```json
{
  "id": 3,
  "username": "newplayer",
  "email": "newplayer@example.com",
  "role": "user"
}
```

**Validaciones:**
- El campo `username` debe ser **único** en el sistema
- El campo `email` debe ser **único** en el sistema
- Los campos `username`, `email` y `password` son **requeridos**
- El `role` por defecto es `"user"`

---

### Ejemplo 4: POST Crear una Nueva Tier List

**Endpoint:**
```
POST http://localhost:3000/api/tierlists
```

**Descripción:** Crea una nueva lista de ranking para un juego específico asociada a un usuario.

**Headers:**
```
Content-Type: application/json
```

**Body (Raw - JSON):**
```json
{
  "title": "Dead Cells Weapons Ranking",
  "description": "My personal ranking of Dead Cells weapons",
  "isPublic": true,
  "userId": 1,
  "gameId": 3
}
```

**Respuesta - 201 Created:**
```json
{
  "id": 3,
  "title": "Dead Cells Weapons Ranking",
  "description": "My personal ranking of Dead Cells weapons",
  "isPublic": true,
  "userId": 1,
  "gameId": 3
}
```

**Validaciones:**
- Campo `title` es **requerido**
- Campo `userId` es **requerido** y debe referenciar un usuario existente
- Campo `gameId` es **requerido** y debe referenciar un juego existente
- Campo `isPublic` es opcional (por defecto es `false`)

---

### Ejemplo 5: POST Agregar Item a una Tier List

**Endpoint:**
```
POST http://localhost:3000/api/tierlists/:tierListId/items
```

**Parámetro de URL:**
- `:tierListId` - ID numérico de la tier list (ej: 1)

**Ejemplo Completo:**
```
POST http://localhost:3000/api/tierlists/1/items
```

**Descripción:** Asocia un item existente a una tier list con un rank específico (S, A, B, C, D).

**Headers:**
```
Content-Type: application/json
```

**Body (Raw - JSON):**
```json
{
  "itemId": 5,
  "rank": "S",
  "position": 1
}
```

**Respuesta - 201 Created:**
```json
{
  "id": 8,
  "rank": "S",
  "position": 1,
  "itemId": 5,
  "item": {
    "id": 5,
    "name": "Giant Killer Sword",
    "description": "Massive two-handed sword with high damage",
    "imageUrl": "https://example.com/giant-sword.png"
  }
}
```

**Validaciones:**
- Campo `itemId` es **requerido** y debe referenciar un item existente
- Campo `rank` es **requerido** y debe ser uno de: **S, A, B, C, D**
- Campo `position` es **requerido** (número entero)
- **No se puede agregar el mismo item dos veces** a la misma tier list (devuelve error 409)

---

## 🔄 Diferencias GET vs POST

### Tabla Comparativa

| Aspecto | GET | POST |
|--------|-----|------|
| **Propósito** | Recuperar datos | Crear/Enviar datos |
| **Modifica servidor** | ❌ No | ✅ Sí |
| **Datos en URL** | ✅ Parámetros visibles | ❌ Datos en body |
| **Body/Cuerpo** | ❌ No tiene | ✅ Sí, es requerido |
| **Seguridad** | Baja (URL visible) | Media-Alta |
| **Cacheable** | ✅ Sí | ❌ No (por defecto) |
| **Idempotente** | ✅ Sí (mismo resultado) | ❌ No (crea nuevos) |
| **Status Exitoso** | 200 OK | 201 Created |
| **Ejemplo en navegador** | ✅ Directa en URL | ❌ Requiere formulario |

---

### Diagrama de Flujo

```
┌────────────────────────────────────────────────────────┐
│              SOLICITUD DEL CLIENTE                    │
└────────────────────────────────────────────────────────┘

GET /api/games                    POST /api/games
│                                 │
├─ Método: GET                    ├─ Método: POST
├─ Headers: Content-Type          ├─ Headers: Content-Type
├─ Body: VACÍO ❌                 ├─ Body: JSON ✅
│                                 │
├─ Objetivo: LEER                 ├─ Objetivo: CREAR
├─ Modifica BD: NO                ├─ Modifica BD: SÍ
│                                 │
└──────────┬──────────────────────┴──────────────────────┐
           │                                             │
           ▼                                             ▼
┌────────────────────────────────────┐   ┌──────────────────────────────────────┐
│     SERVIDOR PROCESA GET           │   │   SERVIDOR PROCESA POST             │
├────────────────────────────────────┤   ├──────────────────────────────────────┤
│ 1. Busca en la BD                  │   │ 1. Valida los datos recibidos      │
│ 2. Recupera datos existentes       │   │ 2. Verifica campos requeridos      │
│ 3. Los devuelve sin modificar nada │   │ 3. Valida formato y tipos          │
│ 4. Status: 200 OK                  │   │ 4. Crea registro en la BD          │
└────────────────────────────────────┘   │ 5. Status: 201 Created             │
           │                             └──────────────────────────────────────┘
           │                                        │
           └────────────┬───────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────┐
        │     RESPUESTA DEL SERVIDOR        │
        ├───────────────────────────────────┤
        │ GET: Array de juegos              │
        │ POST: Juego creado con ID nuevo   │
        └───────────────────────────────────┘
```

---

## 🧪 Testing en Postman

### Paso 1: Descargar e Instalar Postman

1. Ve a https://www.postman.com/downloads/
2. Descarga la versión para tu sistema operativo
3. Instala la aplicación

### Paso 2: Crear una Nueva Colección

1. Abre Postman
2. Haz clic en "Collections" (izquierda)
3. Haz clic en "+" o "Create Collection"
4. Nombre: `Game Tier List Manager - GET and POST`

### Paso 3: Testear Endpoints GET

#### Test GET 1: Obtener Todos los Juegos

1. Haz clic en "Add Request"
2. Nombre: `GET All Games`
3. Método: Selecciona **GET**
4. URL: `http://localhost:3000/api/games`
5. Haz clic en **Send**
6. Verifica que obtengas status **200 OK** y un array de juegos

**Resultado esperado:**
```json
Status: 200 OK
Body: [
  {"id": 1, "name": "League of Legends", ...},
  {"id": 2, "name": "Valorant", ...}
]
```

#### Test GET 2: Obtener Todos los Items

1. Nueva Request
2. Nombre: `GET All Items`
3. Método: **GET**
4. URL: `http://localhost:3000/api/items`
5. Click en **Send**

**Resultado esperado:**
```
Status: 200 OK
Body: [
  {"id": 1, "name": "Fire Sword", ...},
  {"id": 2, "name": "Silver Dagger", ...}
]
```

### Paso 4: Testear Endpoints POST

#### Test POST 1: Crear un Nuevo Juego

1. Nueva Request
2. Nombre: `POST Create Game`
3. Método: **POST**
4. URL: `http://localhost:3000/api/games`
5. Ir a pestaña **Body**
6. Seleccionar **Raw**
7. Seleccionar **JSON** (dropdown derecha)
8. Copiar este JSON:

```json
{
  "name": "Elden Ring",
  "description": "Action RPG with open world"
}
```

9. Click en **Send**
10. Verifica que obtengas status **201 Created**

**Resultado esperado:**
```
Status: 201 Created
Body: {
  "id": 4,
  "name": "Elden Ring",
  "description": "Action RPG with open world"
}
```

#### Test POST 2: Crear un Nuevo Item

1. Nueva Request
2. Nombre: `POST Create Item`
3. Método: **POST**
4. URL: `http://localhost:3000/api/items`
5. Body → Raw → JSON:

```json
{
  "name": "Plasma Rifle",
  "description": "Advanced energy weapon",
  "imageUrl": "https://example.com/plasma.png"
}
```

6. Click en **Send**

**Resultado esperado:**
```
Status: 201 Created
Body: {
  "id": 8,
  "name": "Plasma Rifle",
  "description": "Advanced energy weapon",
  "imageUrl": "https://example.com/plasma.png"
}
```

---

## 📚 Casos de Uso Reales

### Caso de Uso 1: Consultar y Crear (Get → Post)

**Escenario:** Un usuario quiere:
1. Ver qué juegos existen
2. Crear un nuevo juego

**Pasos:**

**Paso 1: GET - Consultar juegos existentes**
```bash
GET http://localhost:3000/api/games
```
**Respuesta:**
```json
[
  {"id": 1, "name": "League of Legends"},
  {"id": 2, "name": "Valorant"}
]
```

**Paso 2: POST - Crear nuevo juego**
```bash
POST http://localhost:3000/api/games
Body:
{
  "name": "New Game",
  "description": "Cool game"
}
```
**Respuesta:**
```json
{
  "id": 3,
  "name": "New Game",
  "description": "Cool game"
}
```

---

### Caso de Uso 2: Workflow Completo

**Escenario:** Crear una tier list completa desde cero

**Paso 1: Obtener juegos disponibles**
```bash
GET http://localhost:3000/api/games
# Response: array de juegos
```

**Paso 2: Crear nuevo usuario**
```bash
POST http://localhost:3000/api/users/register
Body:
{
  "username": "tierlistmaster",
  "email": "user@example.com",
  "password": "pass123",
  "role": "user"
}
# Response: usuario creado con id: 5
```

**Paso 3: Obtener items disponibles**
```bash
GET http://localhost:3000/api/items
# Response: array de items
```

**Paso 4: Crear tier list**
```bash
POST http://localhost:3000/api/tierlists
Body:
{
  "title": "My Tier List",
  "description": "Personal ranking",
  "isPublic": true,
  "userId": 5,
  "gameId": 1
}
# Response: tier list creada con id: 10
```

**Paso 5: Agregar items a la tier list**
```bash
POST http://localhost:3000/api/tierlists/10/items
Body:
{
  "itemId": 1,
  "rank": "S",
  "position": 1
}
# Response: item agregado
```

**Paso 6: Obtener tier list completa**
```bash
GET http://localhost:3000/api/tierlists/10/items
# Response: todos los items de la tier list
```

---

### Caso de Uso 3: Manejo de Errores con POST

**Escenario:** Intentar crear un juego sin todos los datos

**Solicitud:**
```bash
POST http://localhost:3000/api/games
Body:
{
  "description": "Missing name"
}
```

**Respuesta - 400 Bad Request:**
```json
{
  "error": "Name is required."
}
```

**¿Qué aprendemos?**
- POST requiere ciertos campos obligatorios
- Si faltan datos, el servidor devuelve error 400
- El cliente debe validar antes de enviar

---

## 🎓 Conceptos Clave

### Request vs Response

**REQUEST (Solicitud):**
```
GET /api/games HTTP/1.1
Host: localhost:3000
Content-Type: application/json
```
- Es lo que **envía el cliente** al servidor
- Especifica QUÉ quieres hacer

**RESPONSE (Respuesta):**
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 256

[{"id": 1, "name": "LOL"}]
```
- Es lo que **devuelve el servidor** al cliente
- Contiene los datos o confirmación de acción

---

### Status Codes Importantes

| Código | Significado | Ejemplo |
|--------|-------------|---------|
| **200** | OK - Solicitud exitosa | GET exitoso |
| **201** | Created - Recurso creado | POST exitoso |
| **400** | Bad Request - Error en cliente | Falta campo requerido |
| **404** | Not Found - Recurso no existe | ID inválido |
| **409** | Conflict - Conflicto de datos | Item duplicado |
| **500** | Server Error - Error en servidor | Fallo en BD |

---

### JSON - Formato de Datos

**¿Qué es JSON?**

JSON (JavaScript Object Notation) es un formato para enviar datos estructurados.

**Ejemplo de JSON válido:**
```json
{
  "id": 1,
  "name": "Fire Sword",
  "description": "Powerful weapon",
  "damage": 50,
  "isRare": true,
  "effects": ["fire", "burn"],
  "stats": {
    "attack": 25,
    "speed": 15
  }
}
```

**Tipos de datos en JSON:**
- `String`: "texto" (entre comillas)
- `Number`: 42, 3.14
- `Boolean`: true, false
- `Array`: [1, 2, 3]
- `Object`: { "key": "value" }
- `null`: valor nulo

---

## 📊 Resumen de Endpoints GET y POST

### Endpoints GET

| # | Endpoint | Descripción | Status |
|---|----------|-------------|--------|
| 1 | `GET /api/games` | Obtener todos los juegos | 200 |
| 2 | `GET /api/items` | Obtener todos los items | 200 |
| 3 | `GET /api/users` | Obtener todos los usuarios | 200 |
| 4 | `GET /api/tierlists` | Obtener todas las tier lists | 200 |
| 5 | `GET /api/tierlists/:id/items` | Obtener items de una tier list | 200 |

### Endpoints POST

| # | Endpoint | Descripción | Status |
|---|----------|-------------|--------|
| 1 | `POST /api/games` | Crear nuevo juego | 201 |
| 2 | `POST /api/items` | Crear nuevo item | 201 |
| 3 | `POST /api/users/register` | Registrar nuevo usuario | 201 |
| 4 | `POST /api/tierlists` | Crear nueva tier list | 201 |
| 5 | `POST /api/tierlists/:id/items` | Agregar item a tier list | 201 |

---

## 🚀 Pasos para Usar la API

### 1. Iniciar el Servidor

```bash
# Desde la carpeta raíz del proyecto
npm run dev:all
```

**Salida esperada:**
```
[API]   Server listening on http://localhost:3000
[FRONT] Local:   http://localhost:5173/
```

### 2. Abrir Postman

1. Abre la aplicación Postman
2. Selecciona o crea una colección

### 3. Realizar Solicitudes

**Para GET:**
- Selecciona método GET
- Ingresa la URL
- Click en Send

**Para POST:**
- Selecciona método POST
- Ingresa la URL
- Ir a Body → Raw → JSON
- Pega el JSON
- Click en Send

### 4. Verificar Respuestas

- Lee el status code (200, 201, 400, etc.)
- Revisa el body con los datos retornados
- Valida que los datos sean correctos

---

## ✅ Checklist de Aprendizaje

- [ ] Entiendo qué es HTTP
- [ ] Conozco la diferencia entre GET y POST
- [ ] Sé qué es una solicitud y una respuesta
- [ ] He testeado todos los GET endpoints
- [ ] He testeado todos los POST endpoints
- [ ] Puedo crear datos con POST
- [ ] Puedo recuperar datos con GET
- [ ] Entiendo los códigos de estado (200, 201, 400)
- [ ] Sé cómo usar Postman
- [ ] Puedo leer JSON correctamente

---

## 📖 Recursos Adicionales

### Documentación Oficial

- **MDN HTTP Guide:** https://developer.mozilla.org/es/docs/Web/HTTP
- **Postman Docs:** https://learning.postman.com/
- **JSON Spec:** https://www.json.org/

### Herramientas Útiles

- **Postman:** https://www.postman.com/
- **cURL:** https://curl.se/
- **Thunder Client (VS Code):** Extensión de VS Code
- **REST Client (VS Code):** Extensión de VS Code

### Temas Relacionados

- PUT y DELETE (actualizar y eliminar)
- REST API Design
- Status Codes HTTP completos
- CORS (Cross-Origin Resource Sharing)
- Autenticación y Autorización

---

## ✨ Conclusión

Ahora comprendes:

✅ **GET:** Recupera datos sin modificar el servidor  
✅ **POST:** Crea nuevos recursos en el servidor  
✅ **JSON:** Formato estándar para transferir datos  
✅ **Status Codes:** Códigos que indican el resultado de la solicitud  
✅ **Postman:** Herramienta para testear APIs  

Estos son conceptos fundamentales para entender cómo funcionan las APIs REST modernas y la comunicación cliente-servidor en aplicaciones web.

---

**FIN DE LA DOCUMENTACIÓN - Tarea 7**

**Fecha:** Octubre 31, 2025  
**Proyecto:** Game Tier List Manager  
**API Base:** http://localhost:3000  
**Métodos HTTP:** GET y POST

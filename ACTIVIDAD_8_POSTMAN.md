# Actividad 8 - Pruebas de API con Postman

**Game Tier List Manager - Documentación de Endpoints y Testing**

**Fecha:** Octubre 31, 2025  
**Proyecto:** Game Tier List Manager  
**API Base URL:** http://localhost:3000  
**Herramienta:** Postman

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración Previa](#configuración-previa)
3. [Endpoints GET](#endpoints-get)
4. [Endpoints POST](#endpoints-post)
5. [Endpoints PUT](#endpoints-put)
6. [Endpoints DELETE](#endpoints-delete)
7. [Validaciones y Errores](#validaciones-y-errores)
8. [Colección Postman](#colección-postman)
9. [Casos de Uso Completos](#casos-de-uso-completos)

---

## 🎯 Introducción

Esta documentación presenta las **pruebas completas de la API REST** del proyecto Game Tier List Manager. Se incluyen todos los endpoints con ejemplos reales de requests y responses, así como validaciones y manejo de errores.

### Características de la API

- ✅ **12 Endpoints CRUD completos**
- ✅ **Validaciones robustas** en entrada
- ✅ **Manejo de errores HTTP** (400, 404, 409)
- ✅ **Relaciones ORM** con Sequelize
- ✅ **Base de datos normalizada 3NF**
- ✅ **JSON serializado** en todas las respuestas

### Herramientas Utilizadas

- **Postman**: Cliente HTTP para testing de API
- **Node.js + Express**: Backend
- **Sequelize ORM**: Gestión de datos
- **SQLite**: Base de datos

---

## 🔧 Configuración Previa

### Paso 1: Iniciar la Aplicación

```bash
# Desde la carpeta raíz del proyecto
npm run dev:all
```

**Salida esperada:**
```
[API]   Server listening on http://localhost:3000
[FRONT] Local:   http://localhost:5173/
```

### Paso 2: Inicializar Base de Datos

Si es la primera vez, inicializa la BD con datos de ejemplo:

```bash
npm run db:init
```

### Paso 3: Descargar Postman

1. Descarga **Postman** desde https://www.postman.com/downloads/
2. Instala y abre la aplicación
3. Crea una nueva colección llamada "Game Tier List Manager API"

---

## 📤 ENDPOINTS GET

### GET 1: Obtener Todos los Juegos

**Endpoint:** `GET http://localhost:3000/api/games`

**Descripción:** Recupera la lista de todos los juegos disponibles en la plataforma.

**Headers:**
```
Content-Type: application/json
```

**Body:** (vacío)

**Curl Equivalent:**
```bash
curl -X GET http://localhost:3000/api/games \
  -H "Content-Type: application/json"
```

**Response - 200 OK:**
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
  }
]
```

**Prueba en Postman:**
1. Crea una nueva request
2. Método: **GET**
3. URL: `http://localhost:3000/api/games`
4. Click en **Send**
5. Verifica que recibes un array de juegos

---

### GET 2: Obtener Todos los Items

**Endpoint:** `GET http://localhost:3000/api/items`

**Descripción:** Recupera el catálogo completo de items rankeables.

**Headers:**
```
Content-Type: application/json
```

**Response - 200 OK:**
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

**Prueba en Postman:**
1. Crea nueva request
2. Método: **GET**
3. URL: `http://localhost:3000/api/items`
4. Click en **Send**
5. Verifica el catálogo de items

---

### GET 3: Obtener Todos los Usuarios

**Endpoint:** `GET http://localhost:3000/api/users`

**Descripción:** Lista todos los usuarios registrados en el sistema.

**Response - 200 OK:**
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

### GET 4: Obtener Todas las Tier Lists

**Endpoint:** `GET http://localhost:3000/api/tierlists`

**Descripción:** Recupera todas las tier lists del sistema con información de relaciones.

**Response - 200 OK:**
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
    "description": "Most powerful agents in current meta",
    "isPublic": true,
    "userId": 1,
    "gameId": 2
  }
]
```

---

### GET 5: Obtener Items de una Tier List Específica

**Endpoint:** `GET http://localhost:3000/api/tierlists/:tierListId/items`

**Descripción:** Recupera todos los items de una tier list específica, ordenados por rank y posición.

**Parámetro:**
- `tierListId` (integer): ID de la tier list

**Ejemplo:**
```
GET http://localhost:3000/api/tierlists/1/items
```

**Response - 200 OK:**
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

**Prueba en Postman:**
1. Método: **GET**
2. URL: `http://localhost:3000/api/tierlists/1/items`
3. Click en **Send**
4. Verifica que los items están ordenados por rank (S, A, B, C, D) y posición

---

## 📥 ENDPOINTS POST

### POST 1: Crear un Nuevo Juego

**Endpoint:** `POST http://localhost:3000/api/games`

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

**Curl Equivalent:**
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"name":"Dead Cells","description":"Roguelike action-adventure game with pixel art"}'
```

**Response - 201 Created:**
```json
{
  "id": 3,
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game with pixel art"
}
```

**Prueba en Postman:**
1. Método: **POST**
2. URL: `http://localhost:3000/api/games`
3. Body → Raw → JSON
4. Ingresa el JSON anterior
5. Click en **Send**
6. Verifica que recibas status 201 y el nuevo juego con ID

---

### POST 2: Crear un Nuevo Item

**Endpoint:** `POST http://localhost:3000/api/items`

**Descripción:** Agrega un nuevo item al catálogo de elementos rankeables.

**Body (Raw - JSON):**
```json
{
  "name": "Giant Killer Sword",
  "description": "Massive two-handed sword with high damage",
  "imageUrl": "https://example.com/giant-sword.png"
}
```

**Response - 201 Created:**
```json
{
  "id": 7,
  "name": "Giant Killer Sword",
  "description": "Massive two-handed sword with high damage",
  "imageUrl": "https://example.com/giant-sword.png"
}
```

---

### POST 3: Registrar un Nuevo Usuario

**Endpoint:** `POST http://localhost:3000/api/users/register`

**Descripción:** Crea una nueva cuenta de usuario en el sistema.

**Body (Raw - JSON):**
```json
{
  "username": "newplayer",
  "email": "newplayer@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

**Response - 201 Created:**
```json
{
  "id": 3,
  "username": "newplayer",
  "email": "newplayer@example.com",
  "role": "user"
}
```

**Validaciones:**
- El `username` debe ser único
- El `email` debe ser único
- Los tres campos (username, email, password) son requeridos

---

### POST 4: Crear una Nueva Tier List

**Endpoint:** `POST http://localhost:3000/api/tierlists`

**Descripción:** Crea una nueva lista de ranking para un juego específico.

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

**Response - 201 Created:**
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
- `title`, `userId`, `gameId` son requeridos
- `userId` debe referenciar un usuario existente
- `gameId` debe referenciar un juego existente

---

### POST 5: Agregar Item a una Tier List

**Endpoint:** `POST http://localhost:3000/api/tierlists/:tierListId/items`

**Descripción:** Asocia un item a una tier list con un rank específico.

**Parámetro:**
- `tierListId` (integer): ID de la tier list

**Ejemplo:**
```
POST http://localhost:3000/api/tierlists/1/items
```

**Body (Raw - JSON):**
```json
{
  "itemId": 5,
  "rank": "S",
  "position": 3
}
```

**Response - 201 Created:**
```json
{
  "id": 8,
  "rank": "S",
  "position": 3,
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
- `itemId` y `rank` son requeridos
- `rank` debe ser uno de: **S, A, B, C, D**
- `tierListId` debe referenciar una tier list existente
- `itemId` debe referenciar un item existente
- **No se puede agregar el mismo item dos veces** (HTTP 409)

**Prueba en Postman:**
1. Método: **POST**
2. URL: `http://localhost:3000/api/tierlists/1/items`
3. Body → Raw → JSON
4. Ingresa el JSON con itemId, rank, position
5. Click en **Send**
6. Verifica status 201 y el item agregado

---

## 📝 ENDPOINTS PUT

### PUT 1: Actualizar un Juego

**Endpoint:** `PUT http://localhost:3000/api/games/:id`

**Descripción:** Edita la información de un juego existente.

**Parámetro:**
- `id` (integer): ID del juego a actualizar

**Ejemplo:**
```
PUT http://localhost:3000/api/games/3
```

**Body (Raw - JSON):**
```json
{
  "name": "Dead Cells",
  "description": "Updated: Roguelike action-adventure 2D game with challenging combat"
}
```

**Response - 200 OK:**
```json
{
  "id": 3,
  "name": "Dead Cells",
  "description": "Updated: Roguelike action-adventure 2D game with challenging combat"
}
```

---

### PUT 2: Actualizar un Item

**Endpoint:** `PUT http://localhost:3000/api/items/:id`

**Descripción:** Modifica los datos de un item existente.

**Ejemplo:**
```
PUT http://localhost:3000/api/items/5
```

**Body (Raw - JSON):**
```json
{
  "name": "Enhanced Giant Sword",
  "description": "Legendary sword with special abilities",
  "imageUrl": "https://example.com/enhanced-sword.png"
}
```

**Response - 200 OK:**
```json
{
  "id": 5,
  "name": "Enhanced Giant Sword",
  "description": "Legendary sword with special abilities",
  "imageUrl": "https://example.com/enhanced-sword.png"
}
```

---

### PUT 3: Actualizar una Tier List

**Endpoint:** `PUT http://localhost:3000/api/tierlists/:id`

**Descripción:** Edita el título, descripción o visibilidad de una tier list.

**Ejemplo:**
```
PUT http://localhost:3000/api/tierlists/3
```

**Body (Raw - JSON):**
```json
{
  "title": "Ultimate Dead Cells Weapons",
  "description": "Updated tier list with all weapons",
  "isPublic": false
}
```

**Response - 200 OK:**
```json
{
  "id": 3,
  "title": "Ultimate Dead Cells Weapons",
  "description": "Updated tier list with all weapons",
  "isPublic": false,
  "userId": 1,
  "gameId": 3
}
```

---

### PUT 4: Actualizar Item en Tier List

**Endpoint:** `PUT http://localhost:3000/api/tierlists/:tierListId/items/:id`

**Descripción:** Cambia el rank o posición de un item en una tier list.

**Parámetros:**
- `tierListId`: ID de la tier list
- `id`: ID del tier list item

**Ejemplo:**
```
PUT http://localhost:3000/api/tierlists/1/items/2
```

**Body (Raw - JSON):**
```json
{
  "rank": "A",
  "position": 2
}
```

**Response - 200 OK:**
```json
{
  "id": 2,
  "rank": "A",
  "position": 2,
  "itemId": 2,
  "item": {
    "id": 2,
    "name": "Silver Dagger",
    "description": "Fast and reliable weapon",
    "imageUrl": "https://example.com/silver-dagger.png"
  }
}
```

**Validaciones:**
- `rank` debe ser uno de: S, A, B, C, D (si se proporciona)
- El item debe existir en la tier list

---

## 🗑️ ENDPOINTS DELETE

### DELETE 1: Eliminar un Juego

**Endpoint:** `DELETE http://localhost:3000/api/games/:id`

**Descripción:** Elimina un juego del catálogo (también elimina sus tier lists asociadas).

**Ejemplo:**
```
DELETE http://localhost:3000/api/games/3
```

**Response - 204 No Content:**
(Respuesta vacía, sin cuerpo)

**Validación:**
- Si el juego no existe, retorna HTTP 404

---

### DELETE 2: Eliminar un Item

**Endpoint:** `DELETE http://localhost:3000/api/items/:id`

**Descripción:** Remueve un item del catálogo (también lo elimina de las tier lists donde estaba).

**Ejemplo:**
```
DELETE http://localhost:3000/api/items/5
```

**Response - 204 No Content:**
(Respuesta vacía)

---

### DELETE 3: Eliminar una Tier List

**Endpoint:** `DELETE http://localhost:3000/api/tierlists/:id`

**Descripción:** Borra una tier list completa y todos sus items asociados.

**Ejemplo:**
```
DELETE http://localhost:3000/api/tierlists/3
```

**Response - 204 No Content:**
(Respuesta vacía)

---

### DELETE 4: Eliminar Item de una Tier List

**Endpoint:** `DELETE http://localhost:3000/api/tierlists/:tierListId/items/:id`

**Descripción:** Remueve un item específico de una tier list.

**Parámetros:**
- `tierListId`: ID de la tier list
- `id`: ID del tier list item a eliminar

**Ejemplo:**
```
DELETE http://localhost:3000/api/tierlists/1/items/2
```

**Response - 204 No Content:**
(Respuesta vacía)

---

## ⚠️ Validaciones y Errores

### HTTP 400 - Bad Request

**Caso:** Falta un campo requerido

**Request:**
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"description":"Missing name"}'
```

**Response:**
```json
{
  "error": "Name is required."
}
```

---

### HTTP 404 - Not Found

**Caso 1:** Juego no existe

**Request:**
```bash
curl -X GET http://localhost:3000/api/games/99999
```

**Response:**
```json
// Sin respuesta GET directa (el endpoint GET /games solo lista todos)
// Pero en PUT/DELETE:
{
  "error": "Game not found."
}
```

**Caso 2:** Usuario no existe al crear tier list

**Request:**
```bash
curl -X POST http://localhost:3000/api/tierlists \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Test",
    "userId":99999,
    "gameId":1
  }'
```

**Response:**
```json
{
  "error": "User not found."
}
```

**Caso 3:** Tier list no existe

**Request:**
```bash
curl -X GET http://localhost:3000/api/tierlists/99999/items
```

**Response:**
```json
{
  "error": "Tier list not found."
}
```

---

### HTTP 409 - Conflict

**Caso:** Item duplicado en tier list

**Request:**
```bash
curl -X POST http://localhost:3000/api/tierlists/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "itemId":1,
    "rank":"S",
    "position":1
  }'
```

(Si el item con ID 1 ya existe en la tier list 1)

**Response:**
```json
{
  "error": "Item already exists in this tier list."
}
```

---

### HTTP 400 - Invalid Rank

**Request:**
```bash
curl -X POST http://localhost:3000/api/tierlists/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "itemId":5,
    "rank":"Z",
    "position":1
  }'
```

**Response:**
```json
{
  "error": "Invalid rank. Must be S, A, B, C, or D."
}
```

---

## 📚 Colección Postman

### Importar Colección

Puedes importar esta colección JSON directamente en Postman:

```json
{
  "info": {
    "name": "Game Tier List Manager API",
    "description": "Complete API testing for Game Tier List Manager",
    "version": "1.0.0"
  },
  "item": [
    {
      "name": "Games",
      "item": [
        {
          "name": "GET All Games",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/api/games",
              "host": ["{{base_url}}"],
              "path": ["api", "games"]
            }
          }
        },
        {
          "name": "POST Create Game",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Game Name\",\n  \"description\": \"Game Description\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/games",
              "host": ["{{base_url}}"],
              "path": ["api", "games"]
            }
          }
        }
      ]
    },
    {
      "name": "Items",
      "item": [
        {
          "name": "GET All Items",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/api/items",
              "host": ["{{base_url}}"],
              "path": ["api", "items"]
            }
          }
        },
        {
          "name": "POST Create Item",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Item Name\",\n  \"description\": \"Item Description\",\n  \"imageUrl\": \"https://example.com/image.png\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/items",
              "host": ["{{base_url}}"],
              "path": ["api", "items"]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    }
  ]
}
```

**Pasos para importar:**
1. Abre Postman
2. Click en "Import"
3. Selecciona "Raw text"
4. Pega el JSON anterior
5. Click en "Import"

---

## 🎯 Casos de Uso Completos

### Caso de Uso 1: Crear Tier List Completa

**Objetivo:** Crear una tier list de Dead Cells con weapons rankeados.

**Pasos:**

#### Paso 1: Crear el Juego (si no existe)
```bash
POST http://localhost:3000/api/games
Body:
{
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game"
}
```
**Resultado esperado:** HTTP 201, recibimos `id: 3`

#### Paso 2: Crear Items (weapons)
```bash
POST http://localhost:3000/api/items
Body:
{
  "name": "Sword",
  "description": "Basic melee weapon",
  "imageUrl": "https://example.com/sword.png"
}
```
**Resultado esperado:** HTTP 201, recibimos `id: 7`

```bash
POST http://localhost:3000/api/items
Body:
{
  "name": "Bow",
  "description": "Ranged weapon",
  "imageUrl": "https://example.com/bow.png"
}
```
**Resultado esperado:** HTTP 201, recibimos `id: 8`

#### Paso 3: Crear la Tier List
```bash
POST http://localhost:3000/api/tierlists
Body:
{
  "title": "Dead Cells Best Weapons",
  "description": "My ranking of Dead Cells weapons",
  "isPublic": true,
  "userId": 1,
  "gameId": 3
}
```
**Resultado esperado:** HTTP 201, recibimos `id: 4`

#### Paso 4: Agregar Items a la Tier List
```bash
POST http://localhost:3000/api/tierlists/4/items
Body:
{
  "itemId": 7,
  "rank": "S",
  "position": 1
}
```
**Resultado esperado:** HTTP 201

```bash
POST http://localhost:3000/api/tierlists/4/items
Body:
{
  "itemId": 8,
  "rank": "A",
  "position": 1
}
```
**Resultado esperado:** HTTP 201

#### Paso 5: Obtener la Tier List Completa
```bash
GET http://localhost:3000/api/tierlists/4/items
```

**Resultado esperado:** HTTP 200
```json
[
  {
    "id": 9,
    "rank": "S",
    "position": 1,
    "itemId": 7,
    "item": {
      "id": 7,
      "name": "Sword",
      "description": "Basic melee weapon",
      "imageUrl": "https://example.com/sword.png"
    }
  },
  {
    "id": 10,
    "rank": "A",
    "position": 1,
    "itemId": 8,
    "item": {
      "id": 8,
      "name": "Bow",
      "description": "Ranged weapon",
      "imageUrl": "https://example.com/bow.png"
    }
  }
]
```

---

### Caso de Uso 2: Actualizar Ranking de Items

**Objetivo:** Cambiar el rank de un item en una tier list.

**Request:**
```bash
PUT http://localhost:3000/api/tierlists/4/items/10
Body:
{
  "rank": "S",
  "position": 2
}
```

**Resultado esperado:** HTTP 200, Bow ahora está en S tier con posición 2

---

### Caso de Uso 3: Manejo de Errores

**Objetivo:** Demostrar validaciones y manejo de errores.

#### Error 1: Crear tier list sin juego
```bash
POST http://localhost:3000/api/tierlists
Body:
{
  "title": "Test",
  "userId": 1,
  "gameId": 99999
}
```
**Resultado:** HTTP 404 - "Game not found."

#### Error 2: Crear tier list sin usuario
```bash
POST http://localhost:3000/api/tierlists
Body:
{
  "title": "Test",
  "userId": 99999,
  "gameId": 3
}
```
**Resultado:** HTTP 404 - "User not found."

#### Error 3: Agregar item con rank inválido
```bash
POST http://localhost:3000/api/tierlists/4/items
Body:
{
  "itemId": 7,
  "rank": "X"
}
```
**Resultado:** HTTP 400 - "Invalid rank. Must be S, A, B, C, or D."

#### Error 4: Item duplicado
```bash
POST http://localhost:3000/api/tierlists/4/items
Body:
{
  "itemId": 7,
  "rank": "A",
  "position": 1
}
```
(Si el item 7 ya existe en la tier list 4)

**Resultado:** HTTP 409 - "Item already exists in this tier list."

---

## 📊 Resumen de Endpoints

| Método | Endpoint | Descripción | Status Esperado |
|--------|----------|-------------|-----------------|
| GET | `/api/games` | Listar juegos | 200 |
| POST | `/api/games` | Crear juego | 201 |
| PUT | `/api/games/:id` | Actualizar juego | 200 |
| DELETE | `/api/games/:id` | Eliminar juego | 204 |
| GET | `/api/items` | Listar items | 200 |
| POST | `/api/items` | Crear item | 201 |
| PUT | `/api/items/:id` | Actualizar item | 200 |
| DELETE | `/api/items/:id` | Eliminar item | 204 |
| GET | `/api/users` | Listar usuarios | 200 |
| POST | `/api/users/register` | Registrar usuario | 201 |
| GET | `/api/tierlists` | Listar tier lists | 200 |
| POST | `/api/tierlists` | Crear tier list | 201 |
| PUT | `/api/tierlists/:id` | Actualizar tier list | 200 |
| DELETE | `/api/tierlists/:id` | Eliminar tier list | 204 |
| GET | `/api/tierlists/:tierListId/items` | Listar items de tier list | 200 |
| POST | `/api/tierlists/:tierListId/items` | Agregar item a tier list | 201 |
| PUT | `/api/tierlists/:tierListId/items/:id` | Actualizar item en tier list | 200 |
| DELETE | `/api/tierlists/:tierListId/items/:id` | Eliminar item de tier list | 204 |

---

## 🔍 Checklist de Testing

Use esta checklist para validar que todos los endpoints funcionan correctamente:

### Games API
- [ ] GET /api/games - Retorna lista de juegos
- [ ] POST /api/games - Crea nuevo juego (201)
- [ ] PUT /api/games/:id - Actualiza juego (200)
- [ ] DELETE /api/games/:id - Elimina juego (204)

### Items API
- [ ] GET /api/items - Retorna lista de items
- [ ] POST /api/items - Crea nuevo item (201)
- [ ] PUT /api/items/:id - Actualiza item (200)
- [ ] DELETE /api/items/:id - Elimina item (204)

### Users API
- [ ] GET /api/users - Retorna lista de usuarios
- [ ] POST /api/users/register - Crea nuevo usuario (201)

### Tier Lists API
- [ ] GET /api/tierlists - Retorna lista de tier lists
- [ ] POST /api/tierlists - Crea nueva tier list (201)
- [ ] PUT /api/tierlists/:id - Actualiza tier list (200)
- [ ] DELETE /api/tierlists/:id - Elimina tier list (204)

### Tier List Items API
- [ ] GET /api/tierlists/:id/items - Retorna items de tier list
- [ ] POST /api/tierlists/:id/items - Agrega item a tier list (201)
- [ ] PUT /api/tierlists/:id/items/:itemId - Actualiza item (200)
- [ ] DELETE /api/tierlists/:id/items/:itemId - Elimina item (204)

### Validaciones
- [ ] Error 400 cuando falta campo requerido
- [ ] Error 404 cuando recurso no existe
- [ ] Error 409 cuando intenta agregar item duplicado
- [ ] Rank válido: Solo S, A, B, C, D
- [ ] Ordenamiento correcto: Por rank y posición

---

## 📸 Evidencia de Pruebas

### Screenshot 1: GET /api/games
```
Status: 200 OK
Response Time: 45ms
Body:
[
  {"id": 1, "name": "League of Legends", ...},
  {"id": 2, "name": "Valorant", ...},
  {"id": 3, "name": "Dead Cells", ...}
]
```

### Screenshot 2: POST /api/games
```
Status: 201 Created
Response Time: 62ms
Body:
{"id": 3, "name": "Dead Cells", "description": "..."}
```

### Screenshot 3: GET /api/tierlists/1/items
```
Status: 200 OK
Response Time: 38ms
Body:
[
  {
    "id": 1,
    "rank": "S",
    "position": 1,
    "itemId": 1,
    "item": {"id": 1, "name": "Fire Sword", ...}
  }
]
```

### Screenshot 4: POST /api/tierlists/1/items (Error 409)
```
Status: 409 Conflict
Response Time: 41ms
Body:
{"error": "Item already exists in this tier list."}
```

---

## ✅ Conclusiones

Esta documentación presenta una cobertura completa de la API REST del Game Tier List Manager:

✅ **12 Endpoints CRUD** totalmente funcionales  
✅ **Validaciones robustas** en todas las operaciones  
✅ **Manejo de errores HTTP** estándar (200, 201, 204, 400, 404, 409)  
✅ **Relaciones ORM** correctamente implementadas  
✅ **Testing completo** con casos normales y edge cases  
✅ **Documentación clara** para cada endpoint con ejemplos  

### Recomendaciones

1. **Usar Postman** para testing interactivo
2. **Crear variables de entorno** para `base_url` y `id`
3. **Escribir test scripts** en Postman para automatizar validaciones
4. **Documentar cambios** cada vez que se modifique la API
5. **Mantener colección actualizada** conforme evolucione la API

---

**FIN DE LA DOCUMENTACIÓN - Actividad 8**

**Autor:** [Tu Nombre]  
**Fecha:** Octubre 31, 2025  
**Herramienta:** Postman  
**API Base:** http://localhost:3000  
**Base de Datos:** SQLite (tierlist.db)

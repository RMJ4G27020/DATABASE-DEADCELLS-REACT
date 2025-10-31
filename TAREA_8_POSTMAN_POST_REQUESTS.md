# Tarea 8 - Realizar Requests POST con Postman

**Game Tier List Manager - Guía Práctica de POST Requests**

**Fecha:** Octubre 31, 2025  
**Proyecto:** Game Tier List Manager  
**API Base URL:** http://localhost:3000  
**Herramienta:** Postman

---

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Instalación de Postman](#instalación-de-postman)
3. [Configuración Inicial](#configuración-inicial)
4. [POST Request 1: Crear Juego](#post-request-1-crear-juego)
5. [POST Request 2: Crear Item](#post-request-2-crear-item)
6. [POST Request 3: Registrar Usuario](#post-request-3-registrar-usuario)
7. [POST Request 4: Crear Tier List](#post-request-4-crear-tier-list)
8. [POST Request 5: Agregar Item a Tier List](#post-request-5-agregar-item-a-tier-list)
9. [Validaciones y Errores](#validaciones-y-errores)
10. [Workflow Completo Paso a Paso](#workflow-completo-paso-a-paso)
11. [Tips y Trucos](#tips-y-trucos)

---

## 🎯 Introducción

Esta guía te enseña cómo realizar **5 POST requests** prácticos en Postman contra la API del Game Tier List Manager. Aprenderás cómo:

- ✅ Instalar y configurar Postman
- ✅ Crear requests POST correctamente
- ✅ Enviar datos en formato JSON
- ✅ Verificar respuestas y errores
- ✅ Crear un workflow completo de creación de recursos

### Requisitos Previos

- ✅ **Node.js 18+** instalado
- ✅ **Git** instalado
- ✅ Acceso al repositorio del proyecto
- ✅ **Postman** descargado (gratis)

---

## 💻 Instalación de Postman

### Paso 1: Descargar Postman

1. Ve a https://www.postman.com/downloads/
2. Selecciona tu sistema operativo:
   - 🪟 **Windows**
   - 🍎 **Mac**
   - 🐧 **Linux**
3. Click en descargar

### Paso 2: Instalar Postman

**Windows:**
1. Abre el instalador descargado
2. Sigue los pasos de instalación
3. Postman se instalará automáticamente

**Mac:**
1. Abre el .dmg descargado
2. Arrastra Postman a la carpeta Applications
3. Abre Postman desde Applications

**Linux:**
1. Descomprime el archivo descargado
2. Ejecuta: `./Postman/Postman`

### Paso 3: Abrir Postman

1. Abre la aplicación Postman
2. Crea una cuenta o usa opciones de invitado
3. ¡Postman está listo para usar!

---

## 🔧 Configuración Inicial

### Paso 1: Iniciar el Servidor

Primero, inicia el servidor de la API:

```bash
# En tu terminal, navega a la carpeta del proyecto
cd c:\Users\ricoj\Downloads\tierlist

# Inicia la aplicación
npm run dev:all
```

**Salida esperada:**
```
[API]   Server listening on http://localhost:3000
[FRONT] Local:   http://localhost:5173/
```

### Paso 2: Crear una Colección en Postman

1. Abre Postman
2. En el panel izquierdo, haz clic en **Collections**
3. Haz clic en el botón **"+"** o **"Create Collection"**
4. Nombre: `Game Tier List Manager - POST Requests`
5. Descripción: `Tarea 8 - POST Requests with Postman`
6. Click en **Create**

### Paso 3: Configurar Variables de Entorno (Opcional pero Recomendado)

1. Haz clic en **Environments** (izquierda)
2. Click en **"+"** o **"Create Environment"**
3. Nombre: `Game Tier List Manager`
4. Variables:
   - `base_url` = `http://localhost:3000`
   - `user_id` = `1`
   - `game_id` = `1`
5. Click en **Save**

---

## 📥 POST Request 1: Crear Juego

### Objetivo
Crear un nuevo juego en el catálogo del sistema usando una solicitud POST.

### Paso 1: Crear Nueva Request

1. En tu colección, haz clic en **"Add Request"** o **"+"**
2. Nombre: `POST - Create Game`
3. Método: Selecciona **POST** (dropdown)
4. URL: `http://localhost:3000/api/games`

**O si usas variable:**
```
{{base_url}}/api/games
```

### Paso 2: Configurar Headers

1. Haz clic en la pestaña **"Headers"**
2. Agrega un header:
   - **Key:** `Content-Type`
   - **Value:** `application/json`

**Tu pantalla debe verse así:**
```
Headers
─────────────────────
Content-Type | application/json
```

### Paso 3: Agregar Body (JSON)

1. Haz clic en la pestaña **"Body"**
2. Selecciona **"Raw"**
3. En el dropdown derecha, selecciona **"JSON"**
4. Copia y pega este JSON:

```json
{
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game with pixel art"
}
```

**Tu pantalla debe verse así:**
```
Body ▼
Raw   JSON ▼

{
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game with pixel art"
}
```

### Paso 4: Enviar la Solicitud

1. Haz clic en el botón **"Send"** (esquina superior derecha)
2. Espera la respuesta

### Resultado Esperado

**Status: 201 Created** ✅

**Response Body:**
```json
{
  "id": 3,
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game with pixel art"
}
```

### ¿Qué Pasó?

- ✅ Postman envió los datos en formato JSON
- ✅ El servidor validó los datos
- ✅ Creó un nuevo juego en la BD
- ✅ Devolvió el juego creado con su ID asignado automáticamente

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| **400 Bad Request** | Falta un campo requerido | Verifica que `name` esté en el JSON |
| **500 Internal Server Error** | Error en el servidor | Reinicia el servidor con `npm run dev:all` |
| **Error de conexión** | Servidor no está corriendo | Ejecuta `npm run dev:all` primero |

---

## 📥 POST Request 2: Crear Item

### Objetivo
Crear un nuevo item (arma/objeto) que se puede rankear en tier lists.

### Paso 1: Crear Nueva Request

1. En tu colección, agrega otra request
2. Nombre: `POST - Create Item`
3. Método: **POST**
4. URL: `{{base_url}}/api/items` o `http://localhost:3000/api/items`

### Paso 2: Headers

```
Content-Type | application/json
```

### Paso 3: Body (JSON)

```json
{
  "name": "Fire Sword",
  "description": "Blazing blade of champions",
  "imageUrl": "https://example.com/fire-sword.png"
}
```

### Paso 4: Enviar

Click en **Send**

### Resultado Esperado

**Status: 201 Created** ✅

**Response:**
```json
{
  "id": 4,
  "name": "Fire Sword",
  "description": "Blazing blade of champions",
  "imageUrl": "https://example.com/fire-sword.png"
}
```

### Notas

- El campo `imageUrl` es opcional (puede ser `null`)
- Todos los items pueden ser rankeados en cualquier tier list

---

## 📥 POST Request 3: Registrar Usuario

### Objetivo
Crear una nueva cuenta de usuario en el sistema.

### Paso 1: Crear Nueva Request

1. Nombre: `POST - Register User`
2. Método: **POST**
3. URL: `{{base_url}}/api/users/register` o `http://localhost:3000/api/users/register`

### Paso 2: Headers

```
Content-Type | application/json
```

### Paso 3: Body (JSON)

```json
{
  "username": "tierlistmaster",
  "email": "tierlist@example.com",
  "password": "SecurePassword123",
  "role": "user"
}
```

### Paso 4: Enviar

Click en **Send**

### Resultado Esperado

**Status: 201 Created** ✅

**Response:**
```json
{
  "id": 3,
  "username": "tierlistmaster",
  "email": "tierlist@example.com",
  "role": "user"
}
```

**Nota:** ⚠️ La contraseña NO se devuelve en la respuesta (es seguro)

### Validaciones

| Campo | Validación |
|-------|-----------|
| `username` | Debe ser único, mínimo 3 caracteres |
| `email` | Debe ser único, formato válido de email |
| `password` | Requerido, mínimo 6 caracteres |
| `role` | Opcional, default: `"user"` |

### Errores Posibles

```json
{
  "error": "Username already exists."
}
```

**Solución:** Usa un `username` diferente

---

## 📥 POST Request 4: Crear Tier List

### Objetivo
Crear una nueva lista de ranking (tier list) asociada a un usuario y un juego.

### Paso 1: Crear Nueva Request

1. Nombre: `POST - Create Tier List`
2. Método: **POST**
3. URL: `{{base_url}}/api/tierlists` o `http://localhost:3000/api/tierlists`

### Paso 2: Headers

```
Content-Type | application/json
```

### Paso 3: Body (JSON)

```json
{
  "title": "Dead Cells Best Weapons",
  "description": "My personal ranking of Dead Cells weapons",
  "isPublic": true,
  "userId": 1,
  "gameId": 3
}
```

### Paso 4: Enviar

Click en **Send**

### Resultado Esperado

**Status: 201 Created** ✅

**Response:**
```json
{
  "id": 3,
  "title": "Dead Cells Best Weapons",
  "description": "My personal ranking of Dead Cells weapons",
  "isPublic": true,
  "userId": 1,
  "gameId": 3
}
```

### Campos Importantes

| Campo | Descripción |
|-------|------------|
| `title` | Nombre de la tier list |
| `description` | Descripción/comentarios |
| `isPublic` | ¿Es visible para otros usuarios? |
| `userId` | ID del usuario propietario |
| `gameId` | ID del juego a rankear |

### Errores Posibles

```json
{
  "error": "User not found."
}
```

**Solución:** Verifica que el `userId` existe. Usa `userId: 1` por defecto.

```json
{
  "error": "Game not found."
}
```

**Solución:** Verifica que el `gameId` existe. Usa `gameId: 1` o crea un juego primero.

---

## 📥 POST Request 5: Agregar Item a Tier List

### Objetivo
Agregar un item existente a una tier list con un rank específico (S, A, B, C, D).

### Paso 1: Crear Nueva Request

1. Nombre: `POST - Add Item to Tier List`
2. Método: **POST**
3. URL: `{{base_url}}/api/tierlists/3/items` o `http://localhost:3000/api/tierlists/3/items`

**Nota:** Reemplaza `3` con el ID de la tier list que creaste en el paso anterior.

### Paso 2: Headers

```
Content-Type | application/json
```

### Paso 3: Body (JSON)

```json
{
  "itemId": 1,
  "rank": "S",
  "position": 1
}
```

### Paso 4: Enviar

Click en **Send**

### Resultado Esperado

**Status: 201 Created** ✅

**Response:**
```json
{
  "id": 5,
  "rank": "S",
  "position": 1,
  "itemId": 1,
  "item": {
    "id": 1,
    "name": "Fire Sword",
    "description": "Blazing blade of champions",
    "imageUrl": "https://example.com/fire-sword.png"
  }
}
```

### Ranks Válidos

Los ranks deben ser uno de estos valores:

| Rank | Significado |
|------|------------|
| **S** | Excelente / OP |
| **A** | Muy Bueno |
| **B** | Bueno |
| **C** | Promedio |
| **D** | Débil |

### Errores Posibles

```json
{
  "error": "Invalid rank. Must be S, A, B, C, or D."
}
```

**Solución:** Usa uno de los ranks válidos (S, A, B, C, D)

```json
{
  "error": "Item already exists in this tier list."
}
```

**Solución:** No puedes agregar el mismo item dos veces a la misma tier list. Usa un `itemId` diferente.

---

## ⚠️ Validaciones y Errores

### HTTP Status Codes

| Código | Significado | Ejemplos |
|--------|------------|----------|
| **200** | OK | GET exitoso |
| **201** | Created | POST exitoso |
| **400** | Bad Request | Datos inválidos |
| **404** | Not Found | Recurso no existe |
| **409** | Conflict | Datos duplicados |
| **500** | Server Error | Error en el servidor |

### Ejemplo de Error 400

**Request:**
```json
{
  "description": "Missing name field"
}
```

**Response - 400 Bad Request:**
```json
{
  "error": "Name is required."
}
```

### Ejemplo de Error 404

**Request (con ID inválido):**
```json
{
  "userId": 99999,
  "gameId": 1
}
```

**Response - 404 Not Found:**
```json
{
  "error": "User not found."
}
```

### Ejemplo de Error 409

**Request (agregar item duplicado):**
```json
{
  "itemId": 1,
  "rank": "S"
}
```

**Response - 409 Conflict:**
```json
{
  "error": "Item already exists in this tier list."
}
```

---

## 🔄 Workflow Completo Paso a Paso

### Escenario: Crear una Tier List de Dead Cells Completa

Sigue estos pasos en orden para crear una tier list funcional:

### Paso 1: Crear Juego

**POST** `http://localhost:3000/api/games`

```json
{
  "name": "Dead Cells",
  "description": "Roguelike action-adventure game"
}
```

**Salva el ID:** `game_id = 3` (del response)

---

### Paso 2: Crear Items

**POST** `http://localhost:3000/api/items` (Primera vez)

```json
{
  "name": "Fire Sword",
  "description": "Burning blade",
  "imageUrl": null
}
```

**Salva:** `item_id_1 = 4`

---

**POST** `http://localhost:3000/api/items` (Segunda vez)

```json
{
  "name": "Ice Staff",
  "description": "Freezing magic",
  "imageUrl": null
}
```

**Salva:** `item_id_2 = 5`

---

**POST** `http://localhost:3000/api/items` (Tercera vez)

```json
{
  "name": "Lightning Bow",
  "description": "Electric arrows",
  "imageUrl": null
}
```

**Salva:** `item_id_3 = 6`

---

### Paso 3: Crear Usuario (Opcional)

Si no tienes usuario, crea uno:

**POST** `http://localhost:3000/api/users/register`

```json
{
  "username": "deadcellsplayer",
  "email": "player@example.com",
  "password": "Password123",
  "role": "user"
}
```

**Salva:** `user_id = 3` (del response)

---

### Paso 4: Crear Tier List

**POST** `http://localhost:3000/api/tierlists`

```json
{
  "title": "Dead Cells Weapons Ranking",
  "description": "My personal ranking",
  "isPublic": true,
  "userId": 1,
  "gameId": 3
}
```

**Salva:** `tierlist_id = 5` (del response)

---

### Paso 5: Agregar Items a Tier List

**POST** `http://localhost:3000/api/tierlists/5/items`

```json
{
  "itemId": 4,
  "rank": "S",
  "position": 1
}
```

---

**POST** `http://localhost:3000/api/tierlists/5/items`

```json
{
  "itemId": 5,
  "rank": "A",
  "position": 1
}
```

---

**POST** `http://localhost:3000/api/tierlists/5/items`

```json
{
  "itemId": 6,
  "rank": "B",
  "position": 1
}
```

---

### Paso 6: Verificar Tier List Completa

**GET** `http://localhost:3000/api/tierlists/5/items`

**Response:**
```json
[
  {
    "id": 10,
    "rank": "S",
    "position": 1,
    "itemId": 4,
    "item": {
      "id": 4,
      "name": "Fire Sword",
      "description": "Burning blade"
    }
  },
  {
    "id": 11,
    "rank": "A",
    "position": 1,
    "itemId": 5,
    "item": {
      "id": 5,
      "name": "Ice Staff",
      "description": "Freezing magic"
    }
  },
  {
    "id": 12,
    "rank": "B",
    "position": 1,
    "itemId": 6,
    "item": {
      "id": 6,
      "name": "Lightning Bow",
      "description": "Electric arrows"
    }
  }
]
```

¡Éxito! ✅ Tu tier list está lista.

---

## 💡 Tips y Trucos

### Tip 1: Usar Variables en Postman

En lugar de escribir URLs completas, usa variables:

1. Click en **Environments**
2. Crea variables:
   ```
   base_url = http://localhost:3000
   user_id = 1
   game_id = 1
   ```
3. En requests usa:
   ```
   {{base_url}}/api/games
   {{base_url}}/api/users
   ```

### Tip 2: Verificar JSON Válido

Postman tiene un ícono de validación JSON:

1. En el body, mira si hay un ✅ o ❌
2. Si hay ❌, tu JSON tiene errores
3. Verifica comillas, comas y llaves

### Tip 3: Copiar Respuestas para Siguiente Request

Si un response te da un ID importante:

1. Haz click en el ID en la respuesta
2. Cópialo (Ctrl+C)
3. Úsalo en la siguiente request

### Tip 4: Usar Postman Collections

Agrupa requests relacionadas:

1. Crea carpetas dentro de colecciones
2. Ejemplo:
   ```
   POST Requests
   ├── Create Game
   ├── Create Item
   ├── Register User
   ├── Create Tier List
   └── Add Item to Tier List
   ```

### Tip 5: Tests Automáticos en Postman

Después de enviar un request, puedes crear tests:

1. Click en pestaña **"Tests"**
2. Ejemplo:
   ```javascript
   pm.test("Status is 201", function() {
     pm.response.to.have.status(201);
   });
   ```

### Tip 6: Guardar Requests Importantes

1. Cada request se guarda automáticamente en la colección
2. Puedes hacer click en el nombre para renombrar
3. Usa nombres descriptivos

### Tip 7: Enviar Requests Múltiples Rápidamente

1. Usa el botón **"Send"** varias veces
2. O crea un flujo usando Postman Runner
3. Ordena requests en la secuencia correcta

---

## 🧪 Casos de Prueba

### Test 1: Crear Juego Válido ✅

```json
{
  "name": "Test Game",
  "description": "Test Description"
}
```

**Esperado:** 201 Created

---

### Test 2: Crear Juego sin Nombre ❌

```json
{
  "description": "Missing name"
}
```

**Esperado:** 400 Bad Request

```json
{
  "error": "Name is required."
}
```

---

### Test 3: Crear Item sin URL (Válido) ✅

```json
{
  "name": "Item Test",
  "description": "Item without image",
  "imageUrl": null
}
```

**Esperado:** 201 Created

---

### Test 4: Registrar Usuario Duplicado ❌

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password"
}
```

(Si ya existe)

**Esperado:** 400 Bad Request

```json
{
  "error": "Username already exists."
}
```

---

### Test 5: Agregar Item Duplicado a Tier List ❌

```json
{
  "itemId": 1,
  "rank": "S"
}
```

(Si ya existe en la tier list)

**Esperado:** 409 Conflict

```json
{
  "error": "Item already exists in this tier list."
}
```

---

## 📊 Resumen de POST Requests

| # | Endpoint | Parámetros | Respuesta |
|---|----------|-----------|----------|
| 1 | `POST /api/games` | name, description | Game object (id asignado) |
| 2 | `POST /api/items` | name, description, imageUrl | Item object (id asignado) |
| 3 | `POST /api/users/register` | username, email, password, role | User object (sin password) |
| 4 | `POST /api/tierlists` | title, description, isPublic, userId, gameId | TierList object |
| 5 | `POST /api/tierlists/:id/items` | itemId, rank, position | TierListItem with item data |

---

## ✅ Checklist de Completitud

- [ ] He instalado Postman
- [ ] He iniciado el servidor (`npm run dev:all`)
- [ ] He creado la colección en Postman
- [ ] He realizado POST 1 (Crear Juego)
- [ ] He realizado POST 2 (Crear Item)
- [ ] He realizado POST 3 (Registrar Usuario)
- [ ] He realizado POST 4 (Crear Tier List)
- [ ] He realizado POST 5 (Agregar Item)
- [ ] He visto status 201 Created en todos
- [ ] He probado casos de error (400, 404, 409)
- [ ] He completado el workflow completo
- [ ] Entiendo cómo funcionan los POST requests

---

## 📖 Próximos Pasos

Una vez domines POST requests:

1. **Aprende PUT** - Para actualizar recursos
2. **Aprende DELETE** - Para eliminar recursos
3. **Crea Automaciones** - Con Postman Runner
4. **Integra en CI/CD** - Para testing automático
5. **Documenta tu API** - Con OpenAPI/Swagger

---

## 🚀 Alternativas a Postman

Si prefieres otras herramientas:

### Thunder Client (VS Code)
- Extensión de VS Code
- Similar a Postman
- Más ligero
- ID: `rangav.vscode-thunder-client`

### REST Client (VS Code)
- Usa archivos `.rest` o `.http`
- Perfecto para developers
- ID: `humao.rest-client`

### cURL (Terminal)
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test game"}'
```

### Insomnia
- Similar a Postman
- Interfaz clara
- Descarga: https://insomnia.rest/

---

## 📞 Solución de Problemas

### ¿El servidor no inicia?
```bash
npm install
npm run dev:all
```

### ¿Error de conexión en Postman?
1. Verifica que el servidor está corriendo
2. URL debe ser: `http://localhost:3000`
3. No `https://` ni `http://localhost:3000/`

### ¿Error 400 Bad Request?
1. Verifica que todos los campos requeridos estén en el JSON
2. Verifica que no hay errores de sintaxis JSON
3. Usa el validador JSON de Postman

### ¿Error 404 Not Found?
1. Verifica que el recurso existe (correcto ID)
2. Verifica la URL es correcta
3. Usa GET primero para obtener IDs válidos

### ¿Error 409 Conflict?
1. Significa que intenta duplicar algo (ej: item en tier list)
2. Usa un recurso diferente
3. O actualiza el existente con PUT

---

## 📝 Conclusión

Has aprendido:

✅ **Cómo instalar y usar Postman**  
✅ **Cómo crear 5 POST requests diferentes**  
✅ **Cómo manejar JSON correctamente**  
✅ **Cómo interpretar respuestas y errores**  
✅ **Cómo crear un workflow completo**  
✅ **Cómo debuggear problemas comunes**  

Estos conceptos son fundamentales para trabajar con APIs REST en desarrollo web profesional.

---

**FIN DE LA DOCUMENTACIÓN - Tarea 8**

**Fecha:** Octubre 31, 2025  
**Proyecto:** Game Tier List Manager  
**API Base:** http://localhost:3000  
**Herramienta:** Postman

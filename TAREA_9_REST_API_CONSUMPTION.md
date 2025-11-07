# TAREA 9: Consumo de API REST y Configuración de CORS

## 📋 Objetivo
Consumir la API REST en el frontend de la aplicación y resolver problemas de política CORS para permitir peticiones desde cualquier dominio.

---

## 🎯 Descripción del Proyecto

Este proyecto implementa una aplicación web full-stack que consume una API REST desde el frontend. La aplicación gestiona tier lists de videojuegos, permitiendo crear juegos, items, tier lists y asignar rankings a los items.

### Arquitectura
- **Backend**: Node.js + Express (API REST en puerto 3000)
- **Frontend**: React + TypeScript + Vite (puerto 5173)
- **Base de Datos**: SQLite con Sequelize ORM
- **Comunicación**: Fetch API para consumir endpoints REST


<img width="1307" height="578" alt="image" src="https://github.com/user-attachments/assets/b7ed0983-de40-42e2-a84c-09f7a8fffd48" />












---

## 🔧 Configuración de CORS

### Problema de CORS
CORS (Cross-Origin Resource Sharing) es una medida de seguridad del navegador que bloquea peticiones entre diferentes orígenes (dominios, puertos o protocolos diferentes).

**Escenario del problema:**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Error: "Access to fetch has been blocked by CORS policy"

### Solución Implementada

Se configuró middleware CORS en el servidor Express para permitir peticiones desde cualquier dominio.

**Archivo:** `src/app.js`

```javascript
// Middleware CORS - Allow any domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
```

#### Explicación de Headers:

1. **Access-Control-Allow-Origin: \***
   - Permite peticiones desde cualquier dominio
   - `*` = comodín para todos los orígenes
   - En producción, especificar dominio concreto: `https://mi-app.com`

2. **Access-Control-Allow-Methods**
   - Métodos HTTP permitidos: GET, POST, PUT, DELETE, OPTIONS
   - Cubre todos los métodos CRUD necesarios

3. **Access-Control-Allow-Headers**
   - Headers que el cliente puede enviar
   - Incluye Authorization para futuras implementaciones de autenticación

4. **Preflight Requests (OPTIONS)**
   - El navegador envía petición OPTIONS antes de POST/PUT/DELETE
   - Debe responderse con status 200 para autorizar la petición real

---

## 🌐 Endpoints de la API REST

### Games (Juegos)

#### GET /api/games
Obtiene la lista de todos los juegos.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Fantasy RPG",
    "description": "A fantasy role-playing game with magic and dragons."
  }
]
```

#### POST /api/games
Crea un nuevo juego.

**Request Body:**
```json
{
  "name": "Dark Souls",
  "description": "A challenging action RPG"
}
```

---

### Items (Elementos)

#### GET /api/items
Obtiene todos los items disponibles.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Excalibur",
    "type": "weapon",
    "gameId": 1
  }
]
```

#### POST /api/items
Crea un nuevo item asociado a un juego.

**Request Body:**
```json
{
  "name": "Master Sword",
  "type": "weapon",
  "gameId": 1
}
```

---

### Tier Lists

#### GET /api/tierlists
Obtiene todas las tier lists.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Best Weapons 2024",
    "userId": 1
  }
]
```

#### POST /api/tierlists
Crea una nueva tier list.

**Request Body:**
```json
{
  "name": "Best Weapons 2024",
  "userId": 1
}
```

#### GET /api/tierlists/:id/items
Obtiene los items de una tier list con sus rankings.

**Response:**
```json
[
  {
    "itemId": 1,
    "ranking": "S",
    "Item": {
      "id": 1,
      "name": "Excalibur",
      "type": "weapon"
    }
  }
]
```

#### POST /api/tierlists/:id/items
Añade un item a una tier list con un ranking.

**Request Body:**
```json
{
  "itemId": 1,
  "ranking": "S"
}
```

**Rankings válidos:** S, A, B, C, D

---

## 💻 Implementación Frontend

### Configuración de la URL Base

**Archivo:** `client/.env`
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Archivo:** `client/vite.config.ts`
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})
```

---

### Consumo de API con Fetch

**Archivo:** `client/src/App.tsx`

#### 1. Cargar Juegos (GET)

```typescript
const loadGames = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games`);
    if (!response.ok) throw new Error('Failed to fetch games');
    const data = await response.json();
    setGames(data);
  } catch (error) {
    console.error('Error loading games:', error);
    setError('Failed to load games');
  }
};
```

#### 2. Crear Juego (POST)

```typescript
const handleCreateGame = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newGame.name,
        description: newGame.description,
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create game');
    
    setSuccess('Game created successfully!');
    setNewGame({ name: '', description: '' });
    await loadGames();
  } catch (error) {
    console.error('Error creating game:', error);
    setError('Failed to create game');
  } finally {
    setLoading(false);
  }
};
```

#### 3. Cargar Items (GET)

```typescript
const loadItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    const data = await response.json();
    setItems(data);
  } catch (error) {
    console.error('Error loading items:', error);
    setError('Failed to load items');
  }
};
```

#### 4. Crear Item (POST)

```typescript
const handleCreateItem = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newItem.name,
        type: newItem.type,
        gameId: parseInt(newItem.gameId),
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create item');
    
    setSuccess('Item created successfully!');
    setNewItem({ name: '', type: '', gameId: '' });
    await loadItems();
  } catch (error) {
    console.error('Error creating item:', error);
    setError('Failed to create item');
  } finally {
    setLoading(false);
  }
};
```

#### 5. Crear Tier List (POST)

```typescript
const handleCreateTierList = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(`${API_BASE_URL}/tierlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newTierList.name,
        userId: parseInt(newTierList.userId),
      }),
    });
    
    if (!response.ok) throw new Error('Failed to create tier list');
    
    setSuccess('Tier List created successfully!');
    setNewTierList({ name: '', userId: '1' });
    await loadTierLists();
  } catch (error) {
    console.error('Error creating tier list:', error);
    setError('Failed to create tier list');
  } finally {
    setLoading(false);
  }
};
```

#### 6. Añadir Item a Tier List (POST)

```typescript
const handleAddItemToTierList = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetch(
      `${API_BASE_URL}/tierlists/${newTierListItem.tierListId}/items`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: parseInt(newTierListItem.itemId),
          ranking: newTierListItem.ranking,
        }),
      }
    );
    
    if (!response.ok) throw new Error('Failed to add item to tier list');
    
    setSuccess('Item added to tier list successfully!');
    setNewTierListItem({ tierListId: '', itemId: '', ranking: 'S' });
    await loadTierListItems();
  } catch (error) {
    console.error('Error adding item to tier list:', error);
    setError('Failed to add item to tier list');
  } finally {
    setLoading(false);
  }
};
```

---

## 🎨 Interfaz de Usuario

La aplicación cuenta con tres pestañas principales:

### 1. Games Tab
- **Formulario**: Crear nuevos juegos (nombre y descripción)
- **Lista**: Visualizar todos los juegos existentes
- **Funcionalidad**: CREATE (POST) y READ (GET)

### 2. Items Tab
- **Formulario**: Crear nuevos items (nombre, tipo, juego asociado)
- **Lista**: Visualizar todos los items con su juego correspondiente
- **Funcionalidad**: CREATE (POST) y READ (GET)

### 3. Tier Lists Tab
- **Formulario 1**: Crear nueva tier list
- **Formulario 2**: Añadir items a tier lists con ranking (S/A/B/C/D)
- **Visualización**: Tier lists con items organizados por ranking
- **Funcionalidad**: CREATE (POST) y READ (GET) para tier lists e items

---

## 🚀 Cómo Ejecutar la Aplicación

### 1. Instalar Dependencias

**Backend:**
```powershell
npm install
```

**Frontend:**
```powershell
cd client
npm install
```

### 2. Inicializar Base de Datos

```powershell
node scripts/init-db.js
```

Este script crea:
- La base de datos SQLite
- Las tablas necesarias
- Datos de ejemplo (1 usuario, 1 juego, 1 item)

### 3. Iniciar Backend (API REST)

```powershell
npm run dev
```

El servidor arranca en: `http://localhost:3000`

### 4. Iniciar Frontend (React)

En otra terminal:
```powershell
cd client
npm run dev
```

La aplicación web arranca en: `http://localhost:5173`

---

## ✅ Verificación de Funcionamiento

### Test 1: Verificar Backend
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/games" -Method GET
```

**Respuesta esperada:**
```
StatusCode: 200
Content: [{"id":1,"name":"Fantasy RPG","description":"..."}]
```

### Test 2: Verificar CORS
Abrir el frontend en `http://localhost:5173` y verificar en la consola del navegador que no hay errores CORS.

### Test 3: Crear Juego desde Frontend
1. Ir a la pestaña "Games"
2. Llenar formulario (nombre y descripción)
3. Click en "Create Game"
4. Verificar mensaje de éxito y que aparece en la lista

### Test 4: Crear Item desde Frontend
1. Ir a la pestaña "Items"
2. Seleccionar un juego del dropdown
3. Llenar nombre y tipo
4. Click en "Create Item"
5. Verificar que aparece en la lista

### Test 5: Crear Tier List
1. Ir a la pestaña "Tier Lists"
2. Escribir nombre de tier list
3. Click en "Create Tier List"
4. Añadir items con rankings (S/A/B/C/D)
5. Verificar visualización por categorías

---

## 🔍 Manejo de Errores

### Frontend
```typescript
try {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Request failed');
  const data = await response.json();
  // Process data...
} catch (error) {
  console.error('Error:', error);
  setError('User-friendly error message');
} finally {
  setLoading(false);
}
```

### Estados de la UI
- **loading**: Muestra "Loading..." durante peticiones
- **error**: Muestra mensaje de error en rojo
- **success**: Muestra mensaje de éxito en verde
- **Timeouts**: Mensajes desaparecen automáticamente después de 3 segundos

---

## 📊 Estados y Efectos en React

### Estados Principales
```typescript
const [games, setGames] = useState<Game[]>([]);
const [items, setItems] = useState<Item[]>([]);
const [tierLists, setTierLists] = useState<TierList[]>([]);
const [tierListItems, setTierListItems] = useState<TierListItemWithItem[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);
```

### Efectos de Carga Inicial
```typescript
useEffect(() => {
  loadGames();
  loadItems();
  loadTierLists();
  loadTierListItems();
}, []);
```

Estos efectos se ejecutan una vez al montar el componente, cargando todos los datos desde la API.

---

## 🛡️ Mejores Prácticas Implementadas

### 1. Separación de Concerns
- Backend: Lógica de negocio y acceso a datos
- Frontend: Presentación y experiencia de usuario
- API REST: Interfaz de comunicación estandarizada

### 2. Manejo de Estados
- Loading states para feedback visual
- Error handling comprehensivo
- Success messages para confirmar acciones

### 3. TypeScript
- Tipado fuerte en el frontend
- Interfaces para datos de la API
- Autocompletado y detección de errores en desarrollo

### 4. Headers HTTP Correctos
```typescript
headers: {
  'Content-Type': 'application/json',
}
```

### 5. Validación de Respuestas
```typescript
if (!response.ok) throw new Error('Request failed');
```

### 6. Async/Await
- Código más legible que callbacks o promises chain
- Mejor manejo de errores con try/catch

---

## 🔐 Consideraciones de Seguridad

### CORS en Producción
**⚠️ NO usar `Access-Control-Allow-Origin: *` en producción**

Configuración recomendada:
```javascript
const allowedOrigins = ['https://mi-app.com', 'https://www.mi-app.com'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  // ... resto de headers
});
```

### Variables de Entorno
- No hardcodear URLs en el código
- Usar `.env` para configuración
- `.env` debe estar en `.gitignore`

### Validación
- Backend debe validar todos los inputs
- No confiar en validación del frontend únicamente
- Sanitizar datos antes de guardar en DB

---

## 📈 Posibles Mejoras Futuras

1. **Autenticación y Autorización**
   - JWT tokens
   - Login/Register
   - Proteger endpoints privados

2. **Paginación**
   - Límite de resultados por página
   - Mejor rendimiento con muchos datos

3. **Búsqueda y Filtros**
   - Buscar juegos/items por nombre
   - Filtrar por tipo, juego, etc.

4. **Caché**
   - Redux/Context API para estado global
   - Evitar peticiones redundantes

5. **Optimistic Updates**
   - Actualizar UI antes de respuesta del servidor
   - Mejor experiencia de usuario

6. **WebSockets**
   - Updates en tiempo real
   - Colaboración entre usuarios

---

## 📚 Recursos y Referencias

### Documentación Oficial
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CORS - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Express CORS Middleware](https://expressjs.com/en/resources/middleware/cors.html)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite Configuration](https://vitejs.dev/config/)

### HTTP Status Codes
- **200 OK**: Petición exitosa
- **201 Created**: Recurso creado exitosamente
- **400 Bad Request**: Datos inválidos
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

---

## 👨‍💻 Conclusión

Este proyecto demuestra una implementación completa de consumo de API REST desde un frontend moderno, con:

✅ **Configuración CORS correcta** para desarrollo  
✅ **Fetch API** para peticiones HTTP asíncronas  
✅ **Manejo de errores** comprehensivo  
✅ **TypeScript** para type safety  
✅ **React Hooks** para gestión de estado  
✅ **UI responsive** con feedback visual  
✅ **Arquitectura escalable** y mantenible  

La aplicación está lista para desarrollo, testing y futuras mejoras.

---

**Autor**: Rico  
**Fecha**: Noviembre 7, 2025  
**Repositorio**: DATABASE-DEADCELLS-REACT  
**Versión**: 1.0.0

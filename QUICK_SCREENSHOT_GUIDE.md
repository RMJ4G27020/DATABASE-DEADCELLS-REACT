# 📸 EVIDENCIA 2 - Guía Completa para Screenshots

## ✅ ESTADO ACTUAL - TODO LISTO

- ✅ **Backend corriendo:** `http://localhost:3000`
- ✅ **Frontend corriendo:** `http://localhost:5174`
- ✅ **Base de datos poblada con datos de ejemplo**
  - 4 Juegos
  - 11 Items (armas de Dead Cells)
  - 5 Tier Lists
  - 14 Items en tier lists

---

## 🎯 OBJETIVO DE LA EVIDENCIA

Demostrar en un PDF con imágenes:
1. Código corriendo con REST API
2. ORM (Sequelize) funcionando
3. Consumo de API en página HTML
4. Página con inputs y divs manipulando información de la API

**NO SE NECESITA MUCHO STYLING** - Solo funcionalidad ✅

---

## 📋 SCREENSHOTS MÍNIMOS NECESARIOS (10-15 capturas)

### **GRUPO 1: SETUP (2 capturas)**

#### 📸 Captura 1: Servidores Corriendo
**Qué mostrar:**
- Terminal con backend: `node src/server.js`
- Terminal con frontend: `npm run dev`
- Ambos mostrando que están escuchando en sus puertos

**Texto que debe verse:**
```
Server listening on http://localhost:3000
Local: http://localhost:5174/
```

---

### **GRUPO 2: PÁGINA FUNCIONANDO (5 capturas)**

#### 📸 Captura 2: Tab "Juegos" - Lista desde API
**Qué mostrar:**
- Navegador en `http://localhost:5174`
- Tab "Juegos" activo
- **DIV mostrando lista de juegos** recuperados de GET `/api/games`
- Deberías ver: "Dead Cells", "Hollow Knight", "Hades", etc.

**ESTO DEMUESTRA:** Div mostrando información de la API ✅

---

#### 📸 Captura 3: Formulario de Crear Juego (INPUT)
**Qué mostrar:**
- Mismo tab, pero scroll arriba para ver el formulario
- **INPUTS visibles:**
  - Input de texto: "Nombre"
  - Textarea: "Descripción"
  - Botón: "Crear juego"
- Llenar con datos:
  - Nombre: "Celeste"
  - Descripción: "Precision platformer about climbing a mountain"

**ESTO DEMUESTRA:** Input para enviar datos a la API ✅

---

#### 📸 Captura 4: Tab "Items" - Lista desde API
**Qué mostrar:**
- Click en tab "Items"
- **DIV con lista de items** de GET `/api/items`
- Deberías ver: "Electric Whip", "Assassin's Dagger", etc.

**ESTO DEMUESTRA:** Más divs mostrando datos de la API ✅

---

#### 📸 Captura 5: Tab "Tier Lists" - Lista Completa
**Qué mostrar:**
- Click en tab "Tier Lists"
- **DIV con lista de tier lists** de GET `/api/tierlists`
- Ver "Best Weapons Tier List", etc.

---

#### 📸 Captura 6: Ver Tier List - Grid con Rankings
**Qué mostrar:**
- Click en "Ver tier list" en "Best Weapons Tier List"
- **DIVS mostrando el tier grid** con categorías S, A, B, C, D
- Items organizados en cada categoría
- Electric Whip y Assassin's Dagger en S
- Broadsword e Ice Shards en A
- Etc.

**ESTO DEMUESTRA:** Divs complejos mostrando datos relacionados de la API ✅

---

### **GRUPO 3: DEVTOOLS - REQUESTS HTTP (2 capturas)**

#### 📸 Captura 7: Network Tab - GET Requests
**Qué mostrar:**
- F12 para abrir DevTools
- Tab "Network"
- Filtrar por "Fetch/XHR"
- Refrescar la página (F5)
- Mostrar requests:
  - `GET /api/games` - Status: 200
  - `GET /api/items` - Status: 200
  - `GET /api/tierlists` - Status: 200

**ESTO DEMUESTRA:** REST API funcionando ✅

---

#### 📸 Captura 8: Response JSON de la API
**Qué mostrar:**
- En Network tab, click en `GET /api/games`
- Tab "Response"
- Mostrar el JSON devuelto:
```json
[
  {
    "id": 1,
    "name": "Dead Cells",
    "description": "Roguelike metroidvania...",
    "createdAt": "2025-11-08...",
    "updatedAt": "2025-11-08..."
  },
  ...
]
```

**ESTO DEMUESTRA:** API devuelve JSON correctamente ✅

---

### **GRUPO 4: CÓDIGO (4 capturas)**

#### 📸 Captura 9: Backend - Routes (API Endpoints)
**Qué mostrar:**
- VS Code con archivo `src/routes.js` abierto
- Scroll para mostrar algunos endpoints:
```javascript
// GET /api/games
router.get('/games', async (req, res) => {
  const games = await Game.findAll();  // <-- ORM!
  res.json(games);
});

// POST /api/games
router.post('/games', async (req, res) => {
  const { name, description } = req.body;
  const game = await Game.create({ name, description });  // <-- ORM!
  res.status(201).json(game);
});
```

**ESTO DEMUESTRA:** REST API implementada ✅

---

#### 📸 Captura 10: Backend - Modelo ORM (Sequelize)
**Qué mostrar:**
- VS Code con archivo `src/models/Game.js`
- Código del modelo:
```javascript
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  });
  
  return Game;
};
```

**ESTO DEMUESTRA:** ORM Sequelize configurado ✅

---

#### 📸 Captura 11: Frontend - Consumo de API (GET)
**Qué mostrar:**
- VS Code con `client/src/App.tsx`
- Función de consumo de API:
```typescript
const loadGames = useCallback(async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games`)
    if (!response.ok) throw new Error(`Error ${response.status}`)
    const data: Game[] = await response.json()
    setGames(data)  // <-- Actualiza el estado y se muestra en div
  } catch (err) {
    console.error('Error loading games:', err)
  }
}, [])
```

**ESTO DEMUESTRA:** Página HTML consume la API ✅

---

#### 📸 Captura 12: Frontend - Envío de Datos (POST)
**Qué mostrar:**
- Mismo archivo, scroll para mostrar:
```typescript
const handleCreateGame = async (e: FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  const response = await fetch(`${API_BASE_URL}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: gameForm.name,      // <-- Datos del input
      description: gameForm.description
    })
  })
  
  const data = await response.json()
  await loadGames()  // Recargar para mostrar en div
  setIsSubmitting(false)
}
```

**ESTO DEMUESTRA:** Input envía datos a la API vía POST ✅

---

## 🎨 CAPTURAS OPCIONALES (Para Impresionar)

#### 📸 Extra 1: Crear Juego en Acción
- Llenar formulario
- Abrir DevTools Network
- Click en "Crear juego"
- Mostrar el POST request en Network
- Mostrar el nuevo juego apareciendo en la lista

#### 📸 Extra 2: Base de Datos SQLite
- Abrir `data/tierlist.db` con DB Browser for SQLite
- Mostrar las tablas: Games, Items, TierLists, etc.
- Mostrar algunos registros

#### 📸 Extra 3: CORS Habilitado
- DevTools → Network → Headers
- Mostrar header: `Access-Control-Allow-Origin: *`

---

## 📝 CREAR EL PDF

### Método Recomendado: Google Slides / PowerPoint

1. **Crear presentación nueva**
2. **Slide 1:** Título
   ```
   EVIDENCIA 2
   REST API & ORM Consumption
   
   Nombre: [Tu Nombre]
   Materia: [Tu Materia]
   Fecha: 8 de Noviembre, 2025
   ```

3. **Slides 2-13:** Una captura por slide
   - Agregar título descriptivo
   - Insertar imagen (tamaño grande)
   - Opcional: breve descripción

4. **Slide 14:** Conclusión
   ```
   CONCLUSIÓN
   
   ✅ REST API implementada con Express.js
   ✅ ORM Sequelize conectado a SQLite
   ✅ Página HTML consume la API con fetch()
   ✅ Inputs funcionando (POST requests)
   ✅ Divs mostrando datos de la API (GET requests)
   ✅ CORS configurado correctamente
   
   GitHub: https://github.com/RMJ4G27020/DATABASE-DEADCELLS-REACT
   ```

5. **Exportar como PDF:**
   - Archivo → Descargar → PDF
   - Nombre: `Evidencia2_API_ORM_[TuNombre].pdf`

---

## ✅ CHECKLIST ANTES DE ENTREGAR

### Contenido del PDF:
- [ ] Portada con tu nombre y fecha
- [ ] Al menos 10 capturas de pantalla
- [ ] Capturas muestran servidores corriendo
- [ ] Capturas muestran página HTML funcionando
- [ ] Capturas muestran INPUTS (formularios)
- [ ] Capturas muestran DIVS (listas/grids con datos)
- [ ] Capturas muestran DevTools con requests HTTP
- [ ] Capturas muestran código backend (routes + ORM)
- [ ] Capturas muestran código frontend (fetch API)
- [ ] Todas las capturas son legibles

### Calidad:
- [ ] Imágenes en buena resolución
- [ ] Texto legible en todas las capturas
- [ ] URL visible en capturas de navegador
- [ ] Código visible en capturas de VS Code
- [ ] PDF tiene tamaño razonable (<10MB)

---

## 🚀 COMANDOS RÁPIDOS

### Si necesitas reiniciar los servidores:

**Terminal 1 - Backend:**
```powershell
cd C:\Users\ricoj\Downloads\tierlist
node src/server.js
```

**Terminal 2 - Frontend:**
```powershell
cd C:\Users\ricoj\Downloads\tierlist\client
npm run dev
```

**Navegador:**
```
http://localhost:5174
```

---

## 📚 ARCHIVOS DE REFERENCIA

Si necesitas consultar más información:

- **Backend API:** `src/routes.js`
- **ORM Models:** `src/models/Game.js`, `src/models/Item.js`, etc.
- **Frontend:** `client/src/App.tsx`
- **Database:** `data/tierlist.db`
- **Documentación completa:** `EVIDENCIA_2_API_ORM.md`

---

## 💡 TIPS FINALES

### ✅ Lo que el profesor busca:
1. **REST API funcionando** → Mostrar requests en DevTools
2. **ORM en código** → Mostrar `Game.findAll()`, `Game.create()`, etc.
3. **Consumo en HTML** → Mostrar `fetch()` en el código
4. **Inputs funcionando** → Mostrar formularios
5. **Divs mostrando datos** → Mostrar listas con información de la API

### ❌ Lo que NO importa:
- Diseño super elaborado
- Muchas animaciones
- Estilos perfectos
- Responsive design perfecto

**LA FUNCIONALIDAD ES LO IMPORTANTE** ✅

---

## 🎯 RESUMEN DE LO QUE TIENES

Tu aplicación YA tiene todo lo necesario:

✅ **REST API completa**
- 12 endpoints (GET, POST, PUT, DELETE)
- Express.js
- CORS habilitado

✅ **ORM Sequelize**
- 5 modelos (User, Game, Item, TierList, TierListItem)
- SQLite database
- Relaciones 3NF

✅ **Página HTML funcional**
- React + TypeScript
- Fetch API para consumo
- Inputs (formularios) ✅
- Divs (listas y grids) ✅

✅ **Datos de ejemplo**
- 4 juegos
- 11 items
- Tier lists completas

---

## 🎓 ¡SOLO FALTA TOMAR LAS FOTOS Y HACER EL PDF!

**Tiempo estimado:** 30-45 minutos

¡Éxito con tu evidencia! 🚀


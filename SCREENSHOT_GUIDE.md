# 📸 Guía Rápida para Tomar Screenshots - Evidencia 2

## ✅ Estado Actual
- ✅ Backend corriendo en: `http://localhost:3000`
- ✅ Frontend corriendo en: `http://localhost:5174`
- ✅ Base de datos SQLite lista: `data/tierlist.db`

---

## 📋 Lista de Screenshots Necesarios (15 capturas)

### **Grupo 1: Servidores y Configuración (3 capturas)**

#### Screenshot 1: Terminal Backend
- Mostrar la terminal con: `node src/server.js`
- Debe verse: "Server listening on http://localhost:3000"

#### Screenshot 2: Terminal Frontend  
- Mostrar la terminal con: `npm run dev`
- Debe verse: "Local: http://localhost:5174/"

#### Screenshot 3: VS Code - Estructura del Proyecto
- Abrir VS Code mostrando la estructura de carpetas
- Resaltar: `src/`, `client/`, `data/`, modelos, routes

---

### **Grupo 2: Funcionalidad de Juegos (3 capturas)**

#### Screenshot 4: Tab Juegos - Vista Inicial
- Navegador en `http://localhost:5174`
- Tab "Juegos" activo
- Formulario visible (inputs: nombre, descripción, botón)
- Lista de juegos (si hay datos)

#### Screenshot 5: Crear Juego - Formulario Lleno
- Llenar formulario:
  - Nombre: "Dead Cells"
  - Descripción: "Roguelike metroidvania action platformer"
- **NO hacer click aún** - solo capturar el formulario lleno

#### Screenshot 6: Crear Juego - Resultado
- Después de click en "Crear juego"
- Mostrar mensaje de éxito
- Mostrar el juego en la lista

---

### **Grupo 3: Funcionalidad de Items (3 capturas)**

#### Screenshot 7: Tab Items - Vista Inicial
- Click en tab "Items"
- Formulario visible (nombre, descripción, URL imagen)
- Lista de items existentes

#### Screenshot 8: Crear Item - Formulario Lleno
- Llenar:
  - Nombre: "Electric Whip"
  - Descripción: "Fast melee weapon with shock effect"
  - URL: (dejar vacío o poner cualquier URL)
- **NO hacer click aún**

#### Screenshot 9: Crear Item - Resultado
- Después de crear
- Item visible en la lista

---

### **Grupo 4: Funcionalidad de Tier Lists (4 capturas)**

#### Screenshot 10: Tab Tier Lists - Vista Inicial
- Click en tab "Tier Lists"
- Formulario con select de juegos
- Lista de tier lists

#### Screenshot 11: Crear Tier List
- Llenar:
  - Título: "Best Weapons Ranking"
  - Descripción: "Dead Cells weapon tier list"
  - Seleccionar juego: "Dead Cells"
- Crear y mostrar en lista

#### Screenshot 12: Ver Tier List - Grid Vacío
- Click en "Ver tier list"
- Mostrar el tier grid con categorías S, A, B, C, D vacías
- Formulario para agregar items visible

#### Screenshot 13: Agregar Item a Tier
- Seleccionar un item del dropdown
- Seleccionar rank (ej: S)
- Mostrar el item agregado en la categoría S

---

### **Grupo 5: Evidencia Técnica (5 capturas)**

#### Screenshot 14: DevTools - Network Tab
- F12 para abrir DevTools
- Tab "Network"
- Filtrar "Fetch/XHR"
- Hacer una acción (crear juego)
- Mostrar requests:
  - `POST /api/games` - Status 201
  - `GET /api/games` - Status 200

#### Screenshot 15: DevTools - Response JSON
- Click en un request (ej: GET /api/games)
- Tab "Response"
- Mostrar el JSON devuelto por la API

#### Screenshot 16: VS Code - Código Backend (routes.js)
- Abrir `src/routes.js`
- Mostrar endpoints:
```javascript
router.get('/games', async (req, res) => {
  const games = await Game.findAll();
  res.json(games);
});

router.post('/games', async (req, res) => {
  const { name, description } = req.body;
  const game = await Game.create({ name, description });
  res.status(201).json(game);
});
```

#### Screenshot 17: VS Code - Modelo Sequelize
- Abrir `src/models/Game.js`
- Mostrar el modelo con DataTypes

#### Screenshot 18: VS Code - Frontend API Consumption
- Abrir `client/src/App.tsx`
- Mostrar función `loadGames` o `handleCreateGame`
- Evidenciar uso de `fetch()` con la API

---

## 🎯 Tips para Capturas de Calidad

### ✅ Hacer:
- Usar modo pantalla completa en el navegador
- Asegurar que el texto sea legible
- Capturar la URL completa en la barra de direcciones
- Incluir timestamps si es posible
- Asegurar buen contraste (fondo oscuro de la app ayuda)

### ❌ Evitar:
- Capturas borrosas o con texto ilegible
- Ventanas muy pequeñas
- Información personal visible (si hay)
- Capturas cortadas que no muestren el contexto completo

---

## 📝 Orden Recomendado para Tomar las Capturas

1. **Primero:** Capturas de código (VS Code)
   - Así puedes cerrar VS Code y tener más espacio

2. **Segundo:** Capturas de terminales
   - Dejar las terminales corriendo

3. **Tercero:** Capturas de la aplicación funcionando
   - Seguir el flujo: Juegos → Items → Tier Lists

4. **Cuarto:** Capturas de DevTools
   - Al final, para capturar requests reales

---

## 🔧 Comandos Rápidos

### Iniciar Backend:
```bash
cd C:\Users\ricoj\Downloads\tierlist
node src/server.js
```

### Iniciar Frontend:
```bash
cd C:\Users\ricoj\Downloads\tierlist\client
npm run dev
```

### Abrir en Navegador:
```
http://localhost:5174
```

### Abrir DevTools:
```
F12 o Ctrl+Shift+I
```

---

## 📄 Crear el PDF

### Opción 1: Word/Google Docs
1. Abrir Word o Google Docs
2. Insertar las capturas en orden
3. Agregar títulos descriptivos para cada imagen
4. Exportar como PDF

### Opción 2: PowerPoint
1. Crear presentación
2. Una captura por slide
3. Agregar título y descripción
4. Exportar como PDF

### Opción 3: Herramienta Online
- Usar: smallpdf.com, ilovepdf.com
- Subir imágenes
- Convertir a PDF

---

## ✅ Checklist Final

Antes de entregar, verificar que el PDF incluya:

- [ ] Al menos 15 capturas de pantalla
- [ ] Capturas muestran código backend (routes, models)
- [ ] Capturas muestran código frontend (fetch API)
- [ ] Capturas muestran la aplicación funcionando
- [ ] Capturas muestran inputs funcionando
- [ ] Capturas muestran divs mostrando datos de la API
- [ ] DevTools mostrando requests HTTP
- [ ] JSON responses visibles
- [ ] Terminales con servidores corriendo
- [ ] Todas las capturas son legibles
- [ ] PDF tiene nombre descriptivo: "Evidencia2_API_ORM_[TuNombre].pdf"

---

## 🎓 Qué Demuestra Cada Captura

| Captura | Demuestra |
|---------|-----------|
| Terminales | Servidores corriendo correctamente |
| Tab Juegos | Input + Div mostrando datos de API (GET) |
| Crear Juego | Input enviando datos a API (POST) |
| Tab Items | Múltiples inputs + Lista desde API |
| Crear Item | POST request + actualización de lista |
| Tab Tier Lists | Selects poblados desde API + Grid visual |
| DevTools Network | Comunicación HTTP REST |
| JSON Response | Formato de datos de la API |
| Código Backend | Implementación ORM Sequelize |
| Código Frontend | Consumo de API con fetch() |

---

## 📞 Recordatorios Importantes

- **No necesitas styling elaborado** - la funcionalidad es lo importante
- **Inputs y Divs son suficientes** - están implementados ✅
- **ORM está funcionando** - Sequelize con SQLite ✅
- **API REST está completa** - 12 endpoints implementados ✅
- **Página HTML consume la API** - React usa fetch() ✅

---

¡Todo está listo! Solo necesitas tomar las capturas de pantalla y armar el PDF. 🚀


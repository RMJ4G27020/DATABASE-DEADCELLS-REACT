process.env.SQLITE_STORAGE = ':memory:';

const util = require('util');
const createApp = require('../src/app');
const { initDatabase, sequelize } = require('../src/db');

const pretty = (value) =>
  util.inspect(value, { colors: false, depth: null, compact: false, sorted: true });

const logDivider = (title) => {
  const line = '-'.repeat(80);
  console.log(`\n${line}`);
  console.log(title.toUpperCase());
  console.log(line);
};

const startServer = (app) =>
  new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });

const request = async (baseUrl, path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    // Ignore if there's no JSON body (e.g., 204 responses)
  }

  return { status: response.status, data: payload };
};

const main = async () => {
  await initDatabase();
  await sequelize.sync({ force: true });

  const app = createApp();
  const { server, port } = await startServer(app);
  const baseUrl = `http://localhost:${port}/api`;

  try {
    logDivider('estado inicial');
    let result = await request(baseUrl, '/tiers');
    console.log(pretty(result));

    logDivider('creando dos elementos');
    result = await request(baseUrl, '/tiers', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Arcángel Blade',
        rank: 'S',
        description: 'Espada bendecida con daño radiante.',
      }),
    });
    console.log(pretty(result));

    result = await request(baseUrl, '/tiers', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Escudo Espectral',
        rank: 'A',
        description: 'Bloquea ataques mágicos durante 5 segundos.',
      }),
    });
    console.log(pretty(result));

    logDivider('listado tras creaciones');
    result = await request(baseUrl, '/tiers');
    console.log(pretty(result));

    const itemId = result.data[0].id;
    logDivider('actualizando elemento principal');
    result = await request(baseUrl, `/tiers/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: 'Arcángel Blade ++',
        rank: 'S',
        description: 'Versión mejorada con aura de sanación.',
      }),
    });
    console.log(pretty(result));

    logDivider('eliminando elemento secundario');
  const latestList = await request(baseUrl, '/tiers');
  const secondary = latestList.data.find((item) => item.id !== itemId);
  const deleteResponse = await request(baseUrl, `/tiers/${secondary.id}`, { method: 'DELETE' });
  console.log(pretty(deleteResponse));

    logDivider('estado final');
  result = await request(baseUrl, '/tiers');
  console.log(pretty(result));
  } finally {
    await sequelize.close();
    await new Promise((resolve) => server.close(resolve));
  }
};

main().catch((error) => {
  console.error('E2E demo failed:', error);
  process.exitCode = 1;
});

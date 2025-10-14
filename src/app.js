const express = require('express');
const routes = require('./routes');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.get('/', (req, res) => {
    res.json({ message: 'Tier list API is running' });
  });
  app.use('/api', routes);

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return app;
};

module.exports = createApp;

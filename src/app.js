const express = require('express');
const routes = require('./routes');

const createApp = () => {
  const app = express();

  // CORS Configuration - Allow any domain
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

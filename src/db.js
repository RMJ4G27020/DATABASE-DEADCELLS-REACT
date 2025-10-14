const path = require('path');
const { Sequelize } = require('sequelize');

const databasePath = process.env.SQLITE_STORAGE || path.join(__dirname, '..', 'data', 'tierlist.db');

const storage = databasePath === ':memory:' ? ':memory:' : databasePath;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage,
  logging: false,
});

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  initDatabase,
  databasePath,
};

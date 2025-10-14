const fs = require('fs');
const path = require('path');
const { initDatabase, sequelize, databasePath } = require('../src/db');
require('../src/associations');

const ensureDirectoryExists = (filePath) => {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

const seedData = async () => {
  const { User, Game, TierList, Item, TierListItem } = require('../src/associations');

  // Seed users
  await User.findOrCreate({
    where: { username: 'admin' },
    defaults: {
      username: 'admin',
      email: 'admin@example.com',
      passwordHash: '$2b$10$dummyhash', // In real app, hash properly
      role: 'admin',
    },
  });

  const [user] = await User.findOrCreate({
    where: { username: 'user1' },
    defaults: {
      username: 'user1',
      email: 'user1@example.com',
      passwordHash: '$2b$10$dummyhash',
      role: 'user',
    },
  });

  // Seed games
  const [game1] = await Game.findOrCreate({
    where: { name: 'Fantasy RPG' },
    defaults: {
      name: 'Fantasy RPG',
      description: 'A fantasy role-playing game with magic and dragons.',
    },
  });

  // Seed items
  const [sword] = await Item.findOrCreate({
    where: { name: 'Dragon Slayer Sword' },
    defaults: {
      name: 'Dragon Slayer Sword',
      description: 'Legendary blade with unmatched power.',
    },
  });

  const [shield] = await Item.findOrCreate({
    where: { name: 'Steel Shield' },
    defaults: {
      name: 'Steel Shield',
      description: 'Reliable defense for most encounters.',
    },
  });

  // Seed tier list
  const [tierList] = await TierList.findOrCreate({
    where: { title: 'My Fantasy Tier List' },
    defaults: {
      userId: user.id,
      gameId: game1.id,
      title: 'My Fantasy Tier List',
      description: 'Personal ranking of fantasy items.',
      isPublic: true,
    },
  });

  // Seed tier list items
  await TierListItem.findOrCreate({
    where: { tierListId: tierList.id, itemId: sword.id },
    defaults: {
      tierListId: tierList.id,
      itemId: sword.id,
      rank: 'S',
      position: 1,
    },
  });

  await TierListItem.findOrCreate({
    where: { tierListId: tierList.id, itemId: shield.id },
    defaults: {
      tierListId: tierList.id,
      itemId: shield.id,
      rank: 'A',
      position: 1,
    },
  });
};

const main = async () => {
  try {
    ensureDirectoryExists(databasePath);

    await initDatabase();
    await sequelize.sync();
    await seedData();

    console.log(`Database ready at ${databasePath}`);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

main();

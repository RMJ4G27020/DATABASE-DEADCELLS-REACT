const createApp = require('./app');
const { initDatabase, sequelize } = require('./db');
require('./associations');

const PORT = process.env.PORT || 3000;

const seedDatabase = async () => {
  const { User, Game, TierList, Item, TierListItem } = require('./associations');

  // Seed users
  const [admin] = await User.findOrCreate({
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

const start = async () => {
  try {
    await initDatabase();
    await sequelize.sync();
    await seedDatabase();

    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
  }
};

start();
